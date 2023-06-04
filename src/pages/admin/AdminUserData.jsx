import React, { useState, useEffect } from "react";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  arrayUnion,
  query,
  orderBy,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useUserAuth } from "../../components/UserAuth";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminUserData = () => {
  const { user } = useUserAuth();
  const [userdata, setUserData] = useState([]);
  const [history, setHistory] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const retdata3 = async () => {
    const collectionRef = collection(db, "Users");
    const q = query(collectionRef, orderBy("fname", "asc"));
    const snapshot = await getDocs(q);
    setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  async function retdata2(user) {
    const docRef = doc(db, "Users", user);
    const docSnap = await getDoc(docRef);
    setHistory(docSnap.data().history);
    console.log(docSnap.data().history);
  }

  async function banUser(user) {
    console.log("ban user: " + user);
    await deleteDoc(doc(db, "Users", user));
    window.location.reload(true);
  }

  useEffect(() => {
    retdata3();
  }, []);

  return (
    <>
      <div
        style={{ marginTop: "200px " }}
        className="shadow-lg p-3 mb-5 bg-white rounded container"
      >
        <div style={{ textAlign: "left" }}>
          <Link to="/account"><Button
            style={{ display: "inline-block" }}
            variant="info"
          >
            Go Back
          </Button></Link>
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "2em",
            marginBottom: "20px",
          }}
        >
          <span style={{ display: "inline-block" }}>All Users</span>
        </div>

        <Table>
          <thead>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Money</th>
              <th>Rating</th>
              <th>Transaction History</th>
              <th>Send Warning</th>
              <th>Ban User</th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.money}</td>
                <td>{user.rating}</td>
                <td>
                  <Button
                    onClick={() => {
                      handleShow();
                      retdata2(user.email);
                    }}
                  >
                    History
                  </Button>
                </td>
                <td>
                  <Button variant="secondary">Send Warning</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => banUser(user.email)}>
                    Ban
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Product</th>
                <th>Price</th>
                <th>Seller</th>
              </tr>
            </thead>
            <tbody>
              {history.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img src={product.img} height="50" width="50"></img>
                  </td>
                  <td>${product.price} USD</td>
                  <td>{product.seller}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminUserData;
