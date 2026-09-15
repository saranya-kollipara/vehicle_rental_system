import React, { useState } from 'react';
import { UserSidebar } from '../../components/user/UserSidebar';
import { Button } from '../../components/common/Button';
import { useVehicles } from '../../hooks/useVehicles';
import { Star, Send, CheckCircle2 } from 'lucide-react';

export const Feedback = () => {
  const { vehicles } = useVehicles();
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]?.name || '');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComment('');
    }, 4000);
  };

  return (
    <div className="container">
      <div className="dashboard-layout">
        <UserSidebar />

        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', margin: '0 0 0.35rem 0' }}>Share Your Experience</h1>
            <p style={{ color: 'var(--text-muted)' }}>Help other drivers by submitting your honest vehicle rental review</p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <CheckCircle2 size={48} color="var(--success)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>Review Submitted!</h3>
                <p style={{ color: 'var(--text-muted)' }}>Thank you for your feedback. Your review will be published after quick admin review.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Rented Vehicle</label>
                  <select 
                    className="form-control"
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                  >
                    {vehicles.map(v => (
                      <option key={v.id} value={v.name}>{v.name} ({v.brand})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Rating</label>
                  <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        style={{ cursor: 'pointer', padding: '4px' }}
                      >
                        <Star 
                          size={28} 
                          fill={star <= rating ? 'var(--warning)' : 'none'} 
                          color={star <= rating ? 'var(--warning)' : 'var(--border)'} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review Comment</label>
                  <textarea 
                    className="form-control"
                    rows="4"
                    placeholder="Tell us about the vehicle condition, driving comfort, and pickup experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>

                <Button type="submit" variant="primary" icon={Send}>
                  Submit Review
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
