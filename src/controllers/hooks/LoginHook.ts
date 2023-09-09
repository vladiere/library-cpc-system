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
    const email = item.email || '';
    const input = {
      error: false,
      msg: '',
    };

    if (!value && required) {
      input.error = true;
      input.msg = item.msg || 'This field is required';
    } else if (value && email && !isEmailValid(value)) {
      input.error = true;
      input.msg = item.emsg || 'Invalid email format';
    }

    return input;
  };

  const isSubmitBtn = (form: any): boolean => {
    let isValid = true;

    Object.keys(form).forEach((index) => {
      const item = form[index];
      const value = item.value || '';
      const required = item.required || false;
      const email = item.email || '';

      if (!value && required) isValid = false;
      else if (value && email && isEmailValid(value)) isValid = true;
    });

    return isValid;
  };

  const isEmailValid = (value: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return {
    isFormValid,
    validateInput,
    isSubmitBtn,
  };
}
