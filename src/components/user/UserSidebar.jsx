import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LayoutDashboard, Car, User, MessageSquare, LogOut } from 'lucide-react';
import '../../styles/dashboard.css';

export const UserSidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="user-sidebar-card">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
        <img 
          src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"} 
          alt={currentUser?.name} 
          style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.75rem auto', border: '3px solid var(--primary-light)' }}
        />
        <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.2rem 0' }}>{currentUser?.name}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{currentUser?.email}</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <NavLink to="/dashboard" end className={({ isActive }) => `user-nav-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={18} /> Dashboard Overview
        </NavLink>
        
        <NavLink to="/my-bookings" className={({ isActive }) => `user-nav-link ${isActive ? 'active' : ''}`}>
          <Car size={18} /> My Rental Bookings
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) => `user-nav-link ${isActive ? 'active' : ''}`}>
          <User size={18} /> Account Profile
        </NavLink>

        <NavLink to="/feedback" className={({ isActive }) => `user-nav-link ${isActive ? 'active' : ''}`}>
          <MessageSquare size={18} /> Submit Feedback
        </NavLink>

        <button 
          onClick={handleLogout}
          className="user-nav-link" 
          style={{ color: 'var(--danger)', marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}
        >
          <LogOut size={18} /> Log Out
        </button>
      </nav>
    </aside>
  );
};
