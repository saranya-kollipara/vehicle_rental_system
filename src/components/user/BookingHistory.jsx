import React from 'react';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../hooks/useAuth';
import { BookingCard } from '../booking/BookingCard';
import { EmptyState } from '../common/EmptyState';
import { Car } from 'lucide-react';

export const BookingHistory = ({ limit }) => {
  const { getUserBookings, cancelBooking } = useBookings();
  const { currentUser } = useAuth();

  const userBookings = getUserBookings(currentUser?.id, currentUser?.email);
  const displayBookings = limit ? userBookings.slice(0, limit) : userBookings;

  if (userBookings.length === 0) {
    return (
      <EmptyState 
        icon={Car}
        title="No rental bookings found"
        description="You haven't reserved any vehicles yet. Explore our fleet and book your first drive!"
        actionText="Browse Vehicles"
        onAction={() => window.location.href = '/vehicles'}
      />
    );
  }

  return (
    <div>
      {displayBookings.map((b) => (
        <BookingCard 
          key={b.id} 
          booking={b} 
          onCancel={(id) => cancelBooking(id)}
        />
      ))}
    </div>
  );
};
