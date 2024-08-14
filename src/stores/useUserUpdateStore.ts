import { create } from 'zustand';
import { validateField, validateForm } from '../form-validations/UpdateUserValidation';
import { IUserUpdateStore } from '../models/IUserUpdateStore';

export const useUserUpdateStore = create<IUserUpdateStore>((set, get) => ({
    formData: {
        firstName: '',
        lastName: '',
        maidenName: '',
        email: '',
        username: '',
        password: '',
        height: '',
        weight: '',
    },
    validationErrors: {},
    setFormData: (name, value) => {
        const updatedErrors = validateField(name, value, get().validationErrors);
        set((state) => ({
            formData: {
                ...state.formData,
                [name]: value,
            },
            validationErrors: updatedErrors,
        }));
    },
    setValidationErrors: (errors) => set({ validationErrors: errors }),
    initializeFormData: (user) => {
        set({
            formData: {
                firstName: user.firstName,
                lastName: user.lastName,
                maidenName: user.maidenName,
                email: user.email,
                username: user.username,
                password: user.password,
                height: user.height.toString(),
                weight: user.weight.toString(),
            },
            validationErrors: {},
        });
    },
    validateForm: () => {
        const errors = validateForm(get().formData);
        if (Object.keys(errors).length > 0) {
            set({ validationErrors: errors });
            return false;
        }
        return true;
    },
}));
