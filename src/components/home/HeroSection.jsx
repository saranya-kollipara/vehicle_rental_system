import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="badge badge-info" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', marginBottom: '1rem' }}>
              <Sparkles size={14} /> DriveEase Premier Fleet
            </div>
            <h1 className="hero-title">
              Find the Perfect Vehicle for Your Journey
            </h1>
            <p className="hero-subtitle">
              Rent cars, bikes and SUVs easily at affordable prices. Experience transparent pricing, verified vehicles, and 24/7 road assistance.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/vehicles">
                <Button variant="primary" size="lg">
                  Browse Vehicles
                </Button>
              </Link>
              <Link to="/vehicles">
                <Button variant="outline" size="lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                  Book Now
                </Button>
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: 'white', margin: 0 }}>500+</h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Verified Vehicles</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: 'white', margin: 0 }}>10k+</h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Happy Drivers</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', color: 'white', margin: 0 }}>4.9 ★</h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Average Rating</p>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80" 
              alt="DriveEase Hero Car" 
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
