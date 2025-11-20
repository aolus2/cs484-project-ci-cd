import React, { useState, useEffect } from 'react';
import StudentDashboard from './components/StudentDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import LoginPage from './components/LoginPage';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInstructor, setIsInstructor] = useState(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

<<<<<<< HEAD
  const checkAuthStatus = async () => {
    try {
      // Try to fetch current user to check if we're authenticated
      const response = await fetch('http://localhost:8080/api/auth/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const accountData = await response.json();
        const hasAdminRole = accountData.authorities?.some(auth => auth.name === 'ROLE_ADMIN') || false;
        setIsInstructor(hasAdminRole);
        setUser(accountData);
        setIsAuthenticated(true);
=======
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/auth/me`, {
          credentials: 'include',
        });

        if (res.ok) {
          const account = await res.json();
          setUser(account);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Not authenticated', err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
>>>>>>> 6f9b4b0c368f82cc36892c01d6d11337816af69d
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (userData) => {
    try {
      const formData = new URLSearchParams();
      formData.append('email', userData.email);
      formData.append('password', userData.password);

      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
        credentials: 'include'
      });

      console.log('Login response status:', response.status); // Debug log

      // Spring Security form login returns 200 on success, 401 on failure
      if (response.status === 200) {
        // Login successful, now fetch user details
        const accountResponse = await fetch('http://localhost:8080/api/auth/me', {
          credentials: 'include'
        });
        
        if (accountResponse.ok) {
          const accountData = await accountResponse.json();
          console.log('Account data:', accountData); // Debug log
          const hasAdminRole = accountData.authorities?.some(auth => auth.name === 'ROLE_ADMIN') || false;
          console.log('Has admin role:', hasAdminRole); // Debug log
          setIsInstructor(hasAdminRole);
          setUser({...userData, ...accountData, isInstructor: hasAdminRole});
          setIsAuthenticated(true);
          return true; // Success!
        } else {
          throw new Error('Failed to fetch user information');
        }
      } else if (response.status === 401) {
        throw new Error('Invalid email or password');
      } else {
        const errorText = await response.text().catch(() => '');
        throw new Error(errorText || 'Login failed with status ' + response.status);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: ' + error.message);
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fullName: userData.fullName,
              email: userData.email,
              password: userData.password,
              role: userData.role,
              classCodes: userData.classCodes || []
            }),
        });

      if (response.ok) {
        const registeredAccount = await response.json();
        console.log('Registered account:', registeredAccount); // Debug log
        
        // After successful registration, log them in
        // Need to wait a brief moment for the registration to complete
        await new Promise(resolve => setTimeout(resolve, 100));
        
        await handleLogin({
          email: userData.email,
          password: userData.password,
          role: userData.role
        });
      } else {
        const error = await response.text();
        throw new Error(error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsInstructor(false);
    }
  };

  if (isLoading) {
    return (
      <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="App">
      {isAuthenticated ? (
        isInstructor ? (
          <InstructorDashboard 
            onLogout={handleLogout} 
            userName={
              user?.firstName 
                ? `${user.firstName} ${user.lastName || ''}`.trim()
                : user?.name || user?.fullName || 'Instructor'
            } 
          />
        ) : (
          <StudentDashboard 
            onLogout={handleLogout} 
            userName={
              user?.firstName 
                ? `${user.firstName} ${user.lastName || ''}`.trim()
                : user?.name || user?.fullName || 'User'
            } 
          />
        )
      ) : (
        <LoginPage onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
=======
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to="/" replace />
            : <LoginPage onLogin={handleLogin} onRegister={handleRegister} />
        }
      />

      <Route
        path="/"
        element={
          isAuthenticated
            ? <StudentDashboard onLogout={handleLogout} userName={user?.firstName || 'User'} />
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
>>>>>>> 6f9b4b0c368f82cc36892c01d6d11337816af69d
  );
}

export default App;