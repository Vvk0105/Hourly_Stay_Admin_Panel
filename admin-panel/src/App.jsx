import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";
import MainLayout from "./layouts/MainLayout";
import "./styles/layout.css";
import UserManagement from "./pages/users/UserManagement";
import AssignChangePage from "./pages/assignChange/AssignChangePage";

function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!initialized) {
      return <div>Loading application...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route 
          path="/dashboard" 
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } />
        </Route>
        <Route
          path="/users"
          element={
            <MainLayout>
              <UserManagement />
            </MainLayout>
          }
        />
        <Route
          path="/assignandchange"
          element={
            <MainLayout>
              <AssignChangePage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
