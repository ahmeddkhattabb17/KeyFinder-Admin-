// src/components/Layout.jsx
import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/navbar.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
