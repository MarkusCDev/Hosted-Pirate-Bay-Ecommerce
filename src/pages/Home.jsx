import React, { useState, useEffect } from "react";
import { useUserAuth } from "../components/UserAuth";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import PopularProduct from "./PopularProduct";
import Banner from "../components/Banner";
import { query, getDocs, collection, getCountFromServer, onSnapshot, orderBy,} from "firebase/firestore";

const Home = () => {
  const { user } = useUserAuth();
  const [productcount, setProductCount] = useState(1);
  const [productarray, setProductArray] = useState([]);

  const dbRef = collection(db, "Products");
  // const retdata2 = async () => {
  //   const snapshot = await getCountFromServer(dbRef);
  //   //console.log("count:", snapshot.data().count);
  //   setProductCount(snapshot.data().count);
  // };

  // const retdata3 = async () => {
  //   const collectionRef = collection(db, "Products");
  //   const q = query(collectionRef, orderBy("timestamp", "desc"));
  //   const snapshot = await getDocs(q);

  //   setProductArray(
  //     snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //   );
  // };

  // useEffect(() => {
  //   retdata2();
  //   retdata3();
  // }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const snapshot2 = await getCountFromServer(dbRef);
        setProductCount(snapshot2.data().count);

        const collectionRef = collection(db, "Products");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const snapshot3 = await getDocs(q);
        setProductArray(
          snapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    };

    fetchData();
    console.log("Home render")
  }, [user]);

  var sixArr = productarray.slice(0, 6);

  return (
    <>
      <div style={{ paddingTop: '18'}}>
        <div className="d-flex flex-column py-4">
          <Banner />
          <div
            style={{ paddingTop: 35 }}
            className="d-flex justify-content-center"
          >
            <Link to="/products" className="btn btn-primary" replace>
              Browse Products
            </Link>
          </div>
          <h3 className="justify-content-center text-center align-items">
            Newest Treasure
          </h3>
        </div>
      </div>

      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {/* {Array.from({ length: 6 }, (_, i) => {
            return <PopularProduct pro_img={pro_img} pro_title={pro_title} pro_price={pro_price} key={i} />;
          })} */}

          {sixArr.map((product) => (
            <PopularProduct
              pro_img={product.imagelink}
              pro_title={product.title}
              pro_price={product.price}
              pro_uid={product.uid}
              pro_cb={product.startbid}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
