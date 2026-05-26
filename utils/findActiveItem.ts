import { MenuItem } from "@/types/menu";

// Função recursiva para achar item (você já fez certo aqui)
export function findActiveItem(items: MenuItem[], id: string): MenuItem | undefined {
  for (const item of items) {
    if (item.id === id) return item;

    if (item.subItems) {
      const found = findActiveItem(item.subItems, id);
      if (found) return found;
    }
  }

  return undefined;
}