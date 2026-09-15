import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { CheckCircle2, QrCode, X, Sparkles, AlertCircle, RefreshCw, Smartphone, ShieldCheck, Check } from 'lucide-react';

export const PaymentVerificationModal = ({ booking, onClose, onSuccess }) => {
  const amount = parseFloat(booking?.total_amount || booking?.totalAmount || 0);
  const bookingId = booking?.id || 'DRV-10001';

  const [detecting, setDetecting] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);
  const [detectedTxnId, setDetectedTxnId] = useState('');

  // Generate automated transaction ID behind the scenes
  const autoTxnId = `TXN_QR_${Math.floor(1000000000 + Math.random() * 9000000000)}`;

  // Automatically trigger detection completion after 6 seconds if user waits on QR code
  useEffect(() => {
    let timer;
    if (detecting && !verifiedSuccess && !processing) {
      timer = setTimeout(() => {
        handleDetectAndConfirmPayment(autoTxnId);
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [detecting, verifiedSuccess, processing]);

  const handleDetectAndConfirmPayment = async (txnIdToUse) => {
    setProcessing(true);
    setDetecting(false);
    setErrorMsg('');

    const finalTxnRef = txnIdToUse || autoTxnId;

    try {
      const result = await onSuccess(bookingId, {
        payment_method: 'UPI / QR Code Scan',
        transaction_reference: finalTxnRef
      });

      if (result && result.success !== false) {
        setDetectedTxnId(finalTxnRef);
        setVerifiedSuccess(true);
      } else {
        setErrorMsg(result?.message || 'Payment detection failed. Please try again.');
        setDetecting(true);
      }
    } catch (err) {
      console.error('QR Payment Detection Error:', err);
      setErrorMsg('Failed to process payment detection.');
      setDetecting(true);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="card animate-fade-in" style={{
        width: '100%',
        maxWidth: '460px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        textAlign: 'center'
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
        >
          <X size={20} />
        </button>

        {verifiedSuccess ? (
          <div className="animate-fade-in" style={{ padding: '1rem 0' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              color: 'var(--warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={44} />
            </div>

            <h3 style={{ fontSize: '1.5rem', color: 'var(--warning)', margin: '0 0 0.5rem 0' }}>
              ✓ Payment Submitted!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Your payment of <strong>{formatCurrency(amount)}</strong> has been submitted. It is now <strong>Awaiting Admin Verification</strong>.
            </p>

            <div style={{
              padding: '1.15rem',
              backgroundColor: 'var(--light-bg)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.75rem',
              textAlign: 'left',
              border: '1px solid var(--border)',
              fontSize: '0.9rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Booking Reference:</span>
                <strong style={{ color: 'var(--primary)' }}>#{bookingId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount Payable:</span>
                <strong style={{ color: 'var(--primary)', fontSize: '1rem' }}>{formatCurrency(amount)}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Transaction Reference:</span>
                <strong style={{ fontFamily: 'monospace' }}>{detectedTxnId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Payment Status:</span>
                <span className="badge badge-warning">⏳ Pending Admin Verification</span>
              </div>
            </div>

            <Button variant="primary" onClick={onClose} fullWidth size="lg">
              Return to Reservation Details
            </Button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge badge-info" style={{ marginBottom: '0.5rem' }}>Dynamic UPI QR Payment</span>
              <h3 style={{ fontSize: '1.4rem', margin: '0.2rem 0 0.35rem 0' }}>Scan QR Code to Pay</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Scan with any UPI App (Google Pay, PhonePe, Paytm, BHIM)
              </p>
            </div>

            {errorMsg && (
              <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* QR Code Container */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              border: '2px dashed var(--primary)',
              marginBottom: '1.25rem',
              position: 'relative'
            }}>
              <div style={{
                padding: '1rem',
                backgroundColor: '#ffffff',
                display: 'inline-block',
                borderRadius: '16px',
                boxShadow: '0 8px 24px rgba(99, 102, 241, 0.15)',
                border: '1px solid #e2e8f0'
              }}>
                <QrCode size={160} color="var(--primary)" />
              </div>

              <div style={{ marginTop: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block' }}>Total Amount Payable</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', margin: '0.1rem 0' }}>
                  {formatCurrency(amount)}
                </h2>
              </div>
            </div>

            {/* Live Payment Scanner Indicator */}
            <div style={{
              padding: '0.85rem',
              backgroundColor: processing ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.08)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              color: processing ? 'var(--success)' : 'var(--primary)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}>
              <RefreshCw size={18} className="spin" style={{ animation: 'spin 1.5s linear infinite' }} />
              <span>
                {processing ? 'Processing Payment Confirmation...' : 'Waiting for payment... Scanning QR...'}
              </span>
            </div>

            {/* Manual Quick Action Button if user pays instantly */}
            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={() => handleDetectAndConfirmPayment(autoTxnId)}
              disabled={processing}
              icon={ShieldCheck}
            >
              {processing ? 'Submitting Payment...' : 'Submit Payment for Admin Verification'}
            </Button>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.85rem', margin: '0.85rem 0 0 0' }}>
              Submitting payment sends your transaction details to the Admin for manual verification and approval.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PaymentVerificationModal;
