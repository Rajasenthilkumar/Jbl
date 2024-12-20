export interface DataType {
  id: number;
  protectionRef?: string;
  BookingSource: string;
  guestName: string;
  guestRating?: number;
  propertyId: number;
  CheckInDate: string;
  CheckOutDate: string;
  protectionStatus?: string;
  report?: string;
  claimReport?: string;
}

// export const data: DataType[] = [
//   {
//     key: 1,
//     protectionRef: 'JBL-724dfg01',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 2,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 3,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 4,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 5,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 6,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 7,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 2.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 8,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 2.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 9,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 10,
//     protectionRef: 'JBL-724dfg10',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 11,
//     protectionRef: 'JBL-724dfg11',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 12,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 13,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 14,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 2.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 14,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 2.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 15,
//     protectionRef: 'JBL-724dfg63',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 2.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
//   {
//     key: 16,
//     protectionRef: 'JBL-724dfg16',
//     bookingRef: '4675784',
//     guestName: 'Alan Walker',
//     guestRating: 4.5,
//     property: 'Bushveld Self-Catering Lodge',
//     checkIn: '12.12.24',
//     checkOut: '12.12.24',
//     protectionStatus: 'Damage waiver',
//     report: 'Incomplete',
//     claimReport: 'Dispute',
//   },
// ];
