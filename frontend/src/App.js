import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import contexts
import { AuthProvider } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext';

// Import layout components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Alert from './components/common/Alert';

// Import page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PollsList from './pages/PollsList';
import PollDetail from './pages/PollDetail';
import CreatePoll from './pages/CreatePoll';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Import route components
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="container py-4 flex-grow-1">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/polls" element={<PollsList />} />
                <Route path="/polls/:id" element={<PollDetail />} />
                

                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                   </PrivateRoute>
                } />
                <Route path="/admin" element={
                  <PrivateRoute>
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  </PrivateRoute>
                } />
                <Route path="/create-poll" element={
                  <PrivateRoute>
                    <AdminRoute>
                      <CreatePoll />
                    </AdminRoute>
                  </PrivateRoute>
                } />
                
                {/* <Route element={<PrivateRoute />}>
                  <Route element={<AdminRoute />}>
                    <Route path="/create-poll" element={<CreatePoll />} />
                    
                  </Route>
                </Route> */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;