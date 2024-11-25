export interface GetAllDocumentsResponse {
  result: GetAllDocumentsResult;
  sc: boolean;
  time: number;
}

export interface GetAllDocumentsResult {
  documents: GetAllDocumentsData[];
  metaData: MetaData;
}

export interface GetAllDocumentsData {
  id: number;
  document_title: string;
  is_visible: boolean;
  is_terms_accepted: boolean;
  is_deleted: boolean;
  document_url: null | string;
  document_link: string;
  document_type_id: number;
  documentType: DocumentType;
  propertyDocuments: PropertyDocument[];
  created_at: Date;
  updated_at: Date;
}

export interface DocumentType {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface PropertyDocument {
  id: number;
  property_id: number;
  document_id: number;
  property: Property;
  created_at: Date;
  updated_at: Date;
}

export interface Property {
  id: number;
  host_id: number;
  property_type_id: number;
  property_status_id: number;
  manual_property_id: number;
  manualProperty: ManualProperty;
  created_at: Date;
  updated_at: Date;
}

export interface ManualProperty {
  id: number;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  noOfBedrooms: number;
  noOfBathrooms: number;
  maxGuest: number;
  damage_protection_id: number;
  refundCurrencyType: null | string;
  refundAmount: null | string;
  nonRefundCurrencyType: null | string;
  nonRefundAmount: null | string;
  created_at: Date;
  updated_at: Date;
}

export interface MetaData {
  total: number;
  pageNumber: number;
  pageLimit: number;
  totalPages: number;
}

export interface GetAllDocumentsSortByOrder {
  'GetAllDocumentsData.document_title'?: 'ASC' | 'DESC';
  'GetAllDocumentsData.propertyDocuments'?: 'ASC' | 'DESC';
}
