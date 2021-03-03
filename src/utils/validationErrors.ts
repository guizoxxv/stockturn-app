import { ValidationError } from 'yup';

export interface ValidationErrors {
  [key: string]: any;
}

export function getValidationErrors(err: ValidationError): ValidationErrors {
  const validationErrors: ValidationErrors = {};

  err.inner.forEach(error => {
    let errorPath = error.path?.split('.');

    if (errorPath) {
      validationErrors[errorPath[0]] = error.message;
    }
  });

  return validationErrors;
}