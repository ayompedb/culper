import React from 'react'
import { connect } from 'react-redux'
import { i18n } from 'config'
import { SectionViews, SectionView } from 'components/Section/SectionView'
import SectionElement from 'components/Section/SectionElement'
import { Field } from 'components/Form'
import Gambling from 'components/Section/Financial/Gambling'
import Bankruptcies from 'components/Section/Financial/Bankruptcy'
import Taxes from 'components/Section/Financial/Taxes'
import Card from 'components/Section/Financial/Card'
import Credit from 'components/Section/Financial/Credit'
import Delinquent from 'components/Section/Financial/Delinquent'
import Nonpayment from 'components/Section/Financial/Nonpayment'

class Financial extends SectionElement {
  render() {
    return (
      <div>
        <SectionViews
          current={this.props.subsection}
          dispatch={this.props.dispatch}
          update={this.props.update}>
          <SectionView
            name="intro"
            back="foreign/review"
            backLabel={i18n.t('foreign.destination.review')}
            next="financial/bankruptcy"
            nextLabel={i18n.t('financial.destination.bankruptcy')}>
            <h1 className="section-header">{i18n.t('financial.intro.title')}</h1>
            <Field
              optional={true}
              className="no-margin-bottom">
              {i18n.m('financial.intro.body')}
            </Field>
          </SectionView>

          <SectionView
            name="review"
            title={i18n.t('review.title')}
            para={i18n.m('review.para')}
            showTop={true}
            back="financial/nonpayment"
            backLabel={i18n.t('financial.destination.nonpayment')}
            next="substance/intro"
            nextLabel={i18n.t('substance.destination.intro')}>
            <Bankruptcies
              name="bankruptcy"
              {...this.props.Bankruptcy}
              section="financial"
              subsection="bankruptcy"
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Bankruptcy')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Gambling
              name="gambling"
              {...this.props.Gambling}
              section="financial"
              subsection="gambling"
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Gambling')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Taxes
              name="taxes"
              {...this.props.Taxes}
              section="financial"
              subsection="taxes"
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Taxes')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Card
              name="card"
              {...this.props.Card}
              section="financial"
              subsection="card"
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Card')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Credit
              name="credit"
              {...this.props.Credit}
              section="financial"
              subsection="credit"
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Credit')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Delinquent
              name="delinquent"
              {...this.props.Delinquent}
              section="financial"
              subsection="delinquent"
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Delinquent')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
            <hr className="section-divider" />
            <Nonpayment
              name="nonpayment"
              {...this.props.Nonpayment}
              section="financial"
              subsection="nonpayment"
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Nonpayment')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
          </SectionView>

          <SectionView
            name="bankruptcy"
            back="financial/intro"
            backLabel={i18n.t('financial.destination.intro')}
            next="financial/gambling"
            nextLabel={i18n.t('financial.destination.gambling')}>
            <Bankruptcies
              name="bankruptcy"
              {...this.props.Bankruptcy}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Bankruptcy')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="gambling"
            back="financial/bankruptcy"
            backLabel={i18n.t('financial.destination.bankruptcy')}
            next="financial/taxes"
            nextLabel={i18n.t('financial.destination.taxes')}>
            <Gambling
              name="gambling"
              {...this.props.Gambling}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Gambling')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="taxes"
            back="financial/gambling"
            backLabel={i18n.t('financial.destination.gambling')}
            next="financial/card"
            nextLabel={i18n.t('financial.destination.card')}>
            <Taxes
              name="taxes"
              {...this.props.Taxes}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Taxes')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="card"
            back="financial/taxes"
            backLabel={i18n.t('financial.destination.taxes')}
            next="financial/credit"
            nextLabel={i18n.t('financial.destination.credit')}>
            <Card
              name="card"
              {...this.props.Card}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Card')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="credit"
            back="financial/card"
            backLabel={i18n.t('financial.destination.card')}
            next="financial/delinquent"
            nextLabel={i18n.t('financial.destination.delinquent')}>
            <Credit
              name="credit"
              {...this.props.Credit}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Credit')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="delinquent"
            back="financial/credit"
            backLabel={i18n.t('financial.destination.credit')}
            next="financial/nonpayment"
            nextLabel={i18n.t('financial.destination.nonpayment')}>
            <Delinquent
              name="delinquent"
              {...this.props.Delinquent}
              addressBooks={this.props.AddressBooks}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Delinquent')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="nonpayment"
            back="financial/delinquent"
            backLabel={i18n.t('financial.destination.delinquent')}
            next="financial/review"
            nextLabel={i18n.t('financial.destination.review')}>
            <Nonpayment
              name="nonpayment"
              {...this.props.Nonpayment}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Nonpayment')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const app = state.application || {}
  const financial = app.Financial || {}
  const errors = app.Errors || {}
  const completed = app.Completed || {}
  const addressBooks = app.AddressBooks || {}

  return {
    Financial: financial,
    Gambling: financial.Gambling || {},
    Bankruptcy: financial.Bankruptcy || {},
    Taxes: financial.Taxes || {},
    Card: financial.Card || {},
    Credit: financial.Credit || {},
    Delinquent: financial.Delinquent || {},
    Nonpayment: financial.Nonpayment || {},
    Errors: errors.financial || [],
    Completed: completed.financial || [],
    AddressBooks: addressBooks
  }
}

Financial.defaultProps = {
  section: 'financial',
  store: 'Financial',
  scrollToBottom: SectionView.BottomButtonsSelector
}

export class FinancialSections extends React.Component {
  render() {
    return (
      <div>
        <Bankruptcies
          name="bankruptcy"
          {...this.props.Bankruptcy}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />
        <hr className="section-divider" />
        <Gambling
          name="gambling"
          {...this.props.Gambling}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Taxes
          name="taxes"
          {...this.props.Taxes}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Card
          name="card"
          {...this.props.Card}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Credit
          name="credit"
          {...this.props.Credit}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Delinquent
          name="delinquent"
          {...this.props.Delinquent}
          addressBooks={this.props.AddressBooks}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Nonpayment
          name="nonpayment"
          {...this.props.Nonpayment}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          defaultState={false}
          required={true}
          scrollIntoView={false}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Financial)
