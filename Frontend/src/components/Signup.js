import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  // const host = "https://i-notes-tau.vercel.app";
  const host = "http://localhost:5000";

  const handlesubmit = async (e) => {
    e.preventDefault();
    try{
      const {name,email,password,confirmpassword}= credentials;
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,email,password
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      // console.log(confirmpassword);
      console.log(json);
      if(json.success){
        //  redirect
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Account created successfully","success");
      }
      else{
        props.showAlert("Invalid Credentials","danger");
      }
    }
    catch(error){
      console.error("There was a problem with the fetch operation:", error);
    props.showAlert("An error occurred. Please try again.","danger");
    }
}
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange
            }
            aria-describedby="emailHelp"
            placeholder="What should we call you?"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            minLength={5}
            required
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmpassword"
            name="confirmpassword"
            onChange={onChange}
            minLength={5}
            required
            placeholder="Re-enter Password"
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
