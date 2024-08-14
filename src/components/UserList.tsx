import React, { useEffect } from 'react';
import { useUserStore } from '../stores/useUserStore';
import UserData from './UserData';
import UpdateUser from './UpdateUser';
import { getUserById } from '../services/UserService';

const UserList: React.FC = () => {
    const {
        users, loading, error, selectedUser, userToUpdate,
        fetchUsers, setSelectedUser, setUserToUpdate, deleteUserById, setError
    } = useUserStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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
        await deleteUserById(userId);
        alert("User deleted successfully...");
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
                <table className="bg-purple-50 min-w-full border border-gray-200 rounded-lg shadow-md">
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
               <UserData />
            )}
            {userToUpdate && (
                <UpdateUser user={userToUpdate} onClose={handleCloseUserData} />
            )}
        </div>
    );
};

export default UserList;
