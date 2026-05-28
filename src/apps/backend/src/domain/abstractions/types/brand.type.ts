export type IBrand = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
};
