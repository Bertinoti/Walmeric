import { Container } from "react-bootstrap";
import { AuthProvider, useAuth } from "./contexts/authContext";
import SignUp from "./components/Session/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Session/Login";
import PrivateRoot from "./components/HOC/PrivateRoot";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <AuthProvider>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={ <PrivateRoot> <Dashboard /> </PrivateRoot> } />
            {/* <Route path="/dashboard" element={ <Dashboard /> } /> */}
        </Routes>
      </AuthProvider>
    </Container>
  );
}

export default App;
