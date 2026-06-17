export type {
  InventoryItem,
  InventoryColor,
} from "./types/inventory.types";

export { getInventoryByProductId } from "./services/getInventoryByProductId.service";
export { createInventory } from "./services/createInventory.service";
export { updateInventory } from "./services/updateInventory.service";
export { deleteInventory } from "./services/deleteInventory.service";
export { restoreInventory } from "./services/restoreInventory.service";
export { updateInventoryStock } from "./services/updateInventoryStock.service";