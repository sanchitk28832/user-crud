
  import {UpdateUserData} from '../models/UpdateUserData';

  
  export const validateField = (name: string, value: string, validationErrors: Partial<UpdateUserData>): Partial<UpdateUserData> => {
    let errors: Partial<UpdateUserData> = { ...validationErrors };
  
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          errors[name] = `${name.replace(/^\w/, c => c.toUpperCase())} is required`;
        } else if (/\d/.test(value)) {
          errors[name] = `${name.replace(/^\w/, c => c.toUpperCase())} should not contain numbers`;
        } else if (value.trim().length <= 2) {
          errors[name] = `${name.replace(/^\w/, c => c.toUpperCase())} should be longer than 2 characters`;
        } else {
          delete errors[name];
        }
        break;
      case 'maidenName':
        if (value.trim() && /\d/.test(value)) {
          errors.maidenName = 'Maiden Name should not contain numbers';
        } else if (value.trim() && value.trim().length <= 2) {
          errors.maidenName = 'Maiden Name should be longer than 2 characters';
        } else {
          delete errors.maidenName;
        }
        break;
      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/\S+@x.dummyjson\.com/.test(value)) {
          errors.email = 'Email must contain "@x.dummyjson.com"';
        } else {
          delete errors.email;
        }
        break;
      case 'username':
        if (!value.trim()) {
          errors.username = 'Username is required';
        } else if (value.length < 6 || value.length > 12) {
          errors.username = 'Username must be between 6 and 12 characters';
        } else {
          delete errors.username;
        }
        break;
      case 'password':
        if (!value.trim()) {
          errors.password = 'Password is required';
        } else if (
          value.length < 8 ||
          !/[A-Z]/.test(value) ||
          !/[a-z]/.test(value) ||
          !/[0-9]/.test(value) ||
          !/[!@#$%^&*]/.test(value)
        ) {
          errors.password = 'Password must be at least 8 characters, and include uppercase, lowercase, number, and special character';
        } else {
          delete errors.password;
        }
        break;
      case 'height':
        const height = parseInt(value);
        if (isNaN(height) || height < 130 || height > 230) {
          errors.height = 'Height must be between 130 and 230 cm';
        } else {
          delete errors.height;
        }
        break;
      case 'weight':
        const weight = parseInt(value);
        if (isNaN(weight) || weight < 30 || weight > 160) {
          errors.weight = 'Weight must be between 30 and 160 kg';
        } else {
          delete errors.weight;
        }
        break;
    }
  
    return errors;
  };
  
  export const validateForm = (formData: UpdateUserData): Partial<UpdateUserData> => {
    const errors: Partial<UpdateUserData> = {};
  
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (/\d/.test(formData.firstName)) {
      errors.firstName = 'First name should not contain numbers';
    } else if (formData.firstName.trim().length <= 2) {
      errors.firstName = 'First name should be longer than 2 characters';
    }
  
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (/\d/.test(formData.lastName)) {
      errors.lastName = 'Last name should not contain numbers';
    } else if (formData.lastName.trim().length <= 2) {
      errors.lastName = 'Last name should be longer than 2 characters';
    }
  
    if (formData.maidenName.trim()) {
      if (/\d/.test(formData.maidenName)) {
        errors.maidenName = 'Maiden name should not contain numbers';
      } else if (formData.maidenName.trim().length <= 2) {
        errors.maidenName = 'Maiden name should be longer than 2 characters';
      }
    }
  
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@x.dummyjson\.com/.test(formData.email)) {
      errors.email = 'Email must contain "@x.dummyjson.com"';
    }
  
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 6 || formData.username.length > 12) {
      errors.username = 'Username must be between 6 and 12 characters';
    }
  
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password) ||
      !/[!@#$%^&*]/.test(formData.password)
    ) {
      errors.password = 'Password must be at least 8 characters, and include uppercase, lowercase, number, and special character';
    }
  
    const height = parseInt(formData.height);
    if (isNaN(height) || height < 130 || height > 230) {
      errors.height = 'Height must be between 130 and 230 cm';
    }
  
    const weight = parseInt(formData.weight);
    if (isNaN(weight) || weight < 30 || weight > 160) {
      errors.weight = 'Weight must be between 30 and 160 kg';
    }
  
    return errors;
  };
  