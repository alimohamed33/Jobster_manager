import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, Landing, Error, Register } from "./pages";
import { ToastContainer } from "react-toastify";
import {
  Status,
  AllJobs,
  AddJob,
  Profile,
  SharedLayout,
} from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Status />} />
          <Route path="profile" element={<Profile />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
        </Route>

        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
