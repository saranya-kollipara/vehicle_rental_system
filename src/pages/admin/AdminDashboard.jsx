import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import bookingService from '../../services/bookingService';
import vehicleService from '../../services/vehicleService';
import { StatCard } from '../../components/admin/StatCard';
import { BookingTable } from '../../components/admin/BookingTable';
import { ReportCard } from '../../components/admin/ReportCard';
import { Loader } from '../../components/common/Loader';
import { Car, BookOpen, Users, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [revenueMonthly, setRevenueMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, vehiclesRes, revReportRes] = await Promise.all([
        adminService.getDashboardStats().catch(() => null),
        bookingService.getAllBookingsAdmin().catch(() => null),
        vehicleService.getVehicles().catch(() => null),
        adminService.getRevenueReports().catch(() => null)
      ]);

      if (statsRes?.success && statsRes.data) {
        setStats(statsRes.data);
      }

      if (bookingsRes?.success && bookingsRes.data) {
        setRecentBookings(bookingsRes.data);
      }

      if (vehiclesRes?.success && vehiclesRes.data) {
        const vehicles = vehiclesRes.data;
        const categories = [
          { label: 'SUVs & MUVs', value: vehicles.filter(v => ['SUV', 'MUV'].includes(v.category)).length, color: '#1e3a8a' },
          { label: 'Sedans', value: vehicles.filter(v => v.category === 'Sedan').length, color: '#0f766e' },
          { label: 'Electric (EV)', value: vehicles.filter(v => v.category === 'Electric').length, color: '#10b981' },
          { label: 'Luxury Cars', value: vehicles.filter(v => v.category === 'Luxury').length, color: '#f59e0b' },
          { label: 'Hatchbacks', value: vehicles.filter(v => v.category === 'Hatchback').length, color: '#3b82f6' }
        ];
        setCategoryBreakdown(categories);
      }

      if (revReportRes?.success && revReportRes.data?.monthlyRevenue) {
        const months = revReportRes.data.monthlyRevenue.map((r, i) => ({
          label: r.month,
          value: parseFloat(r.total_revenue || 0),
          isCurrency: true,
          color: ['#1e3a8a', '#0f766e', '#0284c7', '#10b981'][i % 4]
        }));
        setRevenueMonthly(months);
      }
    } catch (err) {
      console.error('Error fetching admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await bookingService.updateBookingStatusAdmin(id, { booking_status: newStatus });
      if (res.success) {
        await fetchDashboardData();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (loading) return <Loader text="Loading Admin Dashboard Analytics..." />;

  const totalVehicles = stats?.totalVehicles || 0;
  const availableVehicles = stats?.availableVehicles || 0;
  const rentedVehicles = stats?.rentedVehicles || 0;
  const totalBookings = stats?.totalBookings || recentBookings.length;
  const totalUsers = stats?.totalUsers || 0;
  const totalRevenue = stats?.totalRevenue || 0;

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.35rem 0' }}>DriveEase Admin Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time rental business analytics, fleet status, and reservation records.</p>
      </div>

      {/* Stats Row */}
      <div className="stat-grid">
        <StatCard title="Total Fleet Vehicles" value={totalVehicles} icon={Car} color="var(--primary)" subtitle={`${availableVehicles} Ready / ${rentedVehicles} Rented`} />
        <StatCard title="Total Reservations" value={totalBookings} icon={BookOpen} color="var(--accent)" />
        <StatCard title="Registered Customers" value={totalUsers} icon={Users} color="var(--secondary)" />
        <StatCard title="Total Business Revenue" value={formatCurrency(totalRevenue)} icon={DollarSign} color="var(--success)" />
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid-2" style={{ gap: '1.75rem', marginBottom: '2.5rem', marginTop: '2.5rem' }}>
        <ReportCard title="Vehicle Category Distribution" data={categoryBreakdown} />
        <ReportCard title="Monthly Revenue Growth (INR)" data={revenueMonthly} />
      </div>

      {/* Recent Bookings Management */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.3rem', margin: 0 }}>Recent Customer Reservations</h2>
        </div>
        <BookingTable 
          bookings={recentBookings.slice(0, 5)} 
          onStatusChange={handleStatusChange} 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
