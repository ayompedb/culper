import React from 'react'
import { i18n } from '../../../../config'
import { Location, Text, DateRange, ValidationElement, Field, Textarea, Branch, Show, Telephone } from '../../../Form'

export default class VoluntaryCounseling extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateCounselingDates = this.updateCounselingDates.bind(this)
    this.updateTreatmentProviderName = this.updateTreatmentProviderName.bind(this)
    this.updateTreatmentProviderAddress = this.updateTreatmentProviderAddress.bind(this)
    this.updateTreatmentProviderTelephone = this.updateTreatmentProviderTelephone.bind(this)
    this.updateCompletedTreatment = this.updateCompletedTreatment.bind(this)
    this.updateNoCompletedTreatmentExplanation = this.updateNoCompletedTreatmentExplanation.bind(this)
  }

  update (updateValues) {
    if (this.props.onUpdate) {
      this.props.onUpdate({
        CounselingDates: this.props.CounselingDates,
        TreatmentProviderName: this.props.TreatmentProviderName,
        TreatmentProviderAddress: this.props.TreatmentProviderAddress,
        TreatmentProviderTelephone: this.props.TreatmentProviderTelephone,
        CompletedTreatment: this.props.CompletedTreatment,
        NoCompletedTreatmentExplanation: this.props.NoCompletedTreatmentExplanation,
        ...updateValues
      })
    }
  }

  updateCounselingDates (values) {
    this.update({CounselingDates: values})
  }

  updateTreatmentProviderName (values) {
    this.update({TreatmentProviderName: values})
  }

  updateTreatmentProviderAddress (values) {
    this.update({TreatmentProviderAddress: values})
  }

  updateTreatmentProviderTelephone (values) {
    this.update({TreatmentProviderTelephone: values})
  }

  updateCompletedTreatment (values) {
    this.update({CompletedTreatment: values})
  }

  updateNoCompletedTreatmentExplanation (values) {
    this.update({NoCompletedTreatmentExplanation: values})
  }

  render () {
    return (
      <div className="voluntary-counseling">
        <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.counselingDates')}
               help={'substance.alcohol.voluntaryCounseling.help.counselingDates'}
               adjustFor="daterange">
          <DateRange name="CounselingDates"
                     className="counseling-dates"
                     {...this.props.CounselingDates}
                     onUpdate={this.updateCounselingDates}
                     onError={this.props.onError}
                     />
        </Field>
        <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.treatmentProviderName')}>
          <Text name="TreatmentProviderName"
                className="treatment-provider-name"
                {...this.props.TreatmentProviderName}
                onUpdate={this.updateTreatmentProviderName}
                onError={this.props.onError}
                />
        </Field>
        <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.treatmentProviderAddress')}
               adjustFor="address"
               help={'substance.alcohol.voluntaryCounseling.help.treatmentProviderAddress'}>
          <Location name="TreatmentProviderAddress"
                    className="provider-address"
                    {...this.props.TreatmentProviderAddress}
                    layout={Location.ADDRESS}
                    geocode={true}
                    onUpdate={this.updateTreatmentProviderAddress}
                    onError={this.props.onError}
                    />
        </Field>
        <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.treatmentProviderTelephone')}
               help={'substance.alcohol.voluntaryCounseling.help.treatmentProviderTelephone'}>
          <Telephone name="TreatmentProviderTelephone"
                     className="provider-telephone"
                     {...this.props.TreatmentProviderTelephone}
                     onUpdate={this.updateTreatmentProviderTelephone}
                     onError={this.props.onError}
                     />
        </Field>

        <h3>{i18n.t('substance.alcohol.voluntaryCounseling.heading.completedTreatment')}</h3>
        <Branch name="CompletedTreatment"
                className="completed-treatment"
                value={this.props.CompletedTreatment}
                onUpdate={this.updateCompletedTreatment}
                onError={this.props.onError}>
        </Branch>

        <Show when={this.props.CompletedTreatment === 'No'}>
          <Field title={i18n.t('substance.alcohol.voluntaryCounseling.heading.noCompletedTreatment')}>
            <Textarea name="NoCompletedTreatmentExplanation"
                      className="no-completed-treatment"
                      {...this.props.NoCompletedTreatmentExplanation}
                      onUpdate={this.updateNoCompletedTreatmentExplanation}
                      onError={this.props.onError}
                      />
          </Field>
        </Show>
      </div>
    )
  }
}

VoluntaryCounseling.defaultProps = {
  onError: (value, arr) => { return arr }
}
