import React from 'react';
import { CreditCard, CheckCircle2, Clock, RotateCcw, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export const PaymentStatus = ({ status, amount, method, date, transactionRef }) => {
  const getBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return { bg: 'var(--success-bg)', color: 'var(--success)', icon: CheckCircle2, label: 'Paid & Verified' };
      case 'pending':
        return { bg: 'var(--warning-bg)', color: 'var(--warning)', icon: Clock, label: 'Pending Admin Verification' };
      case 'refunded':
        return { bg: 'var(--info-bg)', color: 'var(--info)', icon: RotateCcw, label: 'Refunded' };
      default:
        return { bg: 'var(--light-bg)', color: 'var(--text-muted)', icon: CreditCard, label: status };
    }
  };

  const config = getBadgeStyle(status);
  const Icon = config.icon;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', backgroundColor: 'var(--light-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', flexWrap: 'wrap', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: config.bg, color: config.color }}>
          <Icon size={20} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Payment Method: <strong>{method || 'UPI / Card'}</strong></span>
            {transactionRef && (
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.05)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                Txn Ref: {transactionRef}
              </span>
            )}
          </div>
          <p style={{ fontSize: '1rem', fontWeight: 700, margin: '0.15rem 0 0 0' }}>{formatCurrency(amount)}</p>
        </div>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {status?.toLowerCase() === 'paid' && <ShieldCheck size={16} color="var(--success)" />}
        <span className="badge" style={{ backgroundColor: config.bg, color: config.color }}>
          {config.label}
        </span>
      </div>
    </div>
  );
};

export default PaymentStatus;
