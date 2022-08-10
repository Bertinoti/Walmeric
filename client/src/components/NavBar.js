import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export default function NavBar() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setError('')
    try {
        await logout()
        navigate('/')
    } catch (error) {
        setError('Failed to Log Out ')
    }
}

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/dashboard"> My Info </Navbar.Brand>
        <Nav.Link href="/friends"> Friends </Nav.Link>
        <Nav.Link href="/sendmoney"> Send Money </Nav.Link>
        <Nav.Link href="/chat"> Chat </Nav.Link>
        <Nav.Link href="/" onClick={handleLogout}>
          {" "}
          Log Out{" "}
        </Nav.Link>
      </Container>
    </Navbar>
  );
}
