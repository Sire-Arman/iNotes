import "./App.css";
import {
  BrowserRouter as Router,
  // switch is deprecated by react router fromm v6,so we use Routes instead
  Routes,
  Route,
  // Link,
  // useRouteMatch,
  // useParams,
} from "react-router-dom";
import { Home } from "./components/Home";
import {useState} from 'react';
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            {/* old method   :-    <Route exact path = "/">     <Home />    </Route>     */}
            {/* new method */}
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/login" element={<Login  showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
