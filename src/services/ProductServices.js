import api from "../Environment.js";

class ProductService {
  add(data) {
    return api.post("api/products", data);
  }

  deleteProduct(id) {
    return api.delete(`api/products/${id}`);
  }

  getProduct(searchQuery = "") {
    return api.get(`api/products`, { params: { search: searchQuery } });
  }
}

export default new ProductService();
