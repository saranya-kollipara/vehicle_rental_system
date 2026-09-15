import React, { useState, useEffect } from 'react';
import paymentService from '../../services/paymentService';
import { formatCurrency } from '../../utils/formatCurrency';
import { Loader } from '../../components/common/Loader';
import { Button } from '../../components/common/Button';
import { CheckCircle2, Clock, RotateCcw, AlertTriangle, Search, ShieldCheck, XCircle, FileText } from 'lucide-react';

export const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Transaction Validation State
  const [searchTxnId, setSearchTxnId] = useState('');
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [validationError, setValidationError] = useState('');

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await paymentService.getAllPaymentsAdmin();
      if (res.success && res.data) {
        setPayments(res.data);
      }
      setError('');
    } catch (err) {
      console.error('Failed to fetch payments:', err);
      setError('Unable to load payment records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await paymentService.updatePaymentStatusAdmin(id, newStatus);
      if (res.success) {
        setPayments(prev => prev.map(p => p.id === id ? { ...p, payment_status: newStatus } : p));
        if (validationResult && validationResult.data && (validationResult.data.id === id || validationResult.data.booking_id === id)) {
          setValidationResult(prev => ({
            ...prev,
            valid: newStatus.toLowerCase() === 'paid',
            data: { ...prev.data, payment_status: newStatus }
          }));
        }
      }
    } catch (err) {
      console.error('Failed to update payment status:', err);
    }
  };

  const handleValidateTxn = async (e) => {
    if (e) e.preventDefault();
    if (!searchTxnId.trim()) return;

    setValidating(true);
    setValidationError('');
    setValidationResult(null);

    try {
      const res = await paymentService.validatePaymentByTxnId(searchTxnId.trim());
      if (res.success) {
        setValidationResult(res);
      } else {
        setValidationError(res.message || 'Invalid Transaction ID');
      }
    } catch (err) {
      console.error('Payment validation error:', err);
      setValidationError(err.response?.data?.message || `No payment record found for transaction ID "${searchTxnId}"`);
    } finally {
      setValidating(false);
    }
  };

  if (loading) return <Loader text="Loading payment records..." />;

  const totalCollected = payments.reduce((acc, curr) => {
    const status = (curr.payment_status || curr.paymentStatus || '').toLowerCase();
    const amt = parseFloat(curr.amount || curr.totalAmount || 0);
    return status === 'paid' ? acc + amt : acc;
  }, 0);

  const pendingPayments = payments.reduce((acc, curr) => {
    const status = (curr.payment_status || curr.paymentStatus || '').toLowerCase();
    const amt = parseFloat(curr.amount || curr.totalAmount || 0);
    return status === 'pending' ? acc + amt : acc;
  }, 0);

  const refundedPayments = payments.reduce((acc, curr) => {
    const status = (curr.payment_status || curr.paymentStatus || '').toLowerCase();
    const amt = parseFloat(curr.amount || curr.totalAmount || 0);
    return status === 'refunded' ? acc + amt : acc;
  }, 0);

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>Payment Transactions & Receipts</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time database ledger tracking customer rental payment receipts and transaction statuses.</p>
      </div>

      {error && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
            <CheckCircle2 size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Collected Payments</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.1rem 0 0 0', color: 'var(--success)' }}>
              {formatCurrency(totalCollected)}
            </h3>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
            <Clock size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pending Payments</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.1rem 0 0 0', color: 'var(--warning)' }}>
              {formatCurrency(pendingPayments)}
            </h3>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
            <RotateCcw size={28} />
          </div>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Refunded Transactions</span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.1rem 0 0 0', color: 'var(--primary)' }}>
              {formatCurrency(refundedPayments)}
            </h3>
          </div>
        </div>
      </div>

      {/* Transaction ID Validation Tool */}
      <div className="card" style={{ padding: '1.75rem', marginBottom: '2.5rem', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <ShieldCheck color="var(--primary)" size={24} />
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Validate Payment using Transaction ID</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Enter a Transaction Reference (e.g., <code>TXN_HYD_9988221</code>), Booking ID (e.g., <code>DRV-84920</code>), or Payment ID to verify payment authenticity and status against database records.
        </p>

        <form onSubmit={handleValidateTxn} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '280px' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
            <input
              type="text"
              placeholder="Enter Transaction ID or Reference (e.g. TXN_HYD_9988221)"
              value={searchTxnId}
              onChange={(e) => setSearchTxnId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                outline: 'none'
              }}
            />
          </div>
          <Button variant="primary" type="submit" disabled={validating || !searchTxnId.trim()}>
            {validating ? 'Validating...' : 'Validate Transaction'}
          </Button>
        </form>

        {/* Validation Result Box */}
        {validationResult && validationResult.data && (
          <div className="animate-fade-in" style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: validationResult.valid ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)',
            border: `1px solid ${validationResult.valid ? 'var(--success)' : 'var(--warning)'}`,
            marginTop: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              {validationResult.valid ? (
                <CheckCircle2 color="var(--success)" size={24} />
              ) : (
                <Clock color="var(--warning)" size={24} />
              )}
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: validationResult.valid ? 'var(--success)' : 'var(--warning)' }}>
                  {validationResult.valid ? 'VALID & VERIFIED PAYMENT' : `TRANSACTION STATUS: ${validationResult.data.payment_status.toUpperCase()}`}
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{validationResult.message}</span>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: '0.9rem' }}>
              <div>
                <p style={{ margin: '0 0 0.4rem 0' }}><strong>Transaction Ref:</strong> <code style={{ color: 'var(--primary)' }}>{validationResult.data.transaction_reference}</code></p>
                <p style={{ margin: '0 0 0.4rem 0' }}><strong>Booking Reference:</strong> #{validationResult.data.booking_id}</p>
                <p style={{ margin: '0 0 0.4rem 0' }}><strong>Customer Name:</strong> {validationResult.data.user_name} ({validationResult.data.user_email})</p>
              </div>
              <div>
                <p style={{ margin: '0 0 0.4rem 0' }}><strong>Amount Paid:</strong> <strong style={{ color: 'var(--success)' }}>{formatCurrency(parseFloat(validationResult.data.amount))}</strong></p>
                <p style={{ margin: '0 0 0.4rem 0' }}><strong>Payment Method:</strong> {validationResult.data.payment_method}</p>
                <p style={{ margin: '0 0 0.4rem 0' }}><strong>Transaction Date:</strong> {new Date(validationResult.data.created_at || validationResult.data.payment_date).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {validationError && (
          <div className="animate-fade-in" style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid var(--danger)',
            color: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '1rem'
          }}>
            <XCircle size={22} />
            <div>
              <strong>Transaction Validation Failed</strong>
              <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.85rem' }}>{validationError}</p>
            </div>
          </div>
        )}
      </div>

      {/* Payments Data Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Method</th>
              <th>Transaction Ref</th>
              <th>Transaction Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map(p => {
                const bookingId = p.booking_id || p.bookingId || p.id;
                const customerName = p.user_name || p.userName || 'Customer';
                const method = p.payment_method || p.paymentMethod || 'UPI / Card';
                const txnRef = p.transaction_reference || `TXN_${p.id}`;
                const txnDate = p.created_at || p.payment_date ? new Date(p.created_at || p.payment_date).toLocaleDateString() : 'N/A';
                const amount = parseFloat(p.amount || p.totalAmount || 0);
                const status = p.payment_status || p.paymentStatus || 'Paid';

                let badgeClass = 'badge-info';
                if (status.toLowerCase() === 'paid') badgeClass = 'badge-success';
                else if (status.toLowerCase() === 'pending') badgeClass = 'badge-warning';
                else if (status.toLowerCase() === 'refunded' || status.toLowerCase() === 'failed') badgeClass = 'badge-danger';

                return (
                  <tr key={p.id}>
                    <td><strong style={{ color: 'var(--primary)' }}>#{bookingId}</strong></td>
                    <td>{customerName}</td>
                    <td><span className="badge badge-info">{method}</span></td>
                    <td>
                      <button
                        onClick={() => {
                          setSearchTxnId(txnRef);
                          paymentService.validatePaymentByTxnId(txnRef).then(res => setValidationResult(res)).catch(err => setValidationError(err.message));
                        }}
                        title="Click to validate this transaction"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          fontFamily: 'monospace',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        {txnRef}
                      </button>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{txnDate}</td>
                    <td style={{ fontWeight: 700 }}>{formatCurrency(amount)}</td>
                    <td>
                      <span className={`badge ${badgeClass}`}>
                        {status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {status.toLowerCase() === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(p.id, 'Paid')}
                            style={{
                              padding: '0.35rem 0.65rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: 'white',
                              backgroundColor: 'var(--success)',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                            title="Validate transaction details and approve as Paid"
                          >
                            <CheckCircle2 size={13} /> Validate & Approve
                          </button>
                        )}
                        {status.toLowerCase() !== 'refunded' && (
                          <button
                            onClick={() => handleStatusChange(p.id, 'Refunded')}
                            style={{
                              padding: '0.35rem 0.65rem',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              color: 'var(--primary)',
                              backgroundColor: 'rgba(99, 102, 241, 0.1)',
                              border: '1px solid var(--primary)',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                            title="Manually issue refund for this transaction"
                          >
                            <RotateCcw size={13} /> Issue Refund
                          </button>
                        )}
                        <select
                          value={status}
                          onChange={(e) => handleStatusChange(p.id, e.target.value)}
                          style={{ padding: '0.35rem 0.5rem', fontSize: '0.78rem', borderRadius: '6px', border: '1px solid var(--border)', cursor: 'pointer' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Refunded">Refunded</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
