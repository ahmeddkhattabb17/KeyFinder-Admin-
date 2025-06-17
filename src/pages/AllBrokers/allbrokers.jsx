import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/land.svg";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, deleteUser } from "../../network/users";
import { setBrokersData, setBrokersError, setBrokersLoading } from "../../store/brokersSlice";

const NAVY = "#002349";

export default function AllBrokers() {
  const dispatch = useDispatch();
  const { brokersData: brokers, loading, error } = useSelector((state) => state.brokers);

  const fetchBrokers = async () => {
    try {
      dispatch(setBrokersLoading(true));
      const response = await getUsersList({ role: 'broker' });
      dispatch(setBrokersData(response.data.data));
    } catch (error) {
      console.error("Error fetching brokers:", error);
      dispatch(setBrokersError(error.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load brokers",
        confirmButtonColor: "#002855",
      });
    } finally {
      dispatch(setBrokersLoading(false));
    }
  };

  useEffect(() => {
    fetchBrokers();
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Delete this broker?",
      text: "This action can't be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      padding: "1.5rem",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id);
          // Refresh the brokers list after successful deletion
          fetchBrokers();
          Swal.fire({
            title: "Deleted!",
            text: "The broker has been removed.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Error deleting broker:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete broker",
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

  if (!brokers || brokers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h1 className="text-[#002349] font-bold text-xl mb-2">
            Brokers
          </h1>
          <p className="text-gray-500">No brokers available</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 font-sans">
      {/* ───────────────── banner ───────────────── */}
      <div
        className="flex h-100 w-full items-end justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <span
          className="-mb-7 rounded px-6 py-1 text-sm font-semibold text-white"
          style={{ backgroundColor: NAVY }}
        >
          Broker Card View
        </span>
      </div>

      {/* ───────────────── main content ───────────────── */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* heading + "Add New" */}
        <div className="relative mb-10 flex items-center justify-center">
          <h2 className="text-xs font-semibold tracking-wide text-gray-700">
            All Brokers / All Brokers listing
          </h2>

          <Link
            to="/add-broker"
            className="absolute right-0 rounded-full px-5 py-[3px] text-[10px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: NAVY }}
          >
            Add New
          </Link>
        </div>

        {/* grid of cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brokers.map((b) => (
            <article
              key={b._id}
              className="relative rounded-md border border-gray-300 bg-[#D9D9D9] p-4 shadow-sm text-[20px] font-semibold text-gray-800"
            >
              {/* avatar */}
              <div className="flex justify-center">
                {b.image ? (
                  <img
                    src={b.image}
                    alt={`${b.firstName} ${b.lastName}`}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-2xl font-semibold text-gray-600">
                    {b.firstName ? b.firstName[0].toUpperCase() : '?'}
                  </div>
                )}
              </div>

              {/* name + title */}
              <h3 className="mt-2 text-center capitalize text-gray-900">
                {b.firstName} {b.lastName}
              </h3>
              <p className="-mt-1 text-center capitalize text-gray-600 text-[16px]">
                {b.title || "real-estate broker"}
              </p>

              {/* description */}
              <p className="mt-3 leading-6">
                Answering guest inquiries, directing phone calls, coordinating
                travel plans, and more
              </p>

              {/* contact info */}
              <div className="mt-3 space-y-1">
                <p>
                  <span className="font-semibold">Email:</span> {b.email}
                </p>
                <p>
                  <span className="font-semibold">phone number:</span>{" "}
                  {b.phone}
                </p>
              </div>

              {/* delete button */}
              <button
                onClick={() => handleDeleteClick(b._id)}
                className="absolute bottom-3 right-3 text-gray-600 transition-colors hover:text-red-600"
                title="Delete broker"
              >
                <Trash2 size={20} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
