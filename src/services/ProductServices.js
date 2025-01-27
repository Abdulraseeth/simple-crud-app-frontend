import api from "../Environment.js";

class ProductService {
  add(data) {
    return api.post("api/products", data);
  }

  getProduct(){
    return api.get("api/products")
  }

  deleteProduct(id) {
    return api.delete(`api/products/${id}`);
  }
  
}

export default new ProductService();
