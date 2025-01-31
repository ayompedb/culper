/* eslint import/prefer-default-export: 0 */

export const login = {
  title: 'Welcome to the Questionnaire for\nNational Background Investigation Services',
  error: {
    title: 'Sorry, but we couldn’t log you in!',
    generic: 'The username or password was incorrect.',
    network: 'Sorry, there was a network error during your attempt to login.',
    unknown: 'Sorry, an unknown error {{status}} occurred.',
    saml: 'SAML initialization failed',
  },
  saml: {
    button: 'Log in',
  },
  basic: {
    button: 'Log In',
    username: {
      label: 'Username',
    },
    password: {
      label: 'Password',
    },
    show: {
      title: 'Show password',
      text: 'Show password',
    },
    hide: {
      title: 'Hide password',
      text: 'Hide password',
    },
    forgot: {
      title: 'Forgot password',
      text: 'Forgot password',
    },
  },
  denied: {
    title: 'We could not find your application with the information provided.',
    para: [
      'The email you provided is not associated with an active account.',
      'Contact the National Background Investigation Service help line at ###-###-#### if you believe this message was received in error or try logging in again below.',
    ],
    button: 'Log in',
  },
  locked: {
    title: 'Your form has been submitted and is locked',
    para: [
      'If you need assistance contact the office who initiated your form.',
    ],
    button: 'Back to login',
  },
  token: {
    heading: 'Questionnaire for National Background Investigation Services',
    title: 'For security reasons you have been logged out',
    saved: 'Your data was saved 1 minute prior to logout at {time}.',
    para: [
      'This may be due to a slow connection speed and/or inactivity. Please log in again to continue.',
    ],
    button: 'Back to login',
  },
}
