import { UserData } from '../models/UserData';

export const validateField = (name: string, value: string, validationErrors: { [key: string]: string }) => {
  const errors: { [key: string]: string } = { ...validationErrors };

  switch (name) {
    case 'firstName':
      if (!value || /\d/.test(value) || value.length < 3) {
        errors.firstName = 'First name is required, must be greater than 2 characters and must not contain numbers';
      } else {
        delete errors.firstName;
      }
      break;
    case 'lastName':
      if (!value || /\d/.test(value) || value.length < 3) {
        errors.lastName = 'Last name is required, must be greater than 2 characters and must not contain numbers';
      } else {
        delete errors.lastName;
      }
      break;
    case 'maidenName':
      if (value && (/\d/.test(value) || value.length < 3)) {
        errors.maidenName = 'Maiden name must be greater than 2 characters and must not contain numbers';
      } else {
        delete errors.maidenName;
      }
      break;
    case 'birthDate':
      const birthYear = new Date(value).getFullYear();
      if (birthYear < 1970 || birthYear > 2010) {
        errors.birthDate = 'Birth year must be between 1970 and 2010';
      } else {
        delete errors.birthDate;
      }
      break;
    case 'email':
      if (!/^[\w.%+-]+@x.dummyjson\.com$/.test(value)) {
        errors.email = 'Email must be a valid ending with "@x.dummyjson.com"';
      } else {
        delete errors.email;
      }
      break;
    case 'phone':
      if (!/^\d{10}$/.test(value)) {
        errors.phone = 'Phone number must be exactly 10 digits';
      } else {
        delete errors.phone;
      }
      break;
    case 'username':
      if (value.length < 6 || value.length > 12) {
        errors.username = 'Username must be between 6 and 12 characters long';
      } else {
        delete errors.username;
      }
      break;
    case 'password':
      if (
        value.length < 8 ||
        !/[A-Z]/.test(value) ||
        !/[a-z]/.test(value) ||
        !/[0-9]/.test(value) ||
        !/[!@#$%^&*]/.test(value)
      ) {
        errors.password =
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special symbol';
      } else {
        delete errors.password;
      }
      break;
    case 'height':
      if (parseInt(value) < 130 || parseInt(value) > 230) {
        errors.height = 'Height must be between 130 and 230 cm';
      } else {
        delete errors.height;
      }
      break;
    case 'weight':
      if (parseInt(value) < 30 || parseInt(value) > 160) {
        errors.weight = 'Weight must be between 30 and 160 kg';
      } else {
        delete errors.weight;
      }
      break;
    default:
      break;
  }

  return errors;
};

export const validateForm = (formData: UserData) => {
  const errors: { [key: string]: string } = {};

  if (!formData.firstName || /\d/.test(formData.firstName) || formData.firstName.length < 3) {
    errors.firstName = 'First name is required, must be greater than 2 characters and must not contain numbers';
  }

  if (!formData.lastName || /\d/.test(formData.lastName) || formData.lastName.length < 3) {
    errors.lastName = 'Last name is required, must be greater than 2 characters and must not contain numbers';
  }

  if (formData.maidenName && (/\d/.test(formData.maidenName) || formData.maidenName.length < 3)) {
    errors.maidenName = 'Maiden name must be greater than 2 characters and must not contain numbers';
  }

  const birthYear = new Date(formData.birthDate).getFullYear();
  if (birthYear < 1970 || birthYear > 2010) {
    errors.birthDate = 'Birth date must be between 1970 and 2010';
  }

  if (!/^[\w.%+-]+@x.dummyjson\.com$/.test(formData.email)) {
    errors.email = 'Email must be a valid email address ending with "@x.dummyjson.com"';
  }

  if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = 'Phone number must be exactly 10 digits';
  }

  if (formData.username.length < 6 || formData.username.length > 12) {
    errors.username = 'Username must be between 6 and 12 characters long';
  }

  if (
    formData.password.length < 8 ||
    !/[A-Z]/.test(formData.password) ||
    !/[a-z]/.test(formData.password) ||
    !/[0-9]/.test(formData.password) ||
    !/[!@#$%^&*]/.test(formData.password)
  ) {
    errors.password =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special symbol';
  }

  if (formData.height < 130 || formData.height > 230) {
    errors.height = 'Height must be between 130 and 230 cm';
  }

  if (formData.weight < 30 || formData.weight > 160) {
    errors.weight = 'Weight must be between 30 and 160 kg';
  }

  return errors;
};
