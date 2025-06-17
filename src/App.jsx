import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Layout from "./components/Layout/layout";
// import ReviewsList from "./pages/ReviewsList/reviewslist";
import AppointmentList from "./pages/AppointmentList/appointmentlist";
import BuyerPage from "./pages/Buyers/buyers";
import AddBroker from "./pages/AddBroker/addbroker";
import AllBrokers from "./pages/AllBrokers/allbrokers";
import AddProperty from "./pages/AddProperty/addproperty";
import PropertyList from "./pages/PropertyList/propertylist";
import ForgotPassword from "./pages/ForgetPassword/forgetpassword";
import AdminDashboard from "./pages/AdminDashboard/adminDashboard";
import AddProject from "./pages/AddProject/addproject";
import ProjectList from "./pages/ProjectList/projectlist";
import Statistics from "./pages/Statistics/Statistics";
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected routes */}
        <Route path="/*" element={<Layout />}>
          <Route path="home" element={<Statistics />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          {/* <Route path="reviews" element={<ReviewsList />} /> */}
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="buyer" element={<BuyerPage />} />
          <Route path="add-broker" element={<AddBroker />} />
          <Route path="view-brokers" element={<AllBrokers />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="edit-property/:id" element={<AddProperty />} />
          <Route path="view-property" element={<PropertyList />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="edit-project/:id" element={<AddProject />} />
          <Route path="view-project" element={<ProjectList />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
