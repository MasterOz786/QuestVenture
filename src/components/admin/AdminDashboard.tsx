import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  MapPin, 
  Activity,
  DollarSign,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useAdminContext } from '../../context/AdminContext';

export default function AdminDashboard() {
  const { state } = useAdminContext();
  const { dashboardStats } = state;

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    trend 
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ElementType;
    trend?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
        {trend && (
          <p className="text-sm text-green-600 font-medium">{trend}</p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Scavenger Hunt System</h1>
        <p className="text-gray-600">Admin Dashboard Overview</p>
      </motion.div>

      {/* Client Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Client Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Clients"
            value={dashboardStats.totalClients}
            icon={Users}
          />
          <StatCard
            title="New Clients"
            value={dashboardStats.newClients}
            trend={`+ ${dashboardStats.newClientsGrowth}% this month`}
            icon={TrendingUp}
          />
          <StatCard
            title="Top Clients"
            value={dashboardStats.topClient}
            icon={DollarSign}
          />
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">Client Distribution</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  {dashboardStats.clientDistribution.members}%
                </div>
                <p className="text-xs text-gray-500 mt-2">Members</p>
              </div>
              <div className="text-2xl font-bold text-gray-300">/</div>
              <div className="flex-1">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg">
                  {dashboardStats.clientDistribution.customers}%
                </div>
                <p className="text-xs text-gray-500 mt-2">Customers</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Activity Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Scavenger Hunt Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Hunts"
            value={dashboardStats.totalHunts}
            icon={MapPin}
          />
          <StatCard
            title="Active Hunts"
            value={dashboardStats.activeHunts}
            icon={Activity}
          />
          <StatCard
            title="Participants"
            value={dashboardStats.participants.toLocaleString()}
            icon={Users}
          />
          <StatCard
            title="Avg. Completion"
            value={`${dashboardStats.avgCompletion}%`}
            icon={BarChart3}
          />
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Activity</h3>
          <div className="flex items-end space-x-2 h-48">
            {dashboardStats.monthlyActivity.map((item, index) => (
              <div key={item.month} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.value / 35) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="w-full bg-blue-500 rounded-t-md min-h-[20px]"
                />
                <p className="text-xs text-gray-500 mt-2">{item.month}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Clients */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Clients Created</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-600 pb-2 border-b">
              <span>Client</span>
              <span>Hunts</span>
              <span>Revenue</span>
            </div>
            {dashboardStats.recentClients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="grid grid-cols-3 gap-4 text-sm"
              >
                <span className="font-medium text-gray-900">{client.name}</span>
                <span className="text-gray-600">{client.hunts}</span>
                <span className="text-gray-600">${client.revenue.toLocaleString()}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}