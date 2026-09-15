import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Car, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CreditCard, 
  MessageSquare, 
  BarChart3, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import paymentService from '../../services/paymentService';

export const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const checkPending = async () => {
      try {
        const res = await paymentService.getAllPaymentsAdmin();
        if (res.success && Array.isArray(res.data)) {
          const pending = res.data.filter(
            p => (p.payment_status || p.paymentStatus || '').toLowerCase() === 'pending'
          );
          setPendingCount(pending.length);
        }
      } catch (err) {
        console.error('Error fetching sidebar pending count:', err);
      }
    };

    checkPending();
    const interval = setInterval(checkPending, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Vehicles', path: '/admin/vehicles', icon: Car },
    { label: 'Bookings', path: '/admin/bookings', icon: BookOpen },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Payments', path: '/admin/payments', icon: CreditCard, badge: pendingCount > 0 ? pendingCount : null },
    { label: 'Feedback', path: '/admin/feedback', icon: MessageSquare },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 }
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="admin-sidebar-header">
        <div style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Car size={18} color="white" />
        </div>
        <span>DriveEase Admin</span>
      </div>

      <nav className="admin-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span className="badge badge-warning" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: '10px' }}>
                  {item.badge}
                </span>
              )}
              <ChevronRight size={14} style={{ opacity: 0.5, marginLeft: '0.35rem' }} />
            </NavLink>
          );
        })}

        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--dark-hover)' }}>
          <NavLink to="/" className="admin-nav-item" style={{ color: 'var(--accent)' }}>
            <Car size={18} />
            <span>Public Site</span>
          </NavLink>
          <button 
            onClick={handleLogout}
            className="admin-nav-item" 
            style={{ width: '100%', color: 'var(--danger)', marginTop: '0.25rem' }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
