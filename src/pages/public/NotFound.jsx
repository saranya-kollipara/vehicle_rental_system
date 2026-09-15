import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { AlertCircle, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
        <AlertCircle size={44} />
      </div>
      <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-main)', marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '450px', margin: '0 auto 2rem auto' }}>
        The page link you followed does not exist or has been moved to a new route location.
      </p>
      <Link to="/">
        <Button variant="primary" icon={Home}>
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
};
