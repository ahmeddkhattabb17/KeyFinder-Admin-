/* eslint-disable no-unused-vars */
// src/pages/PropertyList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Swal from "sweetalert2";
import SearchBar from "../../components/Searchbar/searchbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import PropertyCardInList from "./PropertyCardInList";
import { getProperties, deleteProperty } from "../../network/properties";
import { setProperties, setPropertiesLoading, setPropertiesError } from "../../store/propertiesSlice";
import { PROPERTY_TYPES, AREA_RANGES, PRICE_RANGES } from "../../../utils/constants";

const NAVY = "#002349";
const DARK = "#001731";
const BORDER_BLUE = "#0BA5FF";



export default function PropertyList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.properties);
  const [searchValue, setSearchValue] = useState("");
  const [showPropertyType, setShowPropertyType] = useState(false);
  const [showArea, setShowArea] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [imageErrors, setImageErrors] = useState({});


  const propertyTypes = Object.keys(PROPERTY_TYPES).filter(key => key !== 'all');
  const areaOptions = Object.keys(AREA_RANGES).filter(key => key !== 'all');
  const priceOptions = Object.keys(PRICE_RANGES).filter(key => key !== 'all');

  const fetchProperties = async () => {
    try {
      dispatch(setPropertiesLoading(true));
      const response = await getProperties({
        all: !selectedProperty && !selectedArea && !selectedPrice && !searchValue,
        key: searchValue || undefined,
        type: selectedProperty || undefined,
        areaRange: selectedArea || undefined,
        priceRange: selectedPrice || undefined
      });
      dispatch(setProperties(response.data.data.properties));
    } catch (error) {
      console.error("Error fetching properties:", error);
      dispatch(setPropertiesError(error.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load properties",
        confirmButtonColor: NAVY,
      });
    } finally {
      dispatch(setPropertiesLoading(false));
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [dispatch, searchValue, selectedProperty, selectedArea, selectedPrice]);

  const handleDelete = async (propertyId) => {
    try {
      const result = await Swal.fire({
        title: "Delete this property?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: NAVY,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete",
      });

      if (result.isConfirmed) {
        await deleteProperty(propertyId);
        await fetchProperties(); // Refresh the list after deletion
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Property has been deleted successfully.",
          confirmButtonColor: NAVY,
        });
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete property",
        confirmButtonColor: NAVY,
      });
    }
  };

  const toggle = (dropdown) => {
    setShowPropertyType(dropdown === "property");
    setShowArea(dropdown === "area");
    setShowPrice(dropdown === "price");
  };

  const handleImageError = (propertyId) => {
    setImageErrors(prev => ({
      ...prev,
      [propertyId]: true
    }));
  };

  return (
    <section className="bg-white pt-8 pb-14 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Search */}
      <SearchBar
        placeholder="Search Properties…"
        wrapperClassName="w-full max-w-md mx-auto"
        inputClassName="bg-[#001731] text-gray-200 placeholder-gray-400"
        buttonClassName="bg-[#002349] hover:bg-[#032d6b]"
        iconClassName="h-4 w-4"
        value={searchValue}
        onChange={setSearchValue}
      />

<div className="mt-4 flex flex-wrap justify-center gap-3 relative">
        {/* Property Type */}
        <div className="relative">
          <button
            onClick={() => toggle("property")}
            className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
          >
            {selectedProperty ? PROPERTY_TYPES[selectedProperty] : "Property Type"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showPropertyType && (
            <ul className="absolute mt-2 w-48 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              <li
                key="all"
                onClick={() => {
                  setSelectedProperty("");
                  setShowPropertyType(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Types
              </li>
              {propertyTypes.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedProperty(item);
                    setShowPropertyType(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {PROPERTY_TYPES[item]}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Area */}
        <div className="relative">
          <button
            onClick={() => toggle("area")}
            className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
          >
            {selectedArea ? AREA_RANGES[selectedArea] : "Area"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showArea && (
            <ul className="absolute mt-2 w-56 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              <li
                key="all"
                onClick={() => {
                  setSelectedArea("");
                  setShowArea(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Areas
              </li>
              {areaOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedArea(item);
                    setShowArea(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {AREA_RANGES[item]}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Average Price */}
        <div className="relative">
          <button
            onClick={() => toggle("price")}
            className="inline-flex items-center bg-[#001731] px-5 py-2 rounded-full text-sm text-white font-semibold"
          >
            {selectedPrice ? PRICE_RANGES[selectedPrice] : "Average Price"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </button>
          {showPrice && (
            <ul className="absolute mt-2 w-52 bg-white text-[#042987] rounded shadow z-20 text-sm text-left">
              <li
                key="all"
                onClick={() => {
                  setSelectedPrice("");
                  setShowPrice(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Prices
              </li>
              {priceOptions.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedPrice(item);
                    setShowPrice(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {PRICE_RANGES[item]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="min-h-[60vh] flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#002349] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        </div>
      ) : error ? (
        <div className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 flex justify-center items-center">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      ) : properties.length === 0 ? (
        <div className="w-full py-10 px-4 sm:px-6 md:px-8 lg:px-0 flex justify-center items-center">
          <div className="text-xl text-[#002855]">No properties found</div>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {properties.map((property) => (
            <PropertyCardInList
              key={property._id}
              property={property}
              onDelete={handleDelete}
              hasImageError={imageErrors[property._id]}
              onImageError={handleImageError}
            />
          ))}
        </div>
      )}
    </section>
  );
}
