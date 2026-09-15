import React from 'react';
import { Search, Calendar, Key } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: 'Choose Your Vehicle',
      description: 'Select from our wide range of hatchbacks, sedans, 7-seater SUVs, electric vehicles, and luxury cars.'
    },
    {
      step: 2,
      icon: Calendar,
      title: 'Select Dates & Location',
      description: 'Pick your pickup hub or doorstep delivery address with flexible pickup & return date schedules.'
    },
    {
      step: 3,
      icon: Key,
      title: 'Enjoy Your Journey',
      description: 'Unlock your verified vehicle with instant doorstep key handover and zero hidden charges.'
    }
  ];

  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'white', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>How DriveEase Works</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Get on the road in 3 easy, hassle-free steps</p>
        </div>

        <div className="grid-3" style={{ gap: '2rem' }}>
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="card step-card">
                <div className="step-number">{item.step}</div>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <Icon size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
