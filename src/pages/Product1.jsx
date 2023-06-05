import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUserAuth } from "../components/UserAuth";
import { db } from "../firebase";
import { getDoc,doc,updateDoc,arrayUnion,addDoc,collection,serverTimestamp,deleteDoc } from "firebase/firestore";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";


function Product1() {
  const { user } = useUserAuth();
  const { uid } = useParams();
  const [userdata, setUserData] = useState(null);
  const [userr, setUserr] = useState(null);
  const [newbid, setBid] = useState(0);
  const [getrating, setRating] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [highestbidder, setHighestBidder] = useState("")
  const [timelapse, setTimelapse] = useState()
  const [timestamp, setTimeStamp] = useState(0)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState(86400);

  const tick = async () => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    }
  };

  const retdata = async () => {
    const x = uid;
    const docRef = doc(db, "Products", x);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data());
    setTimeStamp(docSnap.data().timestamp)
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };


  const addtocart = async (ptitle, pprice, pimg, pseller) => {
    const data = {
      id: uid,
      title: ptitle,
      price: pprice,
      img: pimg,
      seller: pseller,
    };

    const docRef2 = doc(db, "Users", user.email);
    await updateDoc(docRef2, {
      history: arrayUnion(data),
    });
    window.location.reload(true);
  };

  const UpdateBid = async (e) => {
    e.preventDefault();
    const y = user?.email
    const docRef0 = doc(db, "Users", user.email);
    const docSnap0 = await getDoc(docRef0);
    console.log(y)
    const x = uid;
    const docRef = doc(db, "Products", x);
    const docSnap = await getDoc(docRef);
    const highestbid = parseInt(newbid, 10);

    if (
      highestbid >= docSnap.data().startbid &&
      docSnap0.data().money >= highestbid
    ) {
      await updateDoc(docRef, {
        startbid: newbid,
        currentbidder: y,
      });
      window.location.reload(true);
    }
  };

  const [report, setReport] = useState("");
  const [reason, setReason] = useState("");

  const handleReport = async (e) => {
    e.preventDefault();
    const sellerp = userdata?.seller
    const reporterr = user?.email
    const imglink = userdata?.imagelink

    const prodata = {
      id: uid,
      report: report,
      reason: reason,
      seller: sellerp,
      reporter: reporterr,
      imagelink: imglink,
      timestamp: serverTimestamp(),
    };

    console.log(prodata);

    await addDoc(collection(db, "AdminReports"), {
      ident: uid,
      report: report,
      reason: reason,
      seller: sellerp,
      reporter: reporterr,
      timestamp: serverTimestamp(),
      uid: "",
    }).then(async (docRef) => {
      console.log("Document Id:", docRef.id);

      console.log(typeof docRef.id);
      const dref = doc(db, "AdminReports", docRef.id);
      await updateDoc(dref, {
        uid: docRef.id,
      });
    });
      window.location.reload(true);

    //  const dbbRef = doc(db, "Admin", "K4qKl3ROpkCrfj6qgSQ5");
    //  await updateDoc(dbbRef, {
    //    reports: (prodata),
    //  });
  };

  useEffect(() => {
    console.log("Product render");
    retdata();
  }, [user]);

  useEffect(() => {
    const checkTime = async () => {

        const proseller = userdata?.seller;
        const docRef2 = doc(db, "Users", proseller);
        const docSnap2 = await getDoc(docRef2);
        // add current bid(startbid) to seller money
        let amountSold = parseInt(userdata?.startbid, 10);
        console.log("amoutn sold: " + amountSold);
        let newAmount = docSnap2.data().money + amountSold;
        await updateDoc(docRef2, {
          money: newAmount,
        });
        const prodata = {
          id: userdata.uid,
          title: userdata.title,
          price: userdata.price,
          quantity: 1,
          img: userdata.imagelink,
          seller: userdata.seller,
        };
        console.log("prodata: ", prodata);
        // delete money from buyer
        const userRef = doc(db, "Users", user.email);
        const userSnap = await getDoc(userRef);
        let buyerNewAmount = userSnap.data().money - amountSold;
        await updateDoc(userRef, {
          money: buyerNewAmount,
          history: arrayUnion(prodata),
        });

        //
        //console.log("prodata: ", prodata);
        //

        //delete product and nagivate to home
        deleteDoc(doc(db, "Products", userdata.uid));
        navigate("/");
      }

    if (timestamp != undefined) {
      const timestamp = userdata?.timestamp?.seconds;
      const hourLimit = userdata?.timelimit;
      //const hourLimit = 12
      console.log("hourLimit: " + hourLimit);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const timeElapsed = currentTime - timestamp;
      let remainingTimeSeconds = hourLimit * 3600 - timeElapsed;
      remainingTimeSeconds = Math.max(remainingTimeSeconds, 0); // Ensure remaining time is not negative
      setRemainingTime(remainingTimeSeconds);
      
      if (remainingTimeSeconds === 0) {
        checkTime(); }
      const timer = setInterval(tick, 1000); // Run the tick function every second
      return () => clearInterval(timer);
    }
    
  }, [timeLeft])


  const formattedTime = formatTime(remainingTime);

  return (
    <>
      <div
        style={{ marginTop: "200px " }}
        className="shadow-lg p-3 mb-2 bg-white rounded container"
      >
        <div className="row mb-4">
          {/* Product pain photo*/}
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12 mb-4">
                <img
                  className="border rounded ratio ratio-1x1"
                  alt=""
                  height="500px"
                  src={userdata?.imagelink}
                />
              </div>
            </div>

            {/* Extra product images*/}
            <div className="row mt-2">
              <div className="col-12">
                <div
                  className="d-flex flex-nowrap"
                  style={{ overflowX: "scroll" }}
                >
                  {Array.from({ length: 8 }, (_, i) => {
                    return (
                      <a key={i}>
                        <img
                          className="cover rounded mb-2 me-2"
                          width="70"
                          height="70"
                          alt=""
                          src={userdata?.imagelink}
                        />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="d-flex flex-column h-100">
              <h2 className="mb-1">{userdata?.title}</h2>
              <h4 className="text-muted">
                {/* Time Remaining: {days} days {hours} hours {minutes} minutes{" "}
                {seconds} seconds{" "} */}
                Remaining Time: {formattedTime}
              </h4>

              <div className="row g-3 mb-4">
                <div className="col">
                  <button className="btn btn-outline-dark py-2 w-100">
                    Bid: ${userdata?.startbid} USD
                  </button>
                </div>

                <div className="col">
                  <Link to="/cart">
                    {userdata?.startbid > userdata?.price ? null : (
                      <button
                        className="btn btn-dark py-2 w-100"
                        onClick={() =>
                          addtocart(
                            userdata?.title,
                            userdata?.price,
                            userdata?.imagelink,
                            userdata?.seller
                          )
                        }
                      >
                        Buy now: ${userdata?.price} USD
                      </button>
                    )}
                  </Link>
                </div>
              </div>
              <div className="d-flex align-items-end">
                <Form className="mr-2">
                  <Form.Group controlId="formBasicPasswordChange">
                    <Form.Label>
                      <b>Enter Bid: </b>
                    </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(e) => setBid(e.target.value)}
                      placeholder="Enter Higher Bid"
                    />
                  </Form.Group>
                </Form>
                <Button type="submit" onClick={UpdateBid}>
                  Submit Bid
                </Button>
              </div>

              {/* Description of product details */}
              <h4 className="mb-0">Details</h4>
              <hr />
              <dl className="row">
                <dt className="col-sm-4">Product #:</dt>
                <dd className="col-sm-8 mb-3">{uid}</dd>
                <dt className="col-sm-4">Current Bid:</dt>
                <dd className="col-sm-8 mb-3">${userdata?.startbid} USD</dd>
                <dt className="col-sm-4">Category</dt>
                <dd className="col-sm-8 mb-3">{userdata?.keywords}</dd>
                <dt className="col-sm-4">Seller</dt>
                <dd className="col-sm-8 mb-3">{userdata?.seller}</dd>
              </dl>
              <h4 className="mb-0">Description</h4>
              <hr />
              <p className="lead flex-shrink-0">
                <small>{userdata?.description}</small>
              </p>
              <div>
                <button className="btn btn-dark py-2 w-40" onClick={handleShow}>
                  Report Item
                </button>
                {/* <button className="ms-3 btn btn-dark py-2 w-40">
                  Add Review
                </button> */}
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={handleReport}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Reason :</Form.Label>
                        <Form.Control
                          type="text"
                          autoFocus
                          onChange={(e) => setReason(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Report :</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={(e) => setReport(e.target.value)}
                        />
                      </Form.Group>

                      <button
                        style={{ float: "right" }}
                        className="btn btn-dark"
                        type="submit"
                      >
                        Submit
                      </button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div style = {{ marginTop: '50px '}}>
    <div style = {{ marginTop: '25px '}} className="shadow-lg p-3 mb-5 bg-white rounded container">
                  Review 1
    </div>
    <div style = {{ marginTop: '25px '}} className="shadow-lg p-3 mb-5 bg-white rounded container">
                  Review 2
    </div>
    <div style = {{ marginTop: '25px '}} className="shadow-lg p-3 mb-5 bg-white rounded container">
                  Review 3
    </div>
    </div> */}
    </>
  );
}
export default Product1;
