import React from 'react';
import { Car, AlertCircle } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Car,
  title = 'No items found',
  description = 'Try adjusting your search query or filters to find what you are looking for.',
  actionText,
  onAction
}) => {
  return (
    <div className="card" style={{ padding: '3.5rem 2rem', textAlign: 'center', margin: '2rem 0' }}>
      <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
        {description}
      </p>
      {actionText && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
