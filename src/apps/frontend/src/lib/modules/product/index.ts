export type {
  Product,
  Brand,
  InventoryItem,
  PaginatedResponse,
  ProductFilters,
} from "./types/product.types";

export { getAllProducts } from "./services/getAllProducts.service";
export { getProductById } from "./services/getProductById.service";
export { createProduct } from "./services/createProduct.service";
export { updateProduct } from "./services/updateProduct.service";
export { deleteProduct } from "./services/deleteProduct.service";
export { restoreProduct } from "./services/restoreProduct.service";
export { updateProductStock } from "./services/updateProductStock.service";