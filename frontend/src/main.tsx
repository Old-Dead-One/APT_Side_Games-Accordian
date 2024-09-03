import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from "./components/MuiThemeContext.tsx"
import { CartProvider } from "./components/CartContext.tsx"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <CartProvider>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </CartProvider>
  </ThemeProvider>
)
