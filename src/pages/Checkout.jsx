import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { useNavigate, redirect } from "react-router-dom";
import { db } from "../firebase";
import {
  FormGroup,
  FormInput,
  Input,
  Form,
  Select,
  FormField,
  Button,
  Checkbox,
  Label,
  Icon,
} from "semantic-ui-react";
import { useUserAuth } from "../components/UserAuth";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  setDoc,
} from "@firebase/firestore";

const stateOptions = [
  { key: "AL", text: "Alabama", value: "Alabama" },
  { key: "AK", text: "Alaska", value: "Alaska" },
  { key: "AZ", text: "Arizona", value: "Arizona" },
  { key: "AR", text: "Arkansas", value: "Arkansas" },
  { key: "CA", text: "California", value: "California" },
  { key: "CO", text: "Colorado", value: "Colorado" },
  { key: "CT", text: "Connecticut", value: "Connecticut" },
  { key: "DE", text: "Delaware", value: "Delaware" },
  { key: "FL", text: "Florida", value: "Florida" },
  { key: "GA", text: "Georgia", value: "Georgia" },
  { key: "HI", text: "Hawaii", value: "Hawaii" },
  { key: "ID", text: "Idaho", value: "Idaho" },
  { key: "IL", text: "Illinois", value: "Illinois" },
  { key: "IN", text: "Indiana", value: "Indiana" },
  { key: "IA", text: "Iowa", value: "Iowa" },
  { key: "KS", text: "Kansas", value: "Kansas" },
  { key: "KY", text: "Kentucky", value: "Kentucky" },
  { key: "LA", text: "Louisiana", value: "Louisiana" },
  { key: "ME", text: "Maine", value: "Maine" },
  { key: "MD", text: "Maryland", value: "Maryland" },
  { key: "MA", text: "Massachusetts", value: "Massachusetts" },
  { key: "MI", text: "Michigan", value: "Michigan" },
  { key: "MN", text: "Minnesota", value: "Minnesota" },
  { key: "MS", text: "Mississippi", value: "Mississippi" },
  { key: "MO", text: "Missouri", value: "Missouri" },
  { key: "MT", text: "Montana", value: "Montana" },
  { key: "NE", text: "Nebraska", value: "Nebraska" },
  { key: "NV", text: "Nevada", value: "Nevada" },
  { key: "NH", text: "New Hampshire", value: "New Hampshire" },
  { key: "NJ", text: "New Jersey", value: "New Jersey" },
  { key: "NM", text: "New Mexico", value: "New Mexico" },
  { key: "NY", text: "New York", value: "New York" },
  { key: "NC", text: "North Carolina", value: "North Carolina" },
  { key: "ND", text: "North Dakota", value: "North Dakota" },
  { key: "OH", text: "Ohio", value: "Ohio" },
  { key: "OK", text: "Oklahoma", value: "Oklahoma" },
  { key: "OR", text: "Oregon", value: "Oregon" },
  { key: "PA", text: "Pennsylvania", value: "Pennsylvania" },
  { key: "RI", text: "Rhode Island", value: "Rhode Island" },
  { key: "SC", text: "South Carolina", value: "South Carolina" },
  { key: "SD", text: "South Dakota", value: "South Dakota" },
  { key: "TN", text: "Tennessee", value: "Tennessee" },
  { key: "TX", text: "Texas", value: "Texas" },
  { key: "UT", text: "Utah", value: "Utah" },
  { key: "VT", text: "Vermont", value: "Vermont" },
  { key: "VA", text: "Virginia", value: "Virginia" },
  { key: "WA", text: "Washington", value: "Washington" },
  { key: "WV", text: "West Virginia", value: "West Virginia" },
  { key: "WI", text: "Wisconsin", value: "Wisconsin" },
  { key: "WY", text: "Wyoming", value: "Wyoming" },
  { key: "DC", text: "District of Columbia", value: "District of Columbia" },
];

