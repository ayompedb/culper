import React from 'react'
import i18n from 'util/i18n'
import * as formConfig from 'config/forms'
import { getNumberOfYearsString } from 'helpers/text'
import { Accordion, Branch, Show } from 'components/Form'
import { Summary, DateSummary } from 'components/Summary'
import {
  SUBSTANCE_USE,
  SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
} from 'config/formSections/substanceUse'
import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'
import DrugPublicSafetyUse from './DrugPublicSafetyUse'

const sectionConfig = {
  key: SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY.key,
  section: SUBSTANCE_USE.name,
  store: SUBSTANCE_USE.store,
  subsection: SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY.name,
  storeKey: SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY.storeKey,
}

export class DrugPublicSafetyUses extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey
  }

  update = (updateValues) => {
    this.props.onUpdate(this.storeKey, {
      UsedDrugs: this.props.UsedDrugs,
      List: this.props.List,
      ...updateValues,
    })
  }

  updateList = (values) => {
    this.update({
      List: values,
    })
  }

  updateUsedDrugs = (values) => {
    this.update({
      UsedDrugs: values,
      List: values.value === 'Yes' ? this.props.List : [],
    })
  }

  summary = (item, index) => {
    const o = (item || {}).Item || {}
    const range = DateSummary(o.InvolvementDates)
    const description = (o.Description || {}).value

    return Summary({
      type: i18n.t('substance.drugs.clearance.collection.itemType'),
      index,
      left: description,
      right: range,
      placeholder: i18n.t('substance.drugs.clearance.collection.summary'),
    })
  }

  render() {
    const { formType, errors } = this.props
    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.SUBSTANCE_DRUG_PUBLIC_SAFETY_YEARS
    let branchLabelCopy
    if (years === 'EVER') {
      branchLabelCopy = i18n.t('substance.drugs.heading.drugPublicSafetyUses')
    } else {
      const numberOfYearsString = getNumberOfYearsString(years)
      branchLabelCopy = i18n.t('substance.drugs.heading.drugPublicSafetyUsesNum', { numberOfYearsString })
    }

    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content drug-public-safety-uses"
        data-section={SUBSTANCE_USE.key}
        data-subsection={SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY.key}
      >
        <h1 className="section-header">{i18n.t('substance.subsection.drugs.publicsafety')}</h1>
        <Branch
          name="UsedDrugs"
          label={branchLabelCopy}
          labelSize="h4"
          className="used-drugs"
          {...this.props.UsedDrugs}
          warning={true}
          onError={this.handleError}
          required={this.props.required}
          onUpdate={this.updateUsedDrugs}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.UsedDrugs.value === 'Yes'}>
          <Accordion
            defaultState={this.props.defaultState}
            {...this.props.List}
            scrollToBottom={this.props.scrollToBottom}
            summary={this.summary}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            description={i18n.t('substance.drugs.publicSafety.collection.description')}
            appendTitle={i18n.t('substance.drugs.publicSafety.collection.appendTitle')}
            appendLabel={i18n.t('substance.drugs.publicSafety.collection.appendLabel')}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <DrugPublicSafetyUse
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

DrugPublicSafetyUses.defaultProps = {
  UsedDrugs: {},
  List: { items: [], branch: {} },
  onError: (value, arr) => arr,
  section: 'substance',
  subsection: 'drugs/publicsafety',
  dispatch: () => {},
  scrollToBottom: '',
  errors: [],
}

export default connectSubsection(DrugPublicSafetyUses, sectionConfig)
