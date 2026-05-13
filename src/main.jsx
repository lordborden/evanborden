import React from "react";
import ReactDOM from "react-dom/client";
import { StatusBar, Hero, About, Experience } from "./components/parts1.jsx";
import { Skills, Projects, Contact } from "./components/parts2.jsx";
import "./styles.css";

function App() {
  return (
    <>
      <StatusBar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
