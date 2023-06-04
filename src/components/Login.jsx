import React, { useState } from 'react'
import { useUserAuth } from "./UserAuth";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { logIn } = useUserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      await logIn(email, password)
      navigate("/")
    } catch (err) {
      setError(err.message)
    }
  }


  return (
    <>
      <div className="row-cols-lg-3 g-4 px-md-5" style={{ marginTop: "200px" }}>
        <div className="justify-content-center align-items container shadow p-3 mb-5 bg-white rounded">
          <h3 className="text-center">Log In</h3>
          <div className="container w-40 pt-3 d-flex align-item justify-content-center">
            {error && <Alert variant="danger">{error}</Alert>}{" "}
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label></Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="d-grid mt-3">
              <Button variant="primary" type="submit">
                Explore Treasure!
              </Button>
            </div>
            <div className="text-center mt-2">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login