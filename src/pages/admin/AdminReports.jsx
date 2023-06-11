import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { db } from "../../firebase";
import { query, orderBy, getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { useUserAuth } from "../../components/UserAuth";
import { Link } from "react-router-dom";

const AdminReports = () => {
  const { user } = useUserAuth();
  const [userdata, setUserData] = useState([]);

  const retdata3 = async () => {
    const collectionRef = collection(db, "AdminReports");
    const q = query(collectionRef, orderBy("ident", "asc"));
    const snapshot = await getDocs(q);
    setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  async function deleteItem(proid, reportid) {
    console.log("product id " + proid);
    await deleteDoc(doc(db, "Products", proid));
    await deleteDoc(doc(db, "AdminReports", reportid));
    window.location.reload(true);
  }

  async function banUser(user, reportid) {
    console.log("ban user: " + user);
    await deleteDoc(doc(db, "Users", user));
    await deleteDoc(doc(db, "AdminReports", reportid));
    window.location.reload(true);
  }


  useEffect(() => {
    retdata3();
  }, []);

  return (
    <div
      style={{ marginTop: "200px " }}
      className="shadow-lg p-3 mb-5 bg-white rounded container"
    >
      <div style={{ textAlign: "left" }}>
        <Link to="/account">
          <Button
            href="/account"
            style={{ display: "inline-block" }}
            variant="info"
          >
            Go Back
          </Button>
        </Link>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "2em",
          marginBottom: "20px",
        }}
      >
        <span style={{ display: "inline-block" }}>Product Reports</span>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Seller</th>
            <th>Reason</th>
            <th>Report</th>
            <th>Reporter</th>
            <th>Timestamp</th>
            <th>Remove Item</th>
            <th>Ban Seller</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((user) => (
            <tr>
              <td>{user?.ident}</td>
              <td>
                <img
                  alt="Product Img"
                  src={user?.imagelink}
                  height="100"
                  width="100"
                ></img>
              </td>
              <td>{user?.seller}</td>
              <td>{user?.reason}</td>
              <td>{user?.report}</td>
              <td>{user?.reporter}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => deleteItem(user?.ident, user?.uid)}
                >
                  Remove Item
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => banUser(user?.seller, user?.uid)}
                >
                  Ban Seller
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminReports;
