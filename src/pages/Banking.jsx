import React, { useState, useEffect } from "react";
import { useUserAuth } from "../components/UserAuth";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Button } from "react-bootstrap";

const Banking = () => {
  const { user, logOut } = useUserAuth();
  const [inputDepositRef, setDepositRef] = useState(0);
  const [inputWithdrawRef, setWithdrawRef] = useState(0);
  const handleClick1 = async () => {
    var x = parseInt(inputDepositRef, 10);
    var y = userdata?.money + x;
    console.log(y);
    console.log(typeof userdata?.money);
    console.log(typeof x);
    let z = 100;
    const docRef = doc(db, "Users", user.email);
    await updateDoc(docRef, {
      money: y,
    });

    window.location.reload(true);
  };

  const handleClick2 = async () => {
    var x = parseInt(inputWithdrawRef, 10);

    if (x > userdata?.money) {
      var y = userdata?.money;
    } else {
      var y = userdata?.money - x;
    }

    const docRef = doc(db, "Users", user.email);
    await updateDoc(docRef, {
      money: y,
    });
    window.location.reload(true);
  };

  const [userdata, setUserData] = useState(null);
  const retdata = async () => {
    if (user && user.email) {
      // Check if user and user.email are defined
      const docRef = doc(db, "Users", user.email);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    }
  };
  useEffect(() => {
    retdata();
    console.log("Banking render")
  }, [user]);

  return (
    <div className="row-cols-lg-3 g-4 px-md-5" style={{ marginTop: "100px" }}>
      <div className="justify-content-center align-items container shadow p-3 mb-5 bg-white rounded">
        <h3 className="text-center">Banking</h3>

        <div className="mt-3 text-center">
          <h1 style={{ color: "green" }}>${userdata?.money}</h1>
        </div>

        <div className="mt-5 text-center" style={{ marginBottom: "30px" }}>
          <h3>Card on File: {userdata?.card}</h3>
        </div>

        <div className="justify-content-center align-item text-center">
          <div className="mt-3">
            <h3>Deposit</h3>
            <input
              value={inputDepositRef}
              type="number"
              placeholder="Input deposit"
              onChange={(e) => setDepositRef(e.target.value)}
            />
            <Button
              style={{ marginLeft: "10px", width: "50px", height: "25px" }}
              className="btn btn-success"
              onClick={handleClick1}
            ></Button>
          </div>

          <div className="mt-3">
            <h3>Withdraw</h3>
            <input
              value={inputWithdrawRef}
              type="number"
              placeholder="Input withdraw"
              onChange={(e) => setWithdrawRef(e.target.value)}
            />
            <Button
              style={{ marginLeft: "10px", width: "50px", height: "25px" }}
              className="btn btn-danger"
              onClick={handleClick2}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banking;