const CheckoutPage = () => {
  const { user } = useUserAuth();
  // User info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Shipping address & Card info
  const [address1, setAddress] = useState("");
  const [city, setCity] = useState();
  const [stateName, setStateName] = useState();
  const [zipcode, setZipcode] = useState("");
  const [cardnumber, setCardNumber] = useState("");

  const Push = () => {
    db.ref("user")
      .set({
        city: city,
        stateName: stateName,
      })
      .catch(alert);
  };

  const [userdata, setUserData] = useState(null);
  const [productarray, setProductArray] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  const retdata = async () => {
    const docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data().email);
    setUserData(docSnap.data());
    console.log(docSnap.data().cartitems);
    setProductArray(docSnap.data().cartitems);
    const totalPrice = docSnap
      .data()
      .cartitems.map((item) => item.price) // get the price from each array
      .reduce((acc, price) => acc + price, 0); // add the prices together

    setSubtotal(totalPrice);
    //console.log("bakidd " + docSnap.data().cartitems.length);
    if (
      (docSnap.data().cartitems.length == 0) |
      (docSnap.data().money < totalPrice)
    ) {
      navigate("/");
    }
  };

  const Completepurchase = async () => {
    const docRef0 = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef0);
    const arritems = docSnap.data().cartitems;

    arritems.forEach(async (item) => {
      const x = item.id;
      const docRef2 = doc(db, "Products", x);
      const docSnap2 = await getDoc(docRef2);

      const owner = docSnap2.data().seller;
      const docRef3 = doc(db, "Users", owner);
      const docSnap3 = await getDoc(docRef3);
      const newbalance = docSnap3.data().money + item.price;
      //console.log("newbalance: " + newbalance);
      //console.log(docSnap3.data().money);
      await updateDoc(docRef3, {
        money: newbalance,
      });

      const prodata = {
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
        img: item.img,
        seller: item.seller,
      };

      console.log("prodata: ", prodata);

      const dbbRef = doc(db, "Users", user.email);
      await updateDoc(dbbRef, {
        history: arrayUnion(prodata),
      });

      // TODO: uncomment before presentation, deletes items when bought
      await deleteDoc(doc(db, "Products", item.id));
    });

    //empty cart
    const totalPrice = docSnap
      .data()
      .cartitems.map((item) => item.price) // get the price from each array
      .reduce((acc, price) => acc + price, 0);
    const u = docSnap.data().money;
    const nu = u - totalPrice;
    console.log(totalPrice);
    console.log(typeof totalPrice);

    const docRef2 = doc(db, "Users", user.email);
    await updateDoc(docRef2, {
      money: nu,
      cartitems: [],
    });
  };

  useEffect(() => {
    retdata();
    console.log("Checkout render");
  }, [user]);

  return (
    <div className="row-cols-lg-3 g-4 px-md-5" style={{ marginTop: "200px" }}>
      <div className="justify-content-center align-items container shadow p-3 mb-5 bg-white rounded">
        <h3 className="text-center">Account Info</h3>
        <div>
          <h3>
            Subtoal: <h2 style={{ color: "green" }}>${subtotal} USD</h2>
          </h3>
          <h3>
            <u> Shipping address </u>
          </h3>
          <Form widths={"equal"} className="align-items-center">
            <FormGroup>
              <FormInput
                required={"true"}
                control={Input}
                name="name"
                label="Name"
                placeholder="Name"
                // value={name}
              />
              <FormInput
                required={"true"}
                control={Input}
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
                value={user && user.email}
                // onChange={setEmail}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                required={"true"}
                control={Input}
                name="address1"
                label="Address 1"
                placeholder="Address 1"
                // value={address1}
                // onChange={setAddress}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                required={"true"}
                label="City"
                placeholder="City"
                name="city"
                onChange={(e) => setCity(e.target.value)}
                // value={city}
                // onChange={setCity}
              />
              <FormInput
                required={"true"}
                control={Select}
                label="State"
                placeholder="State"
                name="state"
                options={stateOptions}
                onChange={(e) => setStateName(e.target.value)}
                // value={stateName}
                // onChange={setStateName}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                required={"true"}
                label="Zipcode"
                placeholder="Zipcode"
                name="zipcode"
                type="number"
                // value={zipcode}
                // onChange={setZipcode}
              />
            </FormGroup>
          </Form>
          <div>
            <h3>
              <u>Credit Card Information</u>
            </h3>
            <p>
              <b> Please fill out your card information.</b>
            </p>
            <Form widths={"equal"} className="align-items-left">
              <FormGroup>
                <FormInput
                  required={"true"}
                  control={Input}
                  label="Name on card"
                  placeholder="John Doe"
                  name="name"
                  // value={name}
                />
                <FormInput
                  required={"true"}
                  label="Card Number"
                  placeholder="Card number"
                  name="cardnumber"
                  type="number"
                  // value={cardnumber}
                />
              </FormGroup>
              <FormField
                control={Checkbox}
                label="I agree to the Terms and Conditions"
              />
              <FormField>
                <label style={{ color: "red", fontSize: "14x" }}>
                  {" "}
                  * Required Field{" "}
                </label>
              </FormField>
              <FormGroup>
                <Link to="/cart">
                  <Button content="Back to Cart" />
                </Link>
                <Button onClick={Completepurchase}>Submit</Button>
              </FormGroup>
              <FormGroup>
                <Button
                  circular
                  icon="google"
                  color="twitter"
                  size="huge"
                />
                <Button
                  circular
                  icon="amazon pay"
                  color="twitter"
                  size="huge"
                />
                <Button circular icon="apple pay" color="twitter" size="huge" />
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
