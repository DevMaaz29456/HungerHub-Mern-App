import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState(null);

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));

    await fetch("http://localhost:5000/api/auth/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((response) => {
        setorderData(response);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData !== null && orderData.orderData ? (
            orderData.orderData.order_data
              .slice(0)
              .reverse()
              .map((item, index) => (
                <div key={index}>
                  {item.map((arrayData, idx) => (
                    <div key={idx}>
                      {arrayData.Order_date ? (
                        <div className="m-auto mt-5">
                          <p>
                            {new Date(
                              arrayData.Order_date
                            ).toLocaleDateString()}
                          </p>
                          <hr />
                        </div>
                      ) : (
                        <div className="col-12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{ width: "16rem", maxHeight: "360px" }}
                          >
                            <img
                              src={arrayData.img || "placeholder.jpg"}
                              className="card-img-top"
                              alt="..."
                              style={{ height: "120px", objectFit: "fill" }}
                            />
                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                                <span className="m-1">
                                  {new Date().toLocaleDateString()}
                                </span>
                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
          ) : (
            <p className="text-center mt-4">No orders found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
