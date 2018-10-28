// eslint-disable-next-line
const RFC5322 = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const validator = (values) =>  {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!RFC5322.test(values.email)) {
    errors.email = 'Email is invalid';
  }

  if (!values.smashpass) {
    errors.smashpass = 'Smashpass is required';
  } else if (values.smashpass.length !== 25) {
    errors.smashpass = 'Smashpass is invalid';
  }

  return errors;
}

export default validator;
