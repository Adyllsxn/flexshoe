export type IStore = {
  id: string;
  name: string;
  whatsapp: string;
  email: string | null;
  address: string | null;
  logo: string | null;
  primaryColor: string;
  createdAt: Date;
  updatedAt: Date;
  updatedById?: string | null;
};
