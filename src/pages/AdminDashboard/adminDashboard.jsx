import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(parsedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1>Welcome Admin</h1>
    </div>
  );
} 