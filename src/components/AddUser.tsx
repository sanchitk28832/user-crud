import React from 'react';
import { useAddUserStore } from '../stores/useAddUserStore';

const AddUser: React.FC = () => {
  const {
    formData,
    loading,
    error,
    success,
    validationErrors,
    handleChange,
    handleSubmit,
  } = useAddUserStore();

  return (
    <div className="mx-20 my-6 p-6 bg-purple-100 border-2 border-black rounded-3xl">
      <h1 className="text-3xl font-bold mb-6">Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form fields */}
          {[
            { label: 'First Name', name: 'firstName', type: 'text' },
            { label: 'Last Name', name: 'lastName', type: 'text' },
            { label: 'Maiden Name', name: 'maidenName', type: 'text' },
            { label: 'Birth Date', name: 'birthDate', type: 'date' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Phone', name: 'phone', type: 'text' },
            { label: 'Username', name: 'username', type: 'text' },
            { label: 'Password', name: 'password', type: 'password' },
            { label: 'Height (cm)', name: 'height', type: 'number' },
            { label: 'Weight (kg)', name: 'weight', type: 'number' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData] as string | number}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {validationErrors[name] && (
                <span className="text-red-500 text-sm">{validationErrors[name]}</span>
              )}
            </div>
          ))}
          {/* Gender Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {validationErrors.gender && (
              <span className="text-red-500 text-sm">{validationErrors.gender}</span>
            )}
          </div>
          {/* Blood Group Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {validationErrors.bloodGroup && (
              <span className="text-red-500 text-sm">{validationErrors.bloodGroup}</span>
            )}
          </div>
          {/* Eye Color Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Eye Color</label>
            <select
              name="eyeColor"
              value={formData.eyeColor}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Eye Color</option>
              <option value="Brown">Brown</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Gray">Gray</option>
              <option value="Amber">Amber</option>
              <option value="Hazel">Hazel</option>
            </select>
            {validationErrors.eyeColor && (
              <span className="text-red-500 text-sm">{validationErrors.eyeColor}</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add User'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-500">{success}</p>}
    </div>
  );
};

export default AddUser;
