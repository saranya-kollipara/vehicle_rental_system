import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import paymentService from '../../services/paymentService';
import { formatCurrency } from '../../utils/formatCurrency';
import { Bell, CheckCircle2, Clock, CreditCard, ChevronRight, X } from 'lucide-react';

export const AdminNotificationBell = () => {
  const [pendingPayments, setPendingPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const prevCountRef = useRef(0);

  const fetchPendingPayments = async () => {
    try {
      const res = await paymentService.getAllPaymentsAdmin();
      if (res.success && Array.isArray(res.data)) {
        const pending = res.data.filter(
          p => (p.payment_status || p.paymentStatus || '').toLowerCase() === 'pending'
        );
        
        // If count increased, trigger Toast notification
        if (pending.length > prevCountRef.current && prevCountRef.current >= 0) {
          const latest = pending[0];
          if (latest) {
            setToast({
              id: latest.id,
              bookingId: latest.booking_id || latest.bookingId,
              userName: latest.user_name || latest.userName || 'Customer',
              amount: parseFloat(latest.amount || latest.totalAmount || 0)
            });
          }
        }
        prevCountRef.current = pending.length;
        setPendingPayments(pending);
      }
    } catch (err) {
      console.error('Error polling admin notifications:', err);
    }
  };

  useEffect(() => {
    fetchPendingPayments();
    const interval = setInterval(fetchPendingPayments, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleApprove = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      const res = await paymentService.updatePaymentStatusAdmin(id, 'Paid');
      if (res.success) {
        setPendingPayments(prev => prev.filter(p => p.id !== id));
        fetchPendingPayments();
      }
    } catch (err) {
      console.error('Failed to approve payment:', err);
    }
  };

  const count = pendingPayments.length;

  return (
    <div style={{ position: 'relative' }}>
      {/* Notification Toast Alert */}
      {toast && (
        <div className="animate-fade-in" style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: 'var(--card-bg, #ffffff)',
          borderLeft: '4px solid var(--warning, #f59e0b)',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          padding: '1rem 1.25rem',
          maxWidth: '360px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem'
        }}>
          <div style={{ padding: '0.4rem', borderRadius: '50%', backgroundColor: 'rgba(245,158,11,0.15)', color: 'var(--warning, #f59e0b)' }}>
            <Bell size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h5 style={{ margin: '0 0 0.2rem 0', fontSize: '0.95rem', color: 'var(--text-main, #0f172a)' }}>
              🔔 New Payment Verification Request
            </h5>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted, #64748b)' }}>
              <strong>{toast.userName}</strong> submitted payment of <strong style={{ color: 'var(--primary)' }}>{formatCurrency(toast.amount)}</strong> for Booking #{toast.bookingId}.
            </p>
          </div>
          <button 
            onClick={() => setToast(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.1rem' }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Bell Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'relative',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: count > 0 ? 'var(--warning, #f59e0b)' : 'var(--text-muted)',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        title="Admin Payment Verification Requests"
      >
        <Bell size={19} />
        {count > 0 && (
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: 'var(--danger, #ef4444)',
            color: 'white',
            fontSize: '0.72rem',
            fontWeight: 800,
            borderRadius: '10px',
            padding: '0.1rem 0.45rem',
            lineHeight: 1,
            boxShadow: '0 2px 5px rgba(239, 68, 68, 0.4)'
          }}>
            {count}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="card animate-fade-in" style={{
          position: 'absolute',
          top: '125%',
          right: 0,
          width: '340px',
          maxHeight: '440px',
          overflowY: 'auto',
          zIndex: 1000,
          padding: '0',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
          borderRadius: 'var(--radius-md, 12px)',
          border: '1px solid var(--border)'
        }}>
          <div style={{
            padding: '0.85rem 1rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--light-bg)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={16} color="var(--warning)" />
              <strong style={{ fontSize: '0.9rem' }}>Payment Requests ({count})</strong>
            </div>
            <Link to="/admin/payments" onClick={() => setOpen(false)} style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>
              View All
            </Link>
          </div>

          <div style={{ padding: '0.5rem' }}>
            {count === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Clock size={28} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                <p style={{ margin: 0 }}>No pending payment verification requests.</p>
              </div>
            ) : (
              pendingPayments.map(p => {
                const bookingId = p.booking_id || p.bookingId || p.id;
                const customerName = p.user_name || p.userName || 'Customer';
                const amount = parseFloat(p.amount || p.totalAmount || 0);
                const txnRef = p.transaction_reference || `TXN_${p.id}`;

                return (
                  <div key={p.id} style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(245, 158, 11, 0.04)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>#{bookingId}</strong>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--success)' }}>{formatCurrency(amount)}</strong>
                    </div>

                    <p style={{ margin: '0 0 0.35rem 0', fontSize: '0.82rem', fontWeight: 600 }}>
                      {customerName}
                    </p>

                    <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                      Txn Ref: {txnRef}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => handleApprove(p.id, e)}
                        style={{
                          flex: 1,
                          padding: '0.35rem 0.6rem',
                          backgroundColor: 'var(--success)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.35rem'
                        }}
                      >
                        <CheckCircle2 size={13} /> Validate & Approve
                      </button>
                      <Link to="/admin/payments" onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                        <button style={{
                          padding: '0.35rem 0.6rem',
                          backgroundColor: 'var(--light-bg)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          cursor: 'pointer'
                        }}>
                          Details
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotificationBell;
