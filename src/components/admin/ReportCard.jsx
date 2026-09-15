import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export const ReportCard = ({ title, data = [] }) => {
  const maxValue = Math.max(...data.map(d => d.value || 1));

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
        {title}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {data.map((item, idx) => {
          const percentage = Math.round((item.value / maxValue) * 100);
          return (
            <div key={idx}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 600 }}>{item.label}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  {item.isCurrency ? formatCurrency(item.value) : item.value}
                </span>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--light-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${percentage}%`, 
                    backgroundColor: item.color || 'var(--primary)', 
                    borderRadius: '4px',
                    transition: 'width 0.5s ease-out'
                  }} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
