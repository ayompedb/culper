import React from 'react'
import ValidationElement from '../ValidationElement'
import Generic from '../Generic'

export default class Email extends ValidationElement {
  constructor (props) {
    super(props)

    this.state = {
      pattern: props.pattern,
      value: props.value
    }

    this.handleError = this.handleError.bind(this)
  }

  /**
   * Handle the change event.
   */
  handleChange (event) {
    this.setState({ value: event.target.value }, () => {
      super.handleChange(event)
      if (this.props.onUpdate) {
        this.props.onUpdate({
          name: this.props.name,
          value: this.state.value
        })
      }
    })
  }

  handleError (value, arr) {
    arr = arr.map(err => {
      return {
        code: `email.${err.code}`,
        valid: err.valid
      }
    })

    // Take the original and concatenate our new error values to it
    return this.props.onError(value, arr.concat(this.constructor.errors.map(err => {
      return {
        code: err.code,
        valid: err.func(value, this.props)
      }
    })))
  }

  render () {
    return (
      <Generic name={this.props.name}
               label={this.props.label}
               placeholder={this.props.placeholder}
               className={`email ${this.props.className || ''}`.trim()}
               type="text"
               disabled={this.props.disabled}
               maxlength={this.props.maxlength}
               pattern={this.state.pattern}
               readonly={this.props.readonly}
               required={this.props.required}
               value={this.state.value}
               onChange={this.handleChange}
               onFocus={this.props.Focus}
               onBlur={this.props.Blur}
               onError={this.handleError}
               />
    )
  }
}

Email.defaultProps = {
  // pattern: `^([A-z0-9_\.-]+)@([A-z0-9\.-]+)\.+([A-z\.]{2,6})$`,
  pattern: /^([A-z0-9_\.-]+)@([A-z0-9\.-]+)\.+([A-z\.]{2,6})$/,
  value: '',
  onError: (value, arr) => { return arr }
}

Email.errors = []
