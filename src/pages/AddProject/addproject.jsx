import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import { createProject, getProjectById, updateProject } from "../../network/projects";
import { uploadImages } from "../../network/images";
import { useDispatch, useSelector } from "react-redux";
import { setProjectDetails, setProjectsError, setProjectsLoading } from "../../store/projectsSlice";

const NAVY = "#002349";
const BORDER_BLUE = "#0BA5FF";

export default function AddProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { projectDetails } = useSelector((state) => state.projects);

  const [form, setForm] = useState({
    name: "",
    description: "",
    developer: "",
  });
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (id) {
        try {
          dispatch(setProjectsLoading(true));
          const response = await getProjectById(id);
          dispatch(setProjectDetails(response.data.data));
        } catch (error) {
          dispatch(setProjectsError(error.message));
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch project details",
            confirmButtonColor: NAVY,
          });
        } finally {
          dispatch(setProjectsLoading(false));
        }
      }
    };

    fetchProjectDetails();
  }, [id, dispatch]);

  useEffect(() => {
    if (projectDetails) {
      setForm({
        name: projectDetails.name || "",
        description: projectDetails.description || "",
        developer: projectDetails.developer || "",
      });
      setImage(projectDetails.image || null);
      setIsImageChanged(false);
    }
  }, [projectDetails]);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setIsImageChanged(true);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    const required = ["name", "description", "developer"];
    const missing = required.filter((key) => !form[key]?.toString().trim());
    
    if (missing.length > 0) {
      return Swal.fire({
        icon: "error",
        title: "Incomplete information",
        text: "Please complete all required fields.",
        confirmButtonColor: NAVY,
      });
    }

    if (!imageFile && !image) {
      return Swal.fire({
        icon: "error",
        title: "Missing image",
        text: "Please add a project image.",
        confirmButtonColor: NAVY,
      });
    }

    try {
      let imageUrl = image;
      
      // Only upload new image if it was changed
      if (isImageChanged && imageFile) {
        const uploadResp = await uploadImages({ images: [imageFile], type: "project" });
        imageUrl = uploadResp.data.images;
      }

      const projectData = {
        ...form,
        image: imageUrl
      };

      if (id) {
        // Edit mode - Update existing project
        await updateProject(id, projectData);
      } else {
        // Create mode - Create new project
        await createProject(projectData);
      }

      Swal.fire({
        icon: "success",
        title: id ? "Updated successfully!" : "Added successfully!",
        text: `Your project has been ${id ? 'updated' : 'saved'}.`,
        confirmButtonColor: NAVY,
      }).then(() => {
        navigate("/view-project");
      });
    } catch (error) {
      console.error('Project operation error:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || `Failed to ${id ? 'update' : 'create'} project`,
        confirmButtonColor: NAVY,
      });
    }
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* top ribbon */}
        <div className="flex justify-center">
          <span
            className="rounded px-8 py-[6px] text-sm font-semibold text-white -mt-1"
            style={{ backgroundColor: NAVY }}
          >
            {id ? 'Edit Project' : 'Add Project'}
          </span>
        </div>

        {/* blue container */}
        <form
          id="projectForm"
          onSubmit={handleSubmit}
          className="mx-auto mt-6 w-[90%] max-w-3xl rounded border-2 p-6 sm:p-8"
          style={{ borderColor: BORDER_BLUE, backgroundColor: NAVY }}
        >
          {/* image + fields */}
          <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
            {/* image picker */}
            <label className="group relative block h-40 w-40 overflow-hidden rounded bg-white border-2 border-dashed border-gray-400">
              {image ? (
                <img
                  src={image}
                  alt="project"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Plus size={24} />
                  <span className="text-[10px]">Add Photo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handleImageChange}
              />
            </label>

            {/* fields */}
            <div className="grid gap-4 text-[11px] font-semibold text-white">
              {[
                ["Project Name", "name"],
                ["Project Developer", "developer"],
              ].map(([label, name]) => (
                <div key={name} className="space-y-[2px]">
                  <label htmlFor={name}>{label}</label>
                  <input
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="h-8 w-full rounded bg-white px-2 text-[10px] text-gray-900 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* description */}
          <div className="mt-6 space-y-[2px] text-sm text-white">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={form.description}
              onChange={handleChange}
              className="w-full rounded bg-white p-2 text-[13px] text-gray-900 outline-none"
            />
          </div>
        </form>

        {/* buttons outside the blue container */}
        <div className="flex justify-center gap-6 mt-4">
          <button
            type="submit"
            form="projectForm"
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
      </div>
    </>
  );
} 