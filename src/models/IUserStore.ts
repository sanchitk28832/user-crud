import { User } from '../models/User';
export interface IUserStore {
    users: User[];
    loading: boolean;
    error: string | null;
    selectedUser: User | null;
    userToUpdate: User | null;
    fetchUsers: () => Promise<void>;
    setSelectedUser: (user: User | null) => void;
    setUserToUpdate: (user: User | null) => void;
    deleteUserById: (userId: number) => Promise<void>;
    setError: (error: string | null) => void;
    closeUserData: () => void;
}