import React from "react";
import ReactDOM from "react-dom";
//import ReactDOM from "react-dom/client";
import "./index.css";

/* comment the base code and use the one teach on the course

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

*/

const App = () => (
  <div>
    <p>Hellow world</p>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
