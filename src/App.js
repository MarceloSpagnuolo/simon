import { Route } from "react-router-dom";
import Home from "./Home";
import './App.css';

function App() {
  return (
    <>
      <Route path="/" component={Home} />
    </>
  );
}

export default App;
