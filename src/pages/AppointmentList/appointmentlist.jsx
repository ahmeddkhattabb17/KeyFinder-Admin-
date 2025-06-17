import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../../network/appointments';
import { 
  setAppointmentsData, 
  setAppointmentsError, 
  setAppointmentsLoading 
} from '../../store/appointmentsSlice';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function AppointmentList() {
  const dispatch = useDispatch();
  const { appointmentsData, loading, error } = useSelector((state) => state.appointments);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        dispatch(setAppointmentsLoading(true));
        const response = await getAppointments();
        dispatch(setAppointmentsData(response.data.data));
      } catch (err) {
        dispatch(setAppointmentsError(err.message || 'Failed to fetch appointments'));
      } finally {
        dispatch(setAppointmentsLoading(false));
      }
    };

    fetchAppointments();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!appointmentsData || appointmentsData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No appointments found</p>
      </div>
    );
  }

  const mappedAppointments = appointmentsData.map(appt => ({
    id: appt._id,
    date: formatDate(appt.appointmentDate),
    buyer: appt.buyerId?.username || 'N/A',
    property: appt.property?.title || 'N/A',
    location: appt.property?.location || 'N/A',
    price: appt.property?.priceRange ? appt.property.priceRange.replace(/_/g, ' ') : 'N/A',
    type: appt.type.charAt(0).toUpperCase() + appt.type.slice(1),
    broker: appt.brokerId?.username || 'N/A',
    status: appt.status.charAt(0).toUpperCase() + appt.status.slice(1)
  }));

  return (
    <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-primary">
              <tr>
                {[
                  "Appointment ID",
                  "Date",
                  "Buyer",
                  "Property",
                  "Location",
                  "Price",
                  "Type",
                  "Broker",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-white"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mappedAppointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.buyer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.property}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.broker}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {appt.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
