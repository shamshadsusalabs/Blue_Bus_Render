export interface Bus {
  operatorName: string;
  busType: string;
  busName:string;
  pickUpLocation: string;
  pickUpDate: string;
  pickUpTime: string;
  pickUpAmPm: string;
  dropLocation: string;
  dropDate: string;
  dropTime: string;
  dropAmPm: string;
  totalSeats: number;
  fare: number;
  subLocations: Array<{
    location: string;
    date: string;
    time: string;
    amPm: string;
  }>;
  busImages: Array<{
    fileUrl: string;
  }>;
}
