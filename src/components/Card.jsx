import { useEffect, useRef, useState } from "react";
import { useCartDispatch, useCart } from "./ContextReducer";

const Card = (props) => {
  let dispatch = useCartDispatch();
  let cartData = useCart();
  let options = props.options || {};
  const priceRef = useRef();
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0] || "");

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  const handleAddToCart = () => {
    let finalPrice = qty * parseInt(options[size] || 0);

    let food = cartData.find(
      (item) => item.id === props.foodItem._id && item.size === size
    );

    if (food) {
      dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        size,
        price: finalPrice,
        qty,
      });
    } else {
      dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty,
        size,
        img: props.foodItem.img, // Ensure image is stored
      });
    }
  };

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem?.img || "default-image.jpg"}
          className="card-img-top"
          alt={props.foodItem?.name || "Food Item"}
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem?.name || "Food Name"}</h5>
          <div className="container w-100">
            <select
              className="m-2 bg-success rounded"
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
              value={size}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline fs-5">
              ₹{qty * parseInt(options[size] || 0)}/-
            </div>
          </div>
        </div>
        <button className="btn btn-success mt-2" onClick={handleAddToCart}>
          🛒 Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
