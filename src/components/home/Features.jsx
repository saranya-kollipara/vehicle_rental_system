import React from 'react';
import { ShieldCheck, Clock, Banknote, MapPin, Sparkles, Headphones } from 'lucide-react';

export const Features = () => {
  const featuresList = [
    {
      icon: ShieldCheck,
      title: '100% Verified Fleet',
      description: 'Every car and bike undergoes 50+ point safety inspections before handing over.'
    },
    {
      icon: Clock,
      title: '24/7 Roadside Assistance',
      description: 'Round-the-clock emergency support across all national highways & cities.'
    },
    {
      icon: Banknote,
      title: 'Zero Hidden Charges',
      description: 'Transparent daily rates including comprehensive insurance coverage and taxes.'
    },
    {
      icon: MapPin,
      title: 'Doorstep Pickup & Drop',
      description: 'Convenient delivery right to your home, office, or airport terminal.'
    },
    {
      icon: Sparkles,
      title: 'Sanitized & Clean',
      description: 'Deep interior vacuuming and anti-viral sanitization after every ride.'
    },
    {
      icon: Headphones,
      title: 'Dedicated Customer Care',
      description: 'Instant resolution for any booking modifications or roadside queries.'
    }
  ];

  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'var(--light-bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Why Choose DriveEase?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Built for safety, ultimate comfort, and premium driver satisfaction</p>
        </div>

        <div className="grid-3" style={{ gap: '2rem' }}>
          {featuresList.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="card" style={{ padding: '1.75rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.35rem' }}>{f.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
