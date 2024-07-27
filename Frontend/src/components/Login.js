import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState({email: "",password:""})
  const navigate = useNavigate();
  const host = "https://i-notes-tau.vercel.app";
  // const host = "http://localhost:5000";
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Remove the hardcoded auth-token from here
            },
            body: JSON.stringify({ 
                email: credentials.email, 
                password: credentials.password
            }),
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged In Successfully", "success");
            navigate("/");
        } 
        // else {
        //     props.showAlert("Invalid Credentials", "danger");
        // }
    } catch (error) {
        console.error("Login error:", error);
        // props.showAlert("An error occurred during login", "danger");
    }
}
  const onChange= (e)=>{
    setCredentials({...credentials, [e.target.name] : e.target.value})
}
  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            value= {credentials.email}
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
            value = {credentials.password}
            id="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
