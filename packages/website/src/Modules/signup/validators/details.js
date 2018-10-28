const RFC5322 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const alphaNum = /^\w+$/;

const validator = (values) => {
  const errors = {};
  // first name is required
  if (!values.firstName) {
    errors.firstName = 'First name is requried';
  // first name must be alphanum
  } else if (!alphaNum.test(values.firstName)) {
    errors.firstName = 'First name must be alphanumeric';
  }

  // last name is required
  if (!values.lastName) {
    errors.lastName = 'Last name is requried';
  // last name must be alphanum
  } else if (!alphaNum.test(values.lastName)) {
    errors.lastName = 'Last name must be alphanumeric';
  }

  // email is required
  if (!values.email) {
    errors.email = 'Email is requried';
  // email must be valid
  } else if (!RFC5322.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  // confirm email is requried
  if (!values.emailConfirm) {
    errors.emailConfirm = 'Confirm email is requried';
  } else if (values.email !== values.emailConfirm) {
    errors.emailConfirm = 'Emails do not match.'
  }

  return errors;
}

export default validator;
