import React, { useState,useContext } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import UserContext from '../../context/UserContext';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const { setUser, setLoggedIn } =  useContext(UserContext);
  
   

const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return ( 
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #8e2de2, #4a00e0)',
        padding: '20px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#4a00e0' }}>
          Login
        </h2>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#8e2de2')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#8e2de2')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #8e2de2, #4a00e0)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'opacity 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.opacity = '0.9')}
          onMouseOut={(e) => (e.target.style.opacity = '1')}
           onClick={async (e) => {
              e.preventDefault();
              try {
                const response = await axios.post("/api/v1/users/login", { email, password }, { withCredentials: true });
                if (response.data && response.data.data && response.data.data.user) {
                  setLoggedIn(true);
                  setUser(response.data.data.user); 
                  alert("Login successful!");
                  navigate("/");
                } else {
                  alert("Login failed: " + (response.data.message || "Unknown error"));
                }
              } catch (error) {
                console.error("Login error:", error);
              }
            }}
        >
          Login
        </button>

        {/* Register link */}
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          Don’t have an account?{' '}
          <Link
            to="/register"
            style={{
              color: '#8e2de2',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;


