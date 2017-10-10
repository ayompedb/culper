import React from 'react'
import { i18n } from '../../../config'
import { Show } from '../../Form'
import { Link } from 'react-router'

export default class InvalidForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      valid: null,
      width: 0
    }
  }

  errors () {
    let errors = []
    for (let section of this.props.sections) {
      if (!section.complete) {
        errors.push(<InvalidSection section={section} />)
      }
    }
    return errors
  }

  render () {
    const errors = this.errors()
    return (
      <div className="invalid-form">
        { i18n.m(`submission.invalidForm`) }
        { errors }
      </div>
    )
  }
}

export class InvalidSection extends React.Component {

  render () {
    const incompleteSubsections = this.props.section.subsections
      .filter(subsection => !subsection.complete)
    const incompleteSubsectionsElements = incompleteSubsections
      .map(subsection => {
        return (<div>{ subsection.name }</div>)
      })
    const firstError = incompleteSubsections[0]

    return (
      <div className="field">
        <div className="table expand">
          <span className="messages error-messages">
            <div className="message error">
              <i className="fa fa-exclamation"></i>
              <h3>{ this.props.section.title }</h3>
              { incompleteSubsectionsElements }
              <Link to={`/form/${firstError.url}`}>
                <button className="back usa-button-outline">Back to section</button>
              </Link>
            </div>
          </span>
        </div>
      </div>
    )
  }
}

InvalidForm.defaultProps = {
}
