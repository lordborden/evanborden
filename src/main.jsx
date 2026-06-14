import React from "react";
import ReactDOM from "react-dom/client";
import { App, initParallax } from "./components/parts2.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
requestAnimationFrame(initParallax);
