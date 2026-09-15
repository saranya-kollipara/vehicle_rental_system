import React from 'react';

export const UserTable = ({ users = [], onToggleStatus }) => {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Joined Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No customer accounts found.
              </td>
            </tr>
          ) : (
            users.map((u) => {
              const statusStr = (u.status || 'active').toLowerCase();
              const isActive = statusStr === 'active';
              const joined = u.created_at ? new Date(u.created_at).toLocaleDateString() : (u.joinedDate || 'N/A');

              return (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img 
                        src={u.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"} 
                        alt={u.name} 
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      <strong style={{ fontSize: '0.9rem' }}>{u.name}</strong>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{u.email}</td>
                  <td style={{ fontSize: '0.85rem' }}>{u.phone}</td>
                  <td>
                    <span className={`badge ${u.role === 'admin' ? 'badge-info' : 'badge-warning'}`}>
                      {(u.role || 'user').toUpperCase()}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{joined}</td>
                  <td>
                    <span className={`badge ${isActive ? 'badge-success' : 'badge-danger'}`}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    {u.role !== 'admin' && (
                      <button 
                        onClick={() => onToggleStatus(u.id)}
                        style={{ 
                          padding: '4px 10px', 
                          borderRadius: '6px', 
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: isActive ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                          color: isActive ? 'var(--danger)' : 'var(--success)',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
