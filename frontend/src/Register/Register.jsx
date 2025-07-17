// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('password', formData.password);
    
      const response = await axios.post(
        '/api/v1/users/register',
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data) {
        alert('Register successful!');
      } else {
        alert('Register failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #11998e, #38ef7d)',
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
          maxWidth: '450px',
        }}
        encType="multipart/form-data"
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#11998e' }}>
          Register
        </h2>

        
        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' }, 
          { label: 'Password', name: 'password', type: 'password' },
        ].map((input) => (
          <div key={input.name} style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              {input.label}
            </label>
            <input
              type={input.type}
              name={input.name}
              value={formData[input.name]}
              onChange={handleChange}
              placeholder={`Enter your ${input.label.toLowerCase()}`}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#11998e')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
          </div>
        ))}

       

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #11998e, #38ef7d)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'opacity 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.opacity = '0.9')}
          onMouseOut={(e) => (e.target.style.opacity = '1')}
        >
          Register
        </button>

        {/* Back to Login link */}
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{
              color: '#11998e',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
