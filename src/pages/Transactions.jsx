import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { db } from "../firebase";
import { doc, getDoc } from "@firebase/firestore";
import { useUserAuth } from "../components/UserAuth";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Transactions = () => {
  const { user } = useUserAuth();
  const [newrating, setRating] = useState(5);
  const [history, setHistory] = useState([]);

  const retdata = async () => {
    const docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    setHistory(docSnap.data().history);
  };

  useEffect(() => {
    retdata();
  }, [user]);

  return (
    <div
      style={{ marginTop: "200px " }}
      className="shadow-lg p-3 mb-5 bg-white rounded container"
    >
      <div style={{ textAlign: "left" }}>
        <Link to="/account"><Button
          href="/account"
          style={{ display: "inline-block" }}
          variant="info"
        >
          Go Back
        </Button></Link>
      </div>
      <div
        style={{ textAlign: "center", fontSize: "2em", marginBottom: "20px" }}
      >
        <span style={{ display: "inline-block" }}>Transaction History</span>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Product</th>
            <th>Price</th>
            <th>Seller</th>
            <th>Grade Seller</th>
            <th>Report Seller</th>
          </tr>
        </thead>
        <tbody>
          {history.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              <td>
                <img src={product.img} height="100" width="100"></img>
              </td>
              <td>${product.price} USD</td>
              <td>{product.seller}</td>
              <td>
                <input
                  type="number"
                  placeholder="Input Grade (0-5)"
                  onChange={(e) => setRating(e.target.value)}
                />
              </td>
              <td>
                <Button variant="secondary">Report</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Transactions;
