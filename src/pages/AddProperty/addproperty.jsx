// src/components/AddProperty.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PROPERTY_TYPES, AREA_RANGES, PRICE_RANGES, PROPERTY_STATUS } from "../../../utils/constants";
import { addPropertyToProject, getPropertyById, updateProperty } from "../../network/properties";
import { uploadImages } from "../../network/images";

const NAVY = "#002349";
const BORDER_BLUE = "#0BA5FF";

export default function AddProperty() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    areaRange: "",
    priceRange: "",
    status: "available",
    bedrooms: "",
    bathrooms: "",
    projectId: "",
  });
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await getPropertyById(id);
          const propertyData = response.data.data;
          
          setForm({
            title: propertyData.title || "",
            description: propertyData.description || "",
            type: propertyData.type || "",
            areaRange: propertyData.areaRange || "",
            priceRange: propertyData.priceRange || "",
            status: propertyData.status || "available",
            bedrooms: propertyData.bedrooms || "",
            bathrooms: propertyData.bathrooms || "",
            projectId: propertyData.projectId || "",
          });
          
          if (propertyData.images) {
            setImages(propertyData.images);
          }
          setIsImageChanged(false);
        } catch (error) {
          console.error('Property fetch error:', error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch property details",
            confirmButtonColor: NAVY,
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check if all files are images
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid file type",
        text: "Please upload only image files (JPEG, PNG, etc.)",
        confirmButtonColor: NAVY,
      });
      return;
    }

    // Add new files to imageFiles array
    setImageFiles(prev => [...prev, ...files]);
    setIsImageChanged(true);

    // Read all files
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    // Update images state with new previews
    Promise.all(readers).then(results => {
      setImages(prev => [...prev, ...results]);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    const required = [
      "title",
      "description",
      "type",
      "areaRange",
      "priceRange",
      "bedrooms",
      "bathrooms",
      "projectId",
    ];

    // Check empties
    const missing = required.filter((key) => !form[key]?.toString().trim());
    if (missing.length > 0) {
      return Swal.fire({
        icon: "error",
        title: "Incomplete information",
        text: "Please complete all required fields.",
        confirmButtonColor: NAVY,
      });
    }

    if (!id && imageFiles.length === 0) {
      return Swal.fire({
        icon: "error",
        title: "Missing images",
        text: "Please add at least one property image.",
        confirmButtonColor: NAVY,
      });
    }

    try {
      let imageUrls = images;

      // Only upload new images if they were changed
      if (isImageChanged && imageFiles.length > 0) {
        const uploadResp = await uploadImages({ images: imageFiles, type: "property" });
        imageUrls = uploadResp.data.images;
      }

      // Prepare property data
      const propertyData = {
        ...form,
        images: imageUrls
      };

      // Add property to project
      if (id) {
        await updateProperty(id, propertyData);
      } else {
        await addPropertyToProject(form.projectId, propertyData);
      }

      // Success alert then redirect
      Swal.fire({
        icon: "success",
        title: id ? "Updated successfully!" : "Added successfully!",
        text: `Your property has been ${id ? 'updated' : 'saved'}.`,
        confirmButtonColor: NAVY,
      }).then(() => {
        navigate("/view-property");
      });
    } catch (error) {
      console.error('Property operation error:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || `Failed to ${id ? 'update' : 'add'} property`,
        confirmButtonColor: NAVY,
      });
    }
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002349] mx-auto"></div>
          <p className="mt-4 text-[#002349]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans pb-12">
        {/* top ribbon */}
        <div className="flex justify-center">
          <span
            className="rounded px-8 py-[6px] text-sm font-semibold text-white -mt-1"
            style={{ backgroundColor: NAVY }}
          >
            {id ? 'Edit Property' : 'Add Property'}
          </span>
        </div>

        {/* blue container */}
        <form
          id="propertyForm"
          onSubmit={handleSubmit}
          className="mx-auto mt-6 w-[90%] max-w-3xl rounded border-2 p-6 sm:p-8"
          style={{ borderColor: BORDER_BLUE, backgroundColor: NAVY }}
        >
          {/* image picker */}
          <div className="mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`property ${index + 1}`}
                    className="h-40 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImages(prev => prev.filter((_, i) => i !== index));
                      setImageFiles(prev => prev.filter((_, i) => i !== index));
                      setIsImageChanged(true);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="group relative block h-40 w-full overflow-hidden rounded border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xs font-semibold text-gray-600">
                  Click to add photos
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/gif"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={handleFile}
                  multiple={true}
                />
              </label>
            </div>
          </div>

          {/* form fields */}
          <div className="grid gap-4 text-sm text-white">
            <div className="space-y-[2px]">
              <label htmlFor="projectId">Project ID</label>
              <input
                id="projectId"
                name="projectId"
                value={form.projectId}
                onChange={handleChange}
                className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                placeholder="Enter project ID"
              />
            </div>

            <div className="space-y-[2px]">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                placeholder="Enter property title"
              />
            </div>

            <div className="space-y-[2px]">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded bg-white p-2 text-gray-900 outline-none"
                placeholder="Enter property description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-[2px]">
                <label htmlFor="type">Property Type</label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                >
                  <option value="">Select Type</option>
                  {Object.entries(PROPERTY_TYPES)
                    .filter(([key, value]) => value !== "")
                    .map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="areaRange">Area Range</label>
                <select
                  id="areaRange"
                  name="areaRange"
                  value={form.areaRange}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                >
                  <option value="">Select Area</option>
                  {Object.entries(AREA_RANGES)
                    .filter(([key, value]) => value !== "")
                    .map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="priceRange">Price Range</label>
                <select
                  id="priceRange"
                  name="priceRange"
                  value={form.priceRange}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                >
                  <option value="">Select Price</option>
                  {Object.entries(PRICE_RANGES)
                    .filter(([key, value]) => value !== "")
                    .map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                >
                  {Object.entries(PROPERTY_STATUS).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="1"
                  value={form.bedrooms}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                  placeholder="Enter number of bedrooms"
                />
              </div>

              <div className="space-y-[2px]">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="1"
                  value={form.bathrooms}
                  onChange={handleChange}
                  className="h-8 w-full rounded bg-white px-2 text-gray-900 outline-none"
                  placeholder="Enter number of bathrooms"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* buttons outside the blue container */}
      <div className="flex justify-center gap-6 -mt-4 mb-8">
        <button
          type="submit"
          form="propertyForm"
          className="w-32 rounded-xl py-[6px] text-sm font-semibold text-white border border-white shadow-md transition-all hover:bg-white hover:text-[#002349]"
          style={{ backgroundColor: NAVY }}
        >
          Confirm
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="w-32 rounded-xl py-[6px] text-sm font-semibold text-white border border-white shadow-md transition-all hover:bg-white hover:text-[#002349]"
          style={{ backgroundColor: NAVY }}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
