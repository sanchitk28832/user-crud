import React, { useEffect, useState } from 'react';
import { getUsers, getUserById, deleteUser } from '../services/UserService';
import UserData from './UserData';
import UpdateUser from './UpdateUser';
import { User } from '../models/User';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userToUpdate, setUserToUpdate] = useState<User | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                setUsers(usersData);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleReadClick = async (userId: number) => {
        try {
            const userData = await getUserById(userId);
            setSelectedUser(userData);
        } catch (err) {
            setError('Failed to fetch user details');
        }
    };

    const handleUpdateClick = async (userId: number) => {
        try {
            const userData = await getUserById(userId);
            setUserToUpdate(userData);
        } catch (err) {
            setError('Failed to fetch user details');
        }
    };

    const handleDeleteClick = async (userId: number) => {
        // eslint-disable-next-line no-restricted-globals
        const userConfirmed = confirm("Are you sure you want to delete this user?");
        if (!userConfirmed) {
            return;
        }
        try {
            await deleteUser(userId);
            alert("User deleted successfully...");         
            setUsers(users.filter(user => user.id !== userId));
        } catch (err) {
            setError('Failed to delete user');
        }
    };

    const handleCloseUserData = () => {
        setSelectedUser(null);
        setUserToUpdate(null);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-purple-100 p-6">
            <div className="overflow-x-auto">
                <table className="bg-purple-50 min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className='text-center'>
                        <tr className="w-full bg-purple-300 border-b border-gray-200">
                            <th className="px-6 py-3 text-gray-600">Name</th>
                            <th className="px-6 py-3 text-gray-600">Age</th>
                            <th className="px-6 py-3 text-gray-600">Gender</th>
                            <th className="px-6 py-3 text-gray-600">Email</th>
                            <th className="px-6 py-3 text-gray-600">Phone</th>
                            <th className="px-6 py-3 text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-gray-200">
                                <td className="px-6 py-4">{user.firstName} {user.lastName}</td>
                                <td className="px-6 py-4">{user.age}</td>
                                <td className="px-6 py-4">{user.gender}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                                <td className="px-6 py-4 flex justify-center space-x-2">
                                    <button
                                        onClick={() => handleReadClick(user.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Read
                                    </button>
                                    <button
                                        onClick={() => handleUpdateClick(user.id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(user.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <UserData user={selectedUser} onClose={handleCloseUserData} />
            )}
            {userToUpdate && (
                <UpdateUser user={userToUpdate} onClose={handleCloseUserData} />
            )}
        </div>
    );
};

export default UserList;

