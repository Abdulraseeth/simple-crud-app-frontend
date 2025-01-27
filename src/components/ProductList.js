import React, { useEffect, useState } from "react";
import productService from "../services/ProductServices";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getProduct();
      console.log("All Products:", response.data);
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

  return (
    <div className="container mt-4">
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
