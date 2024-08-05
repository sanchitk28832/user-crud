import React, { useEffect, useState } from 'react';
import UserData from './UserData';
import UpdateUser from './UpdateUser';
import { User } from '../models/User';
import { getUsers, getUserById, deleteUser } from '../services/UserService';

const DisplayUsers: React.FC = () => {
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
      alert('User deleted successfully...');
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
    <div className="bg-purple-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {users.map(user => (
        <div key={user.id} className="bg-black text-white shadow-lg rounded-lg overflow-hidden">
          <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-full h-48 object-cover" />
          <div className="bg-gray-800 p-4">
            <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
          <div className='flex justify-end bg-gray-800'>
            <button
              onClick={() => handleReadClick(user.id)}
              className="mx-2 my-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Read
            </button>
            <button
              onClick={() => handleUpdateClick(user.id)}
              className="mx-2 my-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteClick(user.id)}
              className="mx-2 my-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {selectedUser && (
        <UserData user={selectedUser} onClose={handleCloseUserData} />
      )}
      {userToUpdate && (
        <UpdateUser user={userToUpdate} onClose={handleCloseUserData} />
      )}
    </div>
  );
};

export default DisplayUsers;

