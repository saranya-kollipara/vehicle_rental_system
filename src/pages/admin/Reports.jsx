import React from 'react';
import { ReportCard } from '../../components/admin/ReportCard';
import { useVehicles } from '../../hooks/useVehicles';
import { useBookings } from '../../hooks/useBookings';
import { formatCurrency } from '../../utils/formatCurrency';

export const Reports = () => {
  const { vehicles } = useVehicles();
  const { bookings } = useBookings();

  const totalBookingsCount = bookings.length;
  const completedCount = bookings.filter(b => b.bookingStatus === 'Completed').length;
  const confirmedCount = bookings.filter(b => b.bookingStatus === 'Confirmed').length;
  const cancelledCount = bookings.filter(b => b.bookingStatus === 'Cancelled').length;

  const bookingReports = [
    { label: 'Confirmed Bookings', value: confirmedCount, color: '#10b981' },
    { label: 'Completed Trips', value: completedCount, color: '#3b82f6' },
    { label: 'Cancelled Reservations', value: cancelledCount, color: '#ef4444' }
  ];

  const vehicleReports = [
    { label: 'SUVs & Family MUVs', value: 4, color: '#1e3a8a' },
    { label: 'Sedans', value: 3, color: '#0f766e' },
    { label: 'Electric Vehicles (EV)', value: 1, color: '#10b981' },
    { label: 'Luxury Flagships', value: 1, color: '#f59e0b' },
    { label: 'Adventure Bikes', value: 1, color: '#0284c7' }
  ];

  const revenueReports = [
    { label: 'Total Rental Revenues', value: 34870, isCurrency: true, color: '#1e3a8a' },
    { label: 'Taxes & Insurance Collected', value: 3487, isCurrency: true, color: '#0f766e' },
    { label: 'Net Business Income', value: 31383, isCurrency: true, color: '#10b981' }
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>Analytical Business Reports</h1>
        <p style={{ color: 'var(--text-muted)' }}>Visual breakdown of booking trends, vehicle utilization, and revenue stats.</p>
      </div>

      <div className="grid-3" style={{ gap: '1.75rem' }}>
        <ReportCard title="Booking Distribution Report" data={bookingReports} />
        <ReportCard title="Fleet Category Breakdown" data={vehicleReports} />
        <ReportCard title="Financial Revenue Summary" data={revenueReports} />
      </div>
    </div>
  );
};
