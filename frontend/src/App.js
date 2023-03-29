import React, { useState, useEffect } from "react";
import { 
  HashRouter as Router,
  Route, Routes
 } from "react-router-dom";
import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'

// Without using Router
// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <NotesListPage />
//     </div>
//   );
// }

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Router>
      <div className={`container ${theme === "dark" ? "dark" : ""}`}>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<NotesListPage />} />
            <Route path="note/:id" element={<NotePage history={history} />} />
          </Routes>
          <button
          onClick={toggleTheme}
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
          }}
          >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
