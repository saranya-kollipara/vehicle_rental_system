import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import { UserTable } from '../../components/admin/UserTable';
import { Loader } from '../../components/common/Loader';

export const ManageUsers = () => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userService.getAllUsersAdmin();
      if (res.success && res.data) {
        setUsersList(res.data);
      }
      setError('');
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError('Unable to load customer list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id) => {
    const targetUser = usersList.find(u => u.id === id);
    if (!targetUser) return;
    const newStatus = targetUser.status?.toLowerCase() === 'active' ? 'inactive' : 'active';

    try {
      const res = await userService.updateUserStatusAdmin(id, newStatus);
      if (res.success) {
        setUsersList(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
      }
    } catch (err) {
      console.error('Failed to update user status:', err);
    }
  };

  if (loading) return <Loader text="Loading customer accounts..." />;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>User Account Management</h1>
        <p style={{ color: 'var(--text-muted)' }}>Registered customer accounts, contact information, and status toggles.</p>
      </div>

      {error && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <UserTable users={usersList} onToggleStatus={handleToggleStatus} />
    </div>
  );
};

export default ManageUsers;
