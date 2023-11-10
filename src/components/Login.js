import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState({email: "",password:""})
  const navigate = useNavigate();


  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUwMzNkMzNiMTU5Y2Q3NTdjYjllZjllIn0sImlhdCI6MTY5NDcxMTA5MX0.WV4NokptgIe3PjrYdVlICg0eVU8KAA5dNLwPl6x4YlE",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Logged In Successfully","success");
      navigate("/");
    }
    else{
      // alert("invalid details");
      props.showAlert("Invalid Credentials","danger");
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
