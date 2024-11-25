export interface IncidentReportImage {
  image_url: string;
}
export interface IncidentReport {
  description: string;
  amount: string;
  curency_type: string;
  covered_by_dw: boolean;
  claim_type_id: number;
  incident_report_images: IncidentReportImage[];
}

export interface BookingIncident {
  guest_id: number;
  booking_id: number;
  incident_reports: IncidentReport[];
}
