import React, { useState, useEffect } from 'react';
import StudentDashboard from './components/StudentDashboard';
import LoginPage from './components/LoginPage';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Try to fetch posts to check if we're authenticated
      const response = await fetch('http://localhost:8080/api/posts', {
        credentials: 'include'
      });
      
      if (response.ok) {
        // User is authenticated
        setIsAuthenticated(true);
        // You might want to fetch user details here
      }
    } catch (error) {
      console.log('Not authenticated');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const formData = new URLSearchParams();
      formData.append('email', userData.email);
      formData.append('password', userData.password);

      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
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
        credentials: 'include'
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
    <div className="App">
      {isAuthenticated ? (
        <StudentDashboard onLogout={handleLogout} userName={user?.name || user?.fullName || 'User'} />
      ) : (
        <LoginPage onLogin={handleLogin} onRegister={handleRegister} />
      )}
    </div>
  );
}

export default App;
