import * as sections from 'constants/sections'
import { i18n } from 'config'

const HISTORY = {
  key: sections.HISTORY,
  name: 'history',
  path: '/history',
  store: 'History',
  label: i18n.t('history.section.name')
}

const HISTORY_INTRO = {
  key: sections.HISTORY_INTRO,
  name: 'intro',
  path: `${HISTORY.path}/intro`,
  label: i18n.t('history.subsection.intro')
}

const HISTORY_RESIDENCE = {
  key: sections.HISTORY_RESIDENCE,
  name: 'residence',
  path: `${HISTORY.path}/residence`,
  storeKey: 'Residence',
  label: i18n.t('history.subsection.residence')
}

const HISTORY_EMPLOYMENT = {
  key: sections.HISTORY_EMPLOYMENT,
  name: 'employment',
  path: `${HISTORY.path}/employment`,
  storeKey: 'Employment',
  label: i18n.t('history.subsection.employment')
}

const HISTORY_EDUCATION = {
  key: sections.HISTORY_EDUCATION,
  name: 'education',
  path: `${HISTORY.path}/education`,
  storeKey: 'Education',
  label: i18n.t('history.subsection.education')
}

const HISTORY_FEDERAL = {
  key: sections.HISTORY_FEDERAL,
  name: 'federal',
  path: `${HISTORY.path}/federal`,
  storeKey: 'Federal',
  label: i18n.t('history.subsection.federal')
}

const HISTORY_REVIEW = {
  key: sections.HISTORY_REVIEW,
  name: 'review',
  path: `${HISTORY.path}/review`,
  label: i18n.t('history.subsection.review')
}

export default {
  HISTORY,
  HISTORY_INTRO,
  HISTORY_RESIDENCE,
  HISTORY_EMPLOYMENT,
  HISTORY_EDUCATION,
  HISTORY_FEDERAL,
  HISTORY_REVIEW,
}
