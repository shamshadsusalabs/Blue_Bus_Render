export interface Booking {
  _id?: string;
  bus: string; // Reference to bus ID
  seat: {
    id: string;
    title: string;
  };
  user: {
    name: string;
    mobile: string;
    email: string;
  };
}
