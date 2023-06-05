import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import {
  query,
  collection,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useUserAuth } from "../../components/UserAuth";
import { serverTimestamp } from "@firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const AdminNewItems = () => {
  const { user } = useUserAuth();
  const [userdata, setUserData] = useState([]);
  const navigate = useNavigate()

  const retdata3 = async () => {
    const collectionRef = collection(db, "AdminItems");
    const q = query(collectionRef, orderBy("timestamp", "asc"));
    const snapshot = await getDocs(q);
    setUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  async function deleteItem(proid) {
    console.log("product id " + proid);
    await deleteDoc(doc(db, "AdminItems", proid));
    window.location.reload(true);
  }

  async function addItem(sel, tit, des, pr, key, imgf, imgl, tl, stb, uidd) {
    // console.log("product id " + proid);
    //  await deleteDoc(doc(db, "Users", user));
    //  window.location.reload(true);

    await addDoc(collection(db, "Products"), {
      seller: sel,
      title: tit,
      description: des,
      price: pr,
      keywords: key,
      timelimit: tl,
      image: imgl,
      imagelink: imgl,
      timestamp: serverTimestamp(),
      currentbid: 0,
      startbid: stb,
      currentbidder: "",
      uid: "",
    }).then(async (docRef) => {
      console.log("Document Id:", docRef.id);

      console.log(typeof docRef.id);
      const dref = doc(db, "Products", docRef.id);
      await updateDoc(dref, {
        uid: docRef.id,
      });
    });

    deleteItem(uidd);
    navigate("/");
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
        <span style={{ display: "inline-block" }}>New Items</span>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Seller</th>
            <th>Title</th>
            <th>Image</th>
            <th>Keyword</th>
            <th>Starting Bid</th>
            <th>Buy Now Price</th>
            <th>Accept</th>
            <th>Deny</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((user) => (
            <tr key={user.seller}>
              <td>{user.seller}</td>
              <td>{user.title}</td>
              <td><img alt="img" src={user.imagelink} height="100" width="100"></img></td>
              <td>{user.keywords}</td>
              <td>{user.startbid}</td>

              <td>{user.price}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() =>
                    addItem(
                      user.seller,
                      user.title,
                      user.description,
                      user.price,
                      user.keywords,
                      user.imgf,
                      user.imagelink,
                      user.timelimit,
                      user.startbid,
                      user.uid
                    )
                  }
                >
                  Accept
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteItem(user.uid)}>
                  Deny
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminNewItems;
