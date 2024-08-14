import { UserData } from '../models/UserData';
export interface IAddUserState {
    formData: UserData;
    loading: boolean;
    error: string | null;
    success: string | null;
    validationErrors: { [key: string]: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    clearForm: () => void;
  }