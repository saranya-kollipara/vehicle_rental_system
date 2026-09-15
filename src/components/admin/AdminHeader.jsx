import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminHeader = ({ onToggleSidebar }) => {
  const { currentUser } = useAuth();

  return (
    <header className="admin-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={onToggleSidebar}
          style={{ display: 'flex', alignItems: 'center', color: 'var(--text-main)', padding: '4px' }}
        >
          <Menu size={22} />
        </button>
        <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-main)' }}>Management Console</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <Bell size={20} color="var(--text-muted)" />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--danger)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', borderLeft: '1px solid var(--border)', paddingLeft: '1.25rem' }}>
          <img 
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"} 
            alt="Admin Avatar" 
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <p style={{ fontSize: '0.88rem', fontWeight: 600, margin: 0 }}>{currentUser?.name || 'Administrator'}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};
