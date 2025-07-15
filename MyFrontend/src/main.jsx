import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AdminProvider } from './context/AdminContext'
import { UserProvider } from './context/UserContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <UserProvider>
        <AuthProvider>
        <App />
        </AuthProvider>
      </UserProvider> 
    </AdminProvider>

  </StrictMode>,
)
