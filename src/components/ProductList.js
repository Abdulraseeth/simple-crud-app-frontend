import React, { useEffect, useState } from "react";
import productService from "../services/ProductServices";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState(""); // Filter by category
  const [priceRange, setPriceRange] = useState(""); // Filter by price

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, category, priceRange]);

  const fetchProducts = async () => {
    try {
      const response = await productService.getProduct(
        searchQuery,
        category,
        priceRange
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.deleteProduct(id);
        alert("Product deleted successfully");
        // Refresh the product list after deletion
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // const handleSearch = async () => {
  //   fetchProducts();
  // };

  return (
    <div className="container mt-4">
      <h1>Product List</h1>

      {/* search and filter */}
      <div className="mb-3">
        <div class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            aria-label="Search"
          />
          <div className="col-md-2 me-2">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
          <div className="col-md-2 me-2">
            <select
              className="form-select"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="0-50">Under $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-500">$100 - $500</option>
            </select>
          </div>
          {/* <button class="btn btn-primary" onClick={handleSearch}>
            Search
          </button> */}
        </div>
      </div>

      <div
        className="card shadow p-4"
        style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}
      >
        <h1 className="text-center mb-4">Product Showcase</h1>
        {products.length === 0 ? (
          <div className="text-center p-5">
            <h3 className="text-muted">No products available.</h3>
            <p className="text-muted">Please add some products to display.</p>
          </div>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image || "https://via.placeholder.com/300"}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>

                    {/* Category Badge */}
                    <span className="badge bg-info mb-2">
                      {product.category || "No Category"}
                    </span>

                    <p className="card-text text-muted">
                      {product.description || "No description available"}
                    </p>
                    <p className="card-text fw-bold text-primary">
                      ${product.price}
                    </p>

                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
