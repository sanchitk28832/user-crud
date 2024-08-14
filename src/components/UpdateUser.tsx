import React, { useEffect } from 'react';
import { User } from '../models/User';
import { updateUser } from '../services/UserService';
import { useUserUpdateStore } from '../stores/useUserUpdateStore';

interface UpdateUserProps {
    user: User;
    onClose: () => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ user, onClose }) => {
    const { formData, validationErrors, setFormData, validateForm, initializeFormData } = useUserUpdateStore();

    useEffect(() => {
        initializeFormData(user);
    }, [user, initializeFormData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(name, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const updatedData = {
                ...user,
                ...formData,
                height: parseInt(formData.height),
                weight: parseInt(formData.weight),
                phone: user.phone,
                image: user.image,
                age: user.age,
                birthDate: user.birthDate,
            };
            const response = await updateUser(user.id, updatedData);
            console.log('Updated User:', response);
            onClose();
        } catch (err) {
            console.error('Failed to update user:', err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-purple-50 p-4 rounded-lg shadow-lg w-full max-w-5xl">
                <h2 className="text-2xl mb-4">Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            {validationErrors.firstName && <p className="text-red-600">{validationErrors.firstName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            {validationErrors.lastName && <p className="text-red-600">{validationErrors.lastName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="maidenName" className="block text-gray-700">Maiden Name</label>
                            <input
                                type="text"
                                id="maidenName"
                                name="maidenName"
                                value={formData.maidenName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            {validationErrors.maidenName && <p className="text-red-600">{validationErrors.maidenName}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            {validationErrors.email && <p className="text-red-600">{validationErrors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            {validationErrors.username && <p className="text-red-600">{validationErrors.username}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            {validationErrors.password && <p className="text-red-600">{validationErrors.password}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="height" className="block text-gray-700">Height (cm)</label>
                            <input
                                type="text"
                                id="height"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            {validationErrors.height && <p className="text-red-600">{validationErrors.height}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="weight" className="block text-gray-700">Weight (kg)</label>
                            <input
                                type="text"
                                id="weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            {validationErrors.weight && <p className="text-red-600">{validationErrors.weight}</p>}
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
