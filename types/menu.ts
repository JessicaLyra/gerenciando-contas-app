export type MenuItem = {
  id: string;
  label: string;
  description: string;
  amount?: string;
  icon?: string;
  subItems?: MenuItem[];
};