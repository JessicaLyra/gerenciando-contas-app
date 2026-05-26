export type MenuItem = {
  id: string;
  label: string;
  description: string;
  amount?: string;
  subItems?: MenuItem[];
};