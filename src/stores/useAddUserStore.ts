import { create } from 'zustand';
import { addUser } from '../services/UserService';
import { validateField, validateForm } from '../form-validations/AddUserValidation';
import { IAddUserState } from '../models/IAddUser';

export const useAddUserStore = create<IAddUserState>((set, get) => ({
  formData: {
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    bloodGroup: '',
    height: 0,
    weight: 0,
    eyeColor: '',
  },
  loading: false,
  error: null,
  success: null,
  validationErrors: {},
  
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    set((state) => {
      const newFormData = { ...state.formData, [name]: value };
      const newValidationErrors = validateField(name, value, state.validationErrors);
      return { formData: newFormData, validationErrors: newValidationErrors };
    });
  },

  handleSubmit: async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const state = get(); // Access the current state
    const formValidationErrors = validateForm(state.formData);
    set({ validationErrors: formValidationErrors });

    if (Object.keys(formValidationErrors).length > 0) {
      return;
    }

    const age = calculateAge(state.formData.birthDate);
    const data = { ...state.formData, age };

    try {
      set({ loading: true, error: null, success: null });

      const response = await addUser(data);
      set({ success: 'User added successfully!', error: null });

      console.log("User Added: ", response);

      // Reset form data
      set({ formData: {
        firstName: '',
        lastName: '',
        maidenName: '',
        age: 0,
        gender: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        birthDate: '',
        bloodGroup: '',
        height: 0,
        weight: 0,
        eyeColor: '',
      }});
    } catch (err) {
      set({ error: 'Failed to add user. Please try again.' });
    } finally {
      set({ loading: false });
    }
  },

  clearForm: () => set({ formData: {
    firstName: '',
    lastName: '',
    maidenName: '',
    age: 0,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    bloodGroup: '',
    height: 0,
    weight: 0,
    eyeColor: '',
  }, error: null, success: null }),
}));

const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  return age;
};
