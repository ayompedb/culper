import { navigation } from '../../config'

export const validations = (section, props = {}) => {
  if (!section || !section.subsections) {
    return 1
  }

  return section.subsections
    .filter(subsection => {
      if (subsection.hidden || (subsection.hiddenFunc && subsection.hiddenFunc(props.application))) {
        return false
      }

      if (subsection.exclude) {
        return false
      }

      return true
    })
    .reduce((count, subsection) => {
      return count + validations(subsection, props)
    }, 0)
}

export const parseFormUrl = (url) => {
  const parts = url.replace('/form/', '').split('/')
  const section = parts.shift()
  const subsectionRaw = parts.join('/')

  return {
    section,
    subsectionRaw,
    subsection: subsectionRaw || 'intro'
  }
}

/**
 * Determine if the route has any errors
 *
 * example:
 *  route => /form/identification/name
 */
export const hasErrors = (route, errors = {}) => {
  const routeParts = parseFormUrl(route)
  if (!routeParts.section) {
    return false
  }
  const routeSection = routeParts.section.toLowerCase()
  const sectionErrors = errors[routeSection] || []

  return sectionErrors.some(
    e =>
      e.section.toLowerCase() === routeSection &&
      // either we're not within a subsection, or the subsection matches
      (!routeParts.subsectionRaw || e.subsection.toLowerCase().startsWith(routeParts.subsectionRaw)) &&
      e.valid === false
  )
}

/**
 * Determine if the route is considered complete and valid
 */
export const isValid = (route, props = {}) => {
  const crumbs = route.replace('/form/', '').split('/')
  const routeParts = parseFormUrl(route)
  const routeSection = routeParts.section.toLowerCase()
  const routeSubSection = routeParts.subsection.toLowerCase()

  // Find which node we should be checking against
  let node = null
  for (const crumb of crumbs) {
    if (!node) {
      node = navigation.find(x => x.url.toLowerCase() === crumb.toLowerCase())
    } else if (node.subsections) {
      node = node.subsections.find(x => x.url.toLowerCase() === crumb.toLowerCase())
    }
  }

  for (const section in props.completed) {
    if (section.toLowerCase() !== routeSection) {
      continue
    }

    let completedSections = props.completed[section].filter(e => e.section.toLowerCase() === routeSection)
    if (routeSubSection) {
      completedSections = completedSections.filter(e => e.subsection.toLowerCase().indexOf(crumbs.slice(1, crumbs.length).join('/').toLowerCase()) === 0)
    }

    return completedSections.filter(e => e.valid === true).length >= validations(node, props)
  }

  return false
}

// Return `true` when at this exact section or one under it, `false` otherwise.
export const isActive = (route, pathname) => {
  return pathname.startsWith(route)
}

export const sectionsTotal = () => {
  return navigation.filter(x => !x.hidden).filter(x => !x.exclude).length
}

export const sectionsCompleted = (store, props) => {
  let sections = 0

  for (const section in store) {
    const valid = store[section]
      .filter(e => e.section.toLowerCase() === section.toLowerCase() && e.valid === true)
      .length
    if (valid >= validations(navigation.find(n => n.url === section), props)) {
      sections++
    }
  }

  return sections
}

export const findPosition = (el) => {
  let currentTop = 0

  if (el && el.offsetParent) {
    do {
      currentTop += el.offsetTop
      el = el.offsetParent
    } while (el)
  }

  return [currentTop]
}
