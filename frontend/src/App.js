import React, { useState, useEffect } from 'react';
import StudentDashboard from './components/StudentDashboard';
import LoginPage from './components/LoginPage';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    setIsLoading(false);
  }, []);

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

      if (response.ok) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
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
        // After successful registration, log them in
        await handleLogin({
          email: userData.email,
          password: userData.password,
          name: userData.fullName
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
  );
}

export default App;
