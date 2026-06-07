// Types
export type {
  Product,
  Brand,
  InventoryItem,
  PaginatedResponse,
  ProductFilters,
} from "./types/product.types";

// Services
export { getAllProducts } from "./services/getAllProducts.service";
export { getProductById } from "./services/getProductById.service";