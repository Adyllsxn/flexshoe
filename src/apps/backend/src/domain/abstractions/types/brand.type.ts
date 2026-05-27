export type IBrand = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string | null;
  updatedById?: string | null;
};
