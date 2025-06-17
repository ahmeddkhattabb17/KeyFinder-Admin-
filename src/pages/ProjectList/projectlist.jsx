/* eslint-disable no-unused-vars */
// src/pages/ProjectList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SearchBar from "../../components/Searchbar/searchbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsList, deleteProject } from "../../network/projects";
import { setProjectsData, setProjectsError, setProjectsLoading } from "../../store/projectsSlice";

const NAVY = "#002349";

export default function ProjectList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectsData: projects, loading, error } = useSelector((state) => state.projects);
  const [searchValue, setSearchValue] = useState("");


  const fetchProjects = async () => {
    try {
      dispatch(setProjectsLoading(true));
      const response = await getProjectsList({query: searchValue});
      const projectsArray = Array.isArray(response.data?.data) ? response?.data?.data : [];
      dispatch(setProjectsData(projectsArray));
    } catch (error) {
      console.error("Error fetching projects:", error);
      dispatch(setProjectsError(error.message));
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load projects",
        confirmButtonColor: "#002855",
      });
    } finally {
      dispatch(setProjectsLoading(false));
    }
  };

  const handleDelete = async (projectId) => {
    try {
      const result = await Swal.fire({
        title: "Delete this project?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: NAVY,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete",
      });

      if (result.isConfirmed) {
        await deleteProject(projectId);
        await fetchProjects(); // Refresh the list after deletion
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Project has been deleted successfully.",
          confirmButtonColor: NAVY,
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete project",
        confirmButtonColor: "#002855",
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [dispatch, searchValue]);

  // Ensure projects is an array before rendering
  const projectsList = Array.isArray(projects) ? projects : [];

  return (
    <section className="bg-white pt-6 pb-14 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Search */}
      <SearchBar
        placeholder="Search Projects…"
        wrapperClassName="w-full max-w-md mx-auto"
        inputClassName="bg-[#001731] text-gray-200 placeholder-gray-400"
        buttonClassName="bg-[#002349] hover:bg-[#032d6b]"
        iconClassName="h-4 w-4"
        value={searchValue}
        onChange={setSearchValue}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 text-xl">Error: {error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && projectsList.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h1 className="text-[#002349] font-bold text-xl mb-2">
              Projects
            </h1>
            <p className="text-gray-500">No projects available</p>
          </div>
        </div>
      )}

      {/* Project List */}
      {!loading && !error && projectsList.length > 0 && (
        <div className="mt-6 space-y-6">
          {projectsList.map((project) => (
            <div
              key={project._id}
              className="flex flex-wrap items-center bg-[#002349] rounded-xl p-4 shadow-lg"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full md:w-72 h-44 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 text-white ml-4 space-y-1">
                <p>
                  <span className="font-semibold">ID:</span> {project._id}
                </p>
                <p>
                  <span className="font-semibold">Name:</span> {project.name}
                </p>
                <p>
                  <span className="font-semibold">Developer:</span> {project.developer}
                </p>
                <p>
                  <span className="font-semibold">Description:</span> {project.description}
                </p>
                <p>
                  <span className="font-semibold">Properties:</span> {project.properties.length}
                </p>
                <div className="mt-2">
                  <span className="font-semibold">Property Types:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[...new Set(project.properties.map(prop => prop.type))].map((type, index) => (
                      <span key={index} className="text-xs bg-white/10 px-2 py-1 rounded">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col gap-2 ml-auto mt-4 md:mt-0">
                <button
                  onClick={() => navigate(`/edit-project/${project._id}`)}
                  className="bg-white text-[#002349] text-xs font-semibold rounded-lg px-6 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 text-white text-xs font-semibold rounded-lg px-6 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 