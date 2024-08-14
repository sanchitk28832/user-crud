import {create} from 'zustand';
import { IUserStore } from '../models/IUserStore';
import { getUsers, deleteUser } from '../services/UserService';

export const useUserStore = create<IUserStore>((set) => ({
    users: [],
    loading: true,
    error: null,
    selectedUser: null,
    userToUpdate: null,
    fetchUsers: async () => {
        try {
            const usersData = await getUsers();
            set({ users: usersData });
        } catch (err) {
            set({ error: 'Failed to fetch users' });
        } finally {
            set({ loading: false });
        }
    },
    setSelectedUser: (user) => set({ selectedUser: user }),
    setUserToUpdate: (user) => set({ userToUpdate: user }),
    deleteUserById: async (userId: number) => {
        try {
            await deleteUser(userId);
            set((state) => ({
                users: state.users.filter(user => user.id !== userId)
            }));
        } catch (err) {
            set({ error: 'Failed to delete user' });
        }
    },
    setError: (error) => set({ error }),
    closeUserData: () => set({ selectedUser: null }),

}));
