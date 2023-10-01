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
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message = "This is an alert boi"/>
          <Routes>
            {/* old method   :-    <Route exact path = "/">     <Home />    </Route>     */}
            {/* new method */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
