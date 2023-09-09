export default function () {
  const isFormValid = (form: any | null = null): boolean => {
    if (!form) return false;
    let valid = true;
    Object.keys(form).forEach((index) => {
      const item = form[index];
      validateInput(form, index);
      if (item.error) valid = false;
    });

    return valid;
  };

  const validateInput = (form: any, field: string): void => {
    Object.keys(form).forEach((index) => {
      const item = form[index];
      if (index === field) Object.assign(item, checkInputRequirements(item));
    });
  };

  const checkInputRequirements = (item: any): any => {
    const value = item.value || '';
    const required = item.required || false;
    const username = item.username || '';
    const input = {
      error: false,
      msg: '',
    };

    if (!value && required) {
      input.error = true;
      input.msg = item.msg || 'This field is required';
    } else if (value && username && !isEmailValid(value)) {
      input.error = true;
      input.msg = item.emsg || 'Invalid username format';
    }

    return input;
  };

  const isSubmitBtn = (form: any): boolean => {
    let isValid = true;

    Object.keys(form).forEach((index) => {
      const item = form[index];
      const value = item.value || '';
      const required = item.required || false;
      const username = item.username || '';

      if (!value && required) isValid = false;
      else if (value && username && isEmailValid(value)) isValid = true;
    });

    return isValid;
  };

  const isEmailValid = (value: string): boolean =>
    /^[a-zA-Z0-9_]{3,20}$/.test(value);

  return {
    isFormValid,
    validateInput,
    isSubmitBtn,
  };
}
