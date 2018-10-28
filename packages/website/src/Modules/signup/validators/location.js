const validator = values => {
  const errors = {};

  // location is requried
  if (!values.location) {
    errors.location = 'Location is required';
  }

  return errors;
}

export default validator;
