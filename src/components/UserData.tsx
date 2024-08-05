import React from 'react';
import {User} from '../models/User';

interface UserDataProps {
  user: User;
  onClose: () => void;
}

const UserData: React.FC<UserDataProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-lg mx-4 md:mx-0 rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row">
          <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-24 h-24 object-cover rounded-full border border-gray-300" />
          <div className="ml-4 mt-4 md:mt-0">
            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Biological Information</h3>
              <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
              <p><strong>Height:</strong> {user.height} cm</p>
              <p><strong>Weight:</strong> {user.weight} kg</p>
              <p><strong>Eye Color:</strong> {user.eyeColor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
