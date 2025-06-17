import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../network/statistics';
import { setStatisticsData, setStatisticsError, setStatisticsLoading } from '../../store/statisticsSlice';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const COLORS = {
  available: '#10B981',
  reserved: '#F59E0B',
  sold: '#EF4444',
  buyers: '#3B82F6',
  brokers: '#8B5CF6',
  completed: '#10B981',
};

const Statistics = () => {
  const dispatch = useDispatch();
  const { statisticsData, loading, error } = useSelector((state) => state.statistics);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setStatisticsLoading(true));
        const response = await getStatus();
        dispatch(setStatisticsData(response.data));
      } catch (err) {
        dispatch(setStatisticsError(err.message || 'Failed to fetch statistics'));
      } finally {
        dispatch(setStatisticsLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>Error: {error}</div>;
  }

  if (!statisticsData) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}>No data available</div>;
  }

  const { properties, users, appointments } = statisticsData;

  const propertyPieData = [
    { name: 'Available', value: properties.available.count, color: COLORS.available },
    { name: 'Reserved', value: properties.reserved.count, color: COLORS.reserved },
    { name: 'Sold', value: properties.sold.count, color: COLORS.sold },
  ];

  const userPieData = [
    { name: 'Buyers', value: users.buyers.count, color: COLORS.buyers },
    { name: 'Brokers', value: users.brokers.count, color: COLORS.brokers },
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div style={{ padding: 24, background: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Statistics Dashboard</h1>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        {/* Properties Card */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, flex: 1, minWidth: 270 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 16, color: '#6b7280' }}>Total Properties</div>
              <div style={{ fontSize: 26, fontWeight: 600 }}>{properties.total}</div>
            </div>
            <div style={{ width: 64, height: 64 }}>
              <CircularProgressbar
                value={properties.available.percentage}
                text={`${properties.available.percentage}%`}
                styles={buildStyles({
                  pathColor: COLORS.available,
                  textColor: COLORS.available,
                  trailColor: '#E5E7EB',
                })}
              />
            </div>
          </div>
          <div>
            {propertyPieData.map((item) => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: item.color, marginRight: 8 }}></span>
                  {item.name}
                </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Users Card */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, flex: 1, minWidth: 270 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 16, color: '#6b7280' }}>Total Users</div>
              <div style={{ fontSize: 26, fontWeight: 600 }}>{users.total}</div>
            </div>
            <div style={{ width: 64, height: 64 }}>
              <CircularProgressbar
                value={users.buyers.percentage}
                text={`${users.buyers.percentage}%`}
                styles={buildStyles({
                  pathColor: COLORS.buyers,
                  textColor: COLORS.buyers,
                  trailColor: '#E5E7EB',
                })}
              />
            </div>
          </div>
          <div>
            {userPieData.map((item) => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: item.color, marginRight: 8 }}></span>
                  {item.name}
                </span>
                <span>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Appointments Card */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, flex: 1, minWidth: 270 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 16, color: '#6b7280' }}>Total Appointments</div>
              <div style={{ fontSize: 26, fontWeight: 600 }}>{appointments.total}</div>
            </div>
            <div style={{ width: 64, height: 64 }}>
              <CircularProgressbar
                value={appointments.completed.percentage}
                text={`${appointments.completed.percentage}%`}
                styles={buildStyles({
                  pathColor: COLORS.completed,
                  textColor: COLORS.completed,
                  trailColor: '#E5E7EB',
                })}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Completed</span>
            <span>{appointments.completed.count}</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        {/* Properties Pie Chart */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, flex: 1, minWidth: 320 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Properties Status</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={propertyPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {propertyPieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Users Pie Chart */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, flex: 1, minWidth: 320 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Users Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={userPieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {userPieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Properties Table */}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #0001', padding: 24, marginBottom: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Latest Properties</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ padding: 8, textAlign: 'left', fontWeight: 500 }}>Title</th>
                <th style={{ padding: 8, textAlign: 'left', fontWeight: 500 }}>Status</th>
                <th style={{ padding: 8, textAlign: 'left', fontWeight: 500 }}>Project</th>
                <th style={{ padding: 8, textAlign: 'left', fontWeight: 500 }}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {properties.latest.map((prop) => (
                <tr key={prop._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: 8 }}>{prop.title}</td>
                  <td style={{ padding: 8, color: COLORS[prop.status] || '#374151', fontWeight: 500 }}>{prop.status.charAt(0).toUpperCase() + prop.status.slice(1)}</td>
                  <td style={{ padding: 8 }}>{prop.projectName}</td>
                  <td style={{ padding: 8 }}>{formatDate(prop.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics;