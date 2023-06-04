import React, { useState } from "react"
import { useUserAuth } from "./UserAuth"
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signUp } = useUserAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
        await signUp(email, password);
        await addUserdata()
        navigate("/")

    } catch (err) {
      setError(err.message)
    }
  }

  const addUserdata = async (e) => {
    await setDoc(doc(db, "Users", email), {
      email,
      password,
      fname,
      lname,
      phone,
      money: 0,
      cartitems: [],
      history: [],
      rating: 5,
      warning: 0,
      address: "",
      card: 0,
    })
      // await setDoc(docRef, data)
      .then((docRef) => {
        console.log("Document Id:", docRef.id);
      })
      .catch((error) => {
        console.log("Error adding document:", error);
      });
  };

  return (
    <>
      <div className="row-cols-lg-3 g-4 px-md-5" style={{ marginTop: "200px" }}>
        <div className="justify-content-center align-items container shadow p-3 mb-5 bg-white rounded">
          <h3 className="text-center">Create an Account</h3>
          <div className="container w-40 pt-3 d-flex align-item justify-content-center">
            {error && <Alert variant="danger">{error}</Alert>}{" "}
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFname">
              <Form.Control
                type="fname"
                placeholder="First name"
                onChange={(e) => setFname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLname">
              <Form.Control
                type="lname"
                placeholder="Last name"
                onChange={(e) => setLname(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Control
                type="text"
                pattern="\d{3}-\d{3}-\d{4}"
                placeholder="Phone: xxx-xxx-xxxx"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid mt-3">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
            <div className="text-center mt-2">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;
