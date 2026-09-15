import React from 'react';
import { UserSidebar } from '../../components/user/UserSidebar';
import { ProfileCard } from '../../components/user/ProfileCard';

export const Profile = () => {
  return (
    <div className="container">
      <div className="dashboard-layout">
        <UserSidebar />
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', margin: '0 0 0.35rem 0' }}>Account Settings</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your profile credentials, phone number, and delivery address</p>
          </div>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};
