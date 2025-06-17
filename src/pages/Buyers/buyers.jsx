// src/pages/BuyerPage.jsx
import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, deleteUser } from "../../network/users";
import { setBuyersData, setBuyersError, setBuyersLoading } from "../../store/buyersSlice";

const navy = "#002349";

export default function BuyerPage() {
  const dispatch = useDispatch();
  const { buyersData: buyers, loading, error } = useSelector((state) => state.buyers);

  const fetchBuyers = async () => {
    try {
      dispatch(setBuyersLoading(true));
      const response = await getUsersList({ role: 'buyer' });
      dispatch(setBuyersData(response.data.data));
    } catch (error) {
      console.error("Error fetching buyers:", error);
      dispatch(setBuyersError(error.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load buyers",
        confirmButtonColor: "#002855",
      });
    } finally {
      dispatch(setBuyersLoading(false));
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This buyer will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);
          // Refresh the buyers list after successful deletion
          fetchBuyers();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The buyer has been removed.",
            confirmButtonColor: "#002855",
          });
        } catch (error) {
          console.error("Error deleting buyer:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete buyer",
            confirmButtonColor: "#002855",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (!buyers || buyers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h1 className="text-[#002349] font-bold text-xl mb-2">
            Buyers
          </h1>
          <p className="text-gray-500">No buyers available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* top bar + pill */}
      <div style={{ background: navy }} className="h-12" />
      <div className="relative -mt-1 flex justify-center">
        <span
          style={{ background: navy }}
          className="rounded-b-lg px-6 py-3 text-lg font-semibold text-white"
        >
          Buyer
        </span>
      </div>

      {/* buyer list */}
      <div className="mx-auto mt-8 max-w-3xl space-y-6 px-4">
        {buyers.map((b) => (
          <article
            key={b._id}
            className="flex flex-col sm:flex-row sm:items-start justify-between rounded-lg border border-gray-300 p-4 min-h-[180px] gap-4"
          >
            {/* Avatar */}
            <div className="mx-auto sm:mx-0 h-24 w-24 sm:h-50 sm:w-40 overflow-hidden rounded-lg border border-gray-200">
              {b.image ? (
                <img
                  src={b.image}
                  alt={b.username || 'User'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                  {(b.username || '?').charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Left Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="text-sm text-gray-500">#{b._id}</div>
              <div className="text-lg font-semibold text-gray-900">
                {b.username || 'No Username'}
              </div>
              <div className="text-xs text-gray-500">
                {b.email || 'No Email'}
              </div>
            </div>

            {/* Right: Contact + Buttons */}
            <div className="flex flex-col sm:items-end items-center justify-between min-w-[220px] w-full sm:w-auto">
              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row sm:gap-8 text-center sm:text-right">
                {/* Phone */}
                <div>
                  <div className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider">
                    phone number
                  </div>
                  <div className="text-sm text-gray-800">{b.phone || 'No Phone'}</div>
                </div>
              </div>

              {/* Delete Button */}
              <div className="mt-4">
                <Trash2
                  size={20}
                  className="cursor-pointer text-gray-600 hover:text-gray-800"
                  onClick={() => handleDelete(b._id)}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
