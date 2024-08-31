export interface InventoryItem {
  id: string,
  name: string,
  description: string,
  category: string,
  uom: number,
  isFavourite: boolean,
  defaultExpiry: number,
}