import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useUserAuth } from "../components/UserAuth";
import { db } from "../firebase";
import { collection, addDoc,doc, serverTimestamp, updateDoc } from "firebase/firestore";


const AddItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [timelimit, setTimelimit] = useState("");
  const [price, setPrice] = useState("");
  const [imagelink, setImageLink] = useState("");
  const [startbid, setStartBid] = useState(0);

  const navigate = useNavigate();


  //const dbRef = collection(db, "Products")
  const { user } = useUserAuth();
  const data = {
    seller: user.email,
    title: { title },
    description: { description },
    price: { price },
    keywords: { keywords },
    timelimit: { timelimit },
  };

  const handleAddProducts = async (e) => {
    e.preventDefault();
    const num = parseInt(price, 10);
    const sb = parseInt(startbid, 10);
        await addDoc(collection(db, "AdminItems"), {
          seller: user.email,
          title,
          description,
          price: num,
          keywords,
          timelimit,
          imagelink,
          timestamp: serverTimestamp(),
          currentbid: 0,
          startbid: sb,
          uid: "",
        })
          .then(async (docRef) => {
            console.log("Document Id:", docRef.id);

            console.log(typeof docRef.id);
            const dref = doc(db, "AdminItems", docRef.id);
            await updateDoc(dref, {
              uid: docRef.id,
            });
            navigate("/");
          })
          .catch((error) => {
            console.log("Error adding document:", error);
          });
  };


  return (
    <>
      <div style={{ marginTop: "200px" }}></div>
      <div className="container align-item justify-content-center shadow-lg p-5 mb-5 bg-white rounded">
        <div className="text-center">
          <h3>Add Item</h3>
        </div>

        {/* <Button onClick={retdata}>Count</Button> */}
        <Form onSubmit={handleAddProducts}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="title"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Description"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicKeyword">
            <Form.Label>Keyword: (Boat, Cannon, Food, Map, Ship, etc)</Form.Label>
            <Form.Control
              type="keyword"
              placeholder="Keyword(s)"
              required
              onChange={(e) => setKeywords(e.target.value)}
              value={keywords}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTimelimit">
            <Form.Label>Time limit (Hours)</Form.Label>
            <Form.Control
              type="timelimit"
              placeholder="Auction Timelimit"
              required
              onChange={(e) => setTimelimit(e.target.value)}
              value={timelimit}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicKeyword">
            <Form.Label>Starting Bid</Form.Label>
            <Form.Control
              type="Starting Bid"
              placeholder="Starting Bid"
              required
              onChange={(e) => setStartBid(e.target.value)}
              value={startbid}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPricerange">
            <Form.Label>Buy Now Price</Form.Label>
            <Form.Control
              type="number"
              patter="[0-1000000]*"
              placeholder="Buy Now Price"
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPricerange">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image URL"
              required
              onChange={(e) => setImageLink(e.target.value)}
              value={imagelink}
            />
          </Form.Group>

          <div className="d-grid gap-2 mb-2">
            <Button variant="btn btn-primary" type="Submit">
              Submit Item Request
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddItem;
