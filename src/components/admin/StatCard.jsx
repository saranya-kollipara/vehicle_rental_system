import React from 'react';

export const StatCard = ({ title, value, icon: Icon, color = 'var(--primary)', change, subtitle }) => {
  return (
    <div className="stat-card">
      <div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.35rem 0', fontWeight: 500 }}>
          {title}
        </p>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>
          {value}
        </h3>
        {change !== undefined && change !== null && (
          <p style={{ fontSize: '0.8rem', fontWeight: 600, color: change >= 0 ? 'var(--success, #10b981)' : 'var(--danger, #ef4444)', margin: '0 0 0.25rem 0' }}>
            {change >= 0 ? `+${change}%` : `${change}%`}
          </p>
        )}
        {subtitle && (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>

      {Icon && (
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: color && color.startsWith('#') ? `${color}15` : 'rgba(99, 102, 241, 0.1)',
          color: color || 'var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={26} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
