import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    // Replace with your actual backend URL
    const backendUrl = 'http://localhost:4000';

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            setError('Please login to view profile');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${backendUrl}/api/user/profile`, {
                headers: {
                    'token': token
                }
            });

            if (response.data.success) {
                setUser(response.data.user);
                setError('');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || 'Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage('');

        // Validation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 8) {
            setMessage('Password must be at least 8 characters');
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(
                `${backendUrl}/api/user/change-password`,
                {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                },
                {
                    headers: { 'token': token }
                }
            );

            if (response.data.success) {
                setMessage('Password changed successfully!');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setShowPasswordForm(false);
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage(response.data.message);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to change password');
        }
    };

    if (loading) {
        return (
            <div className='w-full min-h-[60vh] flex items-center justify-center'>
                <div className='text-gray-600'>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='w-full min-h-[60vh] flex items-center justify-center'>
                <div className='text-red-600'>{error}</div>
            </div>
        );
    }

    return (
        <div className='w-full min-h-[60vh] p-8'>
            <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6'>
                <h1 className='text-3xl font-bold mb-6'>Profile</h1>
                
                {message && (
                    <div className={`mb-4 p-3 rounded ${
                        message.includes('success') 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {message}
                    </div>
                )}

                {/* User Information */}
                <div className='space-y-4 mb-6'>
                    <div className='border-b pb-3'>
                        <p className='text-sm text-gray-500'>Username</p>
                        <p className='text-sm md:text-lg font-semibold'>{user?.name}</p>
                    </div>

                    <div className='border-b pb-3'>
                        <p className='text-sm text-gray-500'>Email</p>
                        <p className='text-sm md:text-lg font-semibold'>{user?.email}</p>
                    </div>

                </div>

                {/* Change Password Section */}
                <div className=' pt-6 mt-6'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-xl font-semibold'>Change Password</h2>
                        {!showPasswordForm && (
                            <button
                                onClick={() => setShowPasswordForm(true)}
                                className='text-blue-700 py-2 px-4 rounded-lg hover:underline'
                            >
                                Change Password
                            </button>
                        )}
                    </div>

                    {showPasswordForm && (
                        <div className='space-y-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                    Current Password
                                </label>
                                <input
                                    type='password'
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                    New Password
                                </label>
                                <input
                                    type='password'
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>
                                    Confirm New Password
                                </label>
                                <input
                                    type='password'
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <div className='flex gap-3'>
                                <button
                                    onClick={handlePasswordChange}
                                    className='flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600'
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => {
                                        setShowPasswordForm(false);
                                        setPasswordData({
                                            currentPassword: '',
                                            newPassword: '',
                                            confirmPassword: ''
                                        });
                                        setMessage('');
                                    }}
                                    className='flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300'
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Logout Button */}
                <button 
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                    className='mt-6 w-full bg-yellow-300  py-2 px-4 rounded-lg hover:bg-yellow-400'
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;