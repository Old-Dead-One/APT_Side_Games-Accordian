import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext.tsx"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ThemeProvider>
)
