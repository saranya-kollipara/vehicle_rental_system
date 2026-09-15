import React from 'react';
import { mockFeedback } from '../../data/feedback';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>What Our Customers Say</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Real reviews from verified DriveEase drivers</p>
        </div>

        <div className="grid-3" style={{ gap: '1.75rem' }}>
          {mockFeedback.map((review) => (
            <div key={review.id} className="card" style={{ padding: '1.75rem', position: 'relative' }}>
              <Quote size={32} color="var(--primary-light)" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', opacity: 0.8 }} />
              
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', color: 'var(--warning)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--warning)" />
                ))}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', fontStyle: 'italic', position: 'relative', zIndex: 10 }}>
                "{review.comment}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <img 
                  src={review.userAvatar} 
                  alt={review.userName} 
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{review.userName}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>{review.userRole} • <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{review.vehicleName}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
