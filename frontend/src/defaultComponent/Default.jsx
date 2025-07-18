import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import UserContext from "../context/UserContext.js";

function Default() {
  const {loggedIn,setLoggedIn,setUser} = useContext(UserContext);
  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.3s ease",
  };

  const loginStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50",
    color: "white",
  };

  const registerStyle = {
    ...buttonStyle,
    backgroundColor: "#2196F3",
    color: "white",
  };

  const logoutStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336",
    color: "white",
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/v1/users/logout', {}, { withCredentials: true });
      alert(res.data.message || "Logged out!");
      setLoggedIn(false);
      setUser(null);
    } catch (err) {
      alert("Logout failed");
      console.error(err);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "0px",backgroundColor:"#7f07ffff" }}>
        {!loggedIn ? (
          <><NavLink to="/login">
          <button
            style={loginStyle}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Login
          </button>
        </NavLink> 

        <NavLink to="/register">
          <button
            style={registerStyle}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Register
          </button>
        </NavLink></>)
        : null}

        {loggedIn?(<>
            <button
          style={logoutStyle}
          onClick={handleLogout}
          onMouseOver={(e) => (e.target.style.opacity = "0.8")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Logout
        </button>
        </>):null}
      </div>
    </>
  )
}

export default Default;