// src/components/Navbar.jsx
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import brandLogo from "../../assets/logo.svg";
import { useState } from "react";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    path: "/dashboard",
    children: [
      { name: "Dashboard", path: "/home" },
      // { name: "Review", path: "/reviews" },
      { name: "Appointment List", path: "/appointments" },
      { name: "Buyer", path: "/buyer" },
    ],
  },
  {
    name: "Broker",
    path: "/broker",
    children: [
      { name: "Add Broker", path: "/add-broker" },
      { name: "All Brokers", path: "/view-brokers" },
    ],
  },
  {
    name: "Project",
    path: "/project",
    children: [
      { name: "Add Project", path: "/add-project" },
      { name: "Project List", path: "/view-project" },
    ],
  },
  {
    name: "Property",
    path: "/property",
    children: [
      { name: "Add Property", path: "/add-property" },
      { name: "Property List", path: "/view-property" },
    ],
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleHomeClick = () => {
    if (location.pathname === "/home") {
      // If we're already on the home page, do nothing
      return;
    }
    // Otherwise navigate to home
    navigate("/home");
  };

  return (
    <header className="w-full shadow-md text-white">
      {/* top bar */}
      <div className="w-full bg-[#001731]">
        <div className="container mx-auto flex  justify-end px-5 py-2">
          {/* login / logout left side */}

          {/* home icon on the right */}
          <Home
            size={20}
            strokeWidth={2.5}
            className="cursor-pointer mx-2"
            onClick={handleHomeClick}
          />
          {user ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium hover:text-gold transition-colors"
            >
              Join / Log In
            </Link>
          )}
        </div>
      </div>

      {/* main nav */}
      <div className="w-full bg-primary">
        <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 gap-6">
          {/* logo */}
          <Link to="/home" className="flex items-center">
            <img
              src={brandLogo}
              alt="KeyFinder"
              className="h-35 w-auto select-none pointer-events-none"
            />
          </Link>

          {/* nav links */}
          <nav className="flex flex-wrap justify-center sm:justify-end gap-8 text-sm font-medium uppercase tracking-wide relative">
            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="relative">
                {/* Main link with toggle */}
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`hover:text-gold transition-colors ${
                    openDropdown === item.name ? "text-gold" : ""
                  }`}
                >
                  {item.name}
                </button>

                {/* Dropdown on click */}
                {item.children && openDropdown === item.name && (
                  <div
                    className="absolute top-full mt-2 bg-[#002349] rounded shadow-lg flex flex-col min-w-[180px] z-50 py-2"
                    style={{ right: 0 }}
                  >
                    {item.children.map((child) => (
                      <NavLink
                        key={child.name}
                        to={child.path}
                        className="px-4 py-2 text-white text-sm hover:bg-[#002a6d] whitespace-nowrap"
                        onClick={() => setOpenDropdown(null)} // close on select
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
