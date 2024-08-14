import React, { useEffect} from 'react';
import UserData from './UserData';
import UpdateUser from './UpdateUser';
import { getUserById} from '../services/UserService';
import { useUserStore } from '../stores/useUserStore';

const DisplayUsers: React.FC = () => {
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
        <UserData/>
      )}
      {userToUpdate && (
        <UpdateUser user={userToUpdate} onClose={handleCloseUserData} />
      )}
    </div>
  );
};

export default DisplayUsers;






