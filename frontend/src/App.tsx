
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import {Signup} from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin */}
        {/* <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/build-status" element={<AdminBuildStatus />} />
        <Route path="/admin/features" element={<AdminFeatures />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
