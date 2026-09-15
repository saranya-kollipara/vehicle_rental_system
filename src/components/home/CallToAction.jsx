import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { Car, ArrowRight } from 'lucide-react';

export const CallToAction = () => {
  return (
    <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%)', color: 'white' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <Car size={32} color="white" />
        </div>
        <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>
          Ready to Experience the Road Ahead?
        </h2>
        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Book your vehicle in under 2 minutes. Transparent rates, flexible cancellation, and premium doorstep delivery.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/vehicles">
            <Button variant="secondary" size="lg" icon={ArrowRight}>
              Browse All Vehicles
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline" size="lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'transparent' }}>
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
