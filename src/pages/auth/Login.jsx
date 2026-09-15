import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateLoginForm } from '../../utils/validation';
import { Button } from '../../components/common/Button';
import { Car, Lock, Mail, UserCheck, Shield, AlertCircle } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Return URL after login (default to /dashboard for user or /admin for admin)
  const from = location.state?.from || null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const validationErrors = validateLoginForm({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from || '/dashboard', { replace: true });
      }
    } else {
      setApiError(res.message || 'Login failed. Please check credentials.');
    }
  };

  const handleDemoUser = async () => {
    setLoading(true);
    setEmail('user@demo.com');
    setPassword('password123');
    const res = await login('user@demo.com', 'password123');
    setLoading(false);
    if (res.success) {
      navigate(from || '/dashboard', { replace: true });
    }
  };

  const handleDemoAdmin = async () => {
    setLoading(true);
    setEmail('admin@demo.com');
    setPassword('password123');
    const res = await login('admin@demo.com', 'password123');
    setLoading(false);
    if (res.success) {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '480px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <Car size={26} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            {from ? 'Log in to complete your vehicle booking' : 'Log in to access your DriveEase rental dashboard'}
          </p>
        </div>

        {apiError && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
            <AlertCircle size={18} />
            <span>{apiError}</span>
          </div>
        )}

        {/* Demo Fast Login Buttons */}
        <div style={{ backgroundColor: 'var(--light-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.65rem', textAlign: 'center', textTransform: 'uppercase' }}>
            ⚡ Quick Login Options
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Button variant="secondary" size="sm" icon={UserCheck} onClick={handleDemoUser} disabled={loading}>
              User
            </Button>
            <Button variant="outline" size="sm" icon={Shield} onClick={handleDemoAdmin} disabled={loading} style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              Admin
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={14} color="var(--primary)" /> Email Address
            </label>
            <input 
              type="email" 
              className="form-control"
              placeholder="user@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Lock size={14} color="var(--primary)" /> Password
              </label>
              <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                Forgot Password?
              </Link>
            </div>
            <input 
              type="password" 
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading} style={{ marginTop: '0.5rem' }}>
            {loading ? 'Logging in...' : 'Log In to Account'}
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
