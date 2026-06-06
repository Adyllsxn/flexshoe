// lib/modules/brand/types/brand.types.ts
export type Brand = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};