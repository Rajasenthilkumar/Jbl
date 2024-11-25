export interface ManualProperty {
  id: number;
  propertyName: string;
}
export interface Property {
  id: number;
  manualProperty: ManualProperty;
}

export interface PropertyType {
  value: number;
  label: string;
}

export interface PropertySearchField {
  'manualProperty.propertyName': string;
}

export interface PropertyFormType {
  pageNumber: number;
  pageLimit: number;
  searchField: PropertySearchField;
}

interface Host {
  id: number;
  email: string;
  name: string;
  sur_name: string;
  phone: string;
  password: string;
  google_token: string | null;
  is_verified: boolean;
  country_code: number;
  is_terms_approved: boolean;
  created_at: string;
  updated_at: string;
  profile_status: string;
  is_deleted: boolean;
}

interface PropertyInterface {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyStatus {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ManualPropertyInterface {
  id: number;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  noOfBedrooms: number;
  noOfBathrooms: number;
  maxGuest: number;
  damage_protection_id: number;
  refundCurrencyType: string;
  refundAmount: string;
  nonRefundCurrencyType: string;
  nonRefundAmount: string;
  created_at: string;
  updated_at: string;
}

export interface AllProperties {
  id: number;
  host_id: number;
  property_type_id: number;
  property_status_id: number;
  manual_property_id: number;
  host: Host;
  propertyType: PropertyInterface;
  propertyStatus: PropertyStatus;
  manualProperty: ManualPropertyInterface;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  propertyDocuments: any[]; // Assuming this is an array of unknown objects
  created_at: string;
  updated_at: string;
}

export interface MetaData {
  total: number;
  pageNumber: number;
  pageLimit: number;
  totalPages: number;
}

export interface AllPropertiesResult {
  properties: AllProperties[];
  metaData: MetaData;
}

export interface GetAllPropertiesResponse {
  result: AllPropertiesResult;
  sc: boolean;
  time: number;
}

export interface DocumentType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PropertyDocuments {
  id: number;
  property_id: number;
  document_id: number;
  property: AllProperties;
}

export interface DocumentResult {
  id: number;
  document_title: string;
  is_visible: boolean;
  is_terms_accepted: boolean;
  is_deleted: boolean;
  document_url: string | null;
  document_link: string | null;
  document_type_id: number;
  documentType: DocumentType;
  propertyDocuments: PropertyDocuments[];
}
export interface GetDocumentByIdResponse {
  result: DocumentResult;
  sc: boolean;
  time: number;
}

export interface GetDocumentTypeResponse {
  result: PropertyStatus[];
  sc: boolean;
  time: number;
}
