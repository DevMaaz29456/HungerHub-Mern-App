import { useEffect, useState } from "react";
import burger from "../assets/burger.jpg";
import momos from "../assets/momos.jpg";
import pizza from "../assets/pizza.jpg";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // Fetch food data from API
  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Data:", data); // Debugging
      setFoodItem(data[0] || []); // Ensures no crash if API returns undefined
      setFoodCat(data[1] || []);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {/* Carousel */}
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner" id="carousel">
            {[pizza, momos, burger].map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={image}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                />
                <div className="carousel-caption d-flex justify-content-center">
                  <form className="d-flex w-75">
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search for food..."
                      aria-label="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </form>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Food Categories and Items */}
        <div className="container">
          {foodCat.length > 0 ? (
            foodCat.map((category) => (
              <div className="row mb-3" key={category._id}>
                <div className="fs-3 m-3">{category.CategoryName}</div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === category.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteredItem) => (
                      <div
                        key={filteredItem._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        {/* Card component without total price */}
                        <Card
                          foodItem={filteredItem}
                          options={filteredItem.options[0]}
                          showTotalPrice={false}
                        />
                      </div>
                    ))
                ) : (
                  <div>No Such Data Found</div>
                )}
              </div>
            ))
          ) : (
            <div>No categories available</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
