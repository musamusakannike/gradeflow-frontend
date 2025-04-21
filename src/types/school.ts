export interface ISchool {
  id: string;
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  admin: {
    firstName: string;
    lastName: string;
    email: string;
  };
  isActive: boolean;
  createdAt: string;
  city?: string;
  state?: string;
  country?: string;
  website?: string;
  logo?: string;
}
