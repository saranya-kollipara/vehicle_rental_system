import React, { useState } from 'react';
import { mockFeedback } from '../../data/feedback';
import { FeedbackTable } from '../../components/admin/FeedbackTable';

export const ManageFeedback = () => {
  const [feedbackList, setFeedbackList] = useState(mockFeedback);

  const handleApprove = (id) => {
    setFeedbackList(prev => prev.map(f => f.id === id ? { ...f, status: 'Approved' } : f));
  };

  const handleHide = (id) => {
    setFeedbackList(prev => prev.map(f => f.id === id ? { ...f, status: 'Hidden' } : f));
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>Customer Feedback & Reviews</h1>
        <p style={{ color: 'var(--text-muted)' }}>Moderate customer reviews and vehicle ratings before public display.</p>
      </div>

      <FeedbackTable feedbackList={feedbackList} onApprove={handleApprove} onHide={handleHide} />
    </div>
  );
};
