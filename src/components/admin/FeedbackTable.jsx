import React from 'react';
import { Star, CheckCircle, EyeOff } from 'lucide-react';

export const FeedbackTable = ({ feedbackList, onApprove, onHide }) => {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Vehicle</th>
            <th>Rating</th>
            <th>Review Comment</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.map((f) => (
            <tr key={f.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img src={f.userAvatar} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <strong style={{ fontSize: '0.88rem', display: 'block' }}>{f.userName}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.userRole}</span>
                  </div>
                </div>
              </td>
              <td style={{ fontWeight: 600 }}>{f.vehicleName}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--warning)', fontWeight: 700 }}>
                  <Star size={14} fill="var(--warning)" />
                  <span>{f.rating}</span>
                </div>
              </td>
              <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '300px' }}>
                "{f.comment}"
              </td>
              <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{f.date}</td>
              <td>
                <span className={`badge ${f.status === 'Approved' ? 'badge-success' : 'badge-danger'}`}>
                  {f.status}
                </span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button 
                    onClick={() => onApprove(f.id)}
                    style={{ padding: '5px 8px', backgroundColor: 'var(--success-bg)', color: 'var(--success)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => onHide(f.id)}
                    style={{ padding: '5px 8px', backgroundColor: 'var(--danger-bg)', color: 'var(--danger)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    Hide
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
