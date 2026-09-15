import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Car, Menu, X, User, LogOut, LayoutDashboard, ShieldCheck, ChevronDown } from 'lucide-react';
import { AdminNotificationBell } from '../admin/AdminNotificationBell';
import '../../styles/navbar.css';

export const Navbar = () => {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
          <div className="brand-logo-icon">
            <Car size={22} />
          </div>
          <span>DriveEase</span>
        </Link>

        {/* Navigation Links */}
        <div className={`nav-menu ${mobileOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/vehicles" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                Vehicles
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>
                Contact
              </NavLink>
            </li>

            {isAdmin && (
              <li>
                <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ color: 'var(--accent)', fontWeight: 600 }} onClick={() => setMobileOpen(false)}>
                  Admin Portal
                </NavLink>
              </li>
            )}
          </ul>

          {/* Auth Action Buttons */}
          <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {isAdmin && <AdminNotificationBell />}
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button 
                  className="user-menu-btn" 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img 
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"} 
                    alt={currentUser.name} 
                    className="user-avatar" 
                  />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{currentUser.name}</span>
                  <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                  <div className="card animate-fade-in" style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '210px',
                    padding: '0.5rem',
                    zIndex: 200,
                    boxShadow: 'var(--shadow-lg)'
                  }}>
                    <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)', marginBottom: '0.35rem' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{currentUser.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser.email}</p>
                      {isAdmin && <span className="badge badge-info" style={{ marginTop: '0.25rem' }}>Admin</span>}
                    </div>

                    <Link 
                      to={isAdmin ? "/admin" : "/dashboard"} 
                      className="nav-link" 
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: '6px' }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    
                    {!isAdmin && (
                      <Link 
                        to="/my-bookings" 
                        className="nav-link" 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: '6px' }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Car size={16} />
                        My Bookings
                      </Link>
                    )}

                    <Link 
                      to="/profile" 
                      className="nav-link" 
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', borderRadius: '6px' }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} />
                      Profile
                    </Link>

                    <button 
                      onClick={handleLogout}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        width: '100%',
                        color: 'var(--danger)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        marginTop: '0.35rem',
                        borderTop: '1px solid var(--border)'
                      }}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <button className="btn btn-outline btn-sm">Login</button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <button className="btn btn-primary btn-sm">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
};
