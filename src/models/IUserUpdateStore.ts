import { User } from '../models/User';
export interface IUserUpdateStore {
    formData: {
        firstName: string;
        lastName: string;
        maidenName: string;
        email: string;
        username: string;
        password: string;
        height: string;
        weight: string;
    };
    validationErrors: Partial<IUserUpdateStore['formData']>;
    setFormData: (name: string, value: string) => void;
    setValidationErrors: (errors: Partial<IUserUpdateStore['formData']>) => void;
    initializeFormData: (user: User) => void;
    validateForm: () => boolean;
}