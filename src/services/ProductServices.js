import api from "../Environment.js";

class ProductService {
  add(data) {
    return api.post("api/products", data);
  }

  deleteProduct(id) {
    return api.delete(`api/products/${id}`);
  }

  getProduct(searchQuery = "", category = "", priceRange = "") {
    return api.get(`api/products`, {
      params: { search: searchQuery, category, price: priceRange },
    });
  }
}

export default new ProductService();
