import React from 'react';
import { ShieldCheck, Award, Users, MapPin, HeartHandshake, Car } from 'lucide-react';

export const About = () => {
  return (
    <div>
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--dark-surface)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge-info" style={{ marginBottom: '1rem' }}>About DriveEase</span>
          <h1 style={{ fontSize: '2.8rem', color: 'white', marginBottom: '1rem' }}>
            Empowering Your Journeys With Comfort & Trust
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            "Your Journey, Our Vehicles." DriveEase is a state-of-the-art vehicle rental platform committed to providing seamless, transparent, and top-tier car and bike rentals.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Our Mission & Vision</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                At DriveEase, we believe mobility should be effortless, reliable, and accessible to everyone. Whether it’s a weekend getaway with family, a daily city commute, or an executive business trip, our fleet is meticulously maintained to exceed every driver's expectations.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Our vision is to redefine self-drive rentals across India through zero security deposit barriers, 100% verified cars, and instant digital bookings.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--light-bg)' }}>
              <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--primary)', color: 'white', height: 'fit-content' }}>
                  <Award size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>Quality Guaranteed</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>Every vehicle undergoes rigorous multi-point mechanics and safety checks before key delivery.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <div style={{ padding: '0.85rem', borderRadius: '12px', backgroundColor: 'var(--secondary)', color: 'white', height: 'fit-content' }}>
                  <HeartHandshake size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem' }}>Customer First Support</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>24/7 highway breakdown protection and instant customer assistance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>500+</h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Active Fleet Vehicles</p>
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>25,000+</h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Completed Trips</p>
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>15+</h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>City Pickup Hubs</p>
            </div>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>4.9 / 5</h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Customer Happiness Index</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
