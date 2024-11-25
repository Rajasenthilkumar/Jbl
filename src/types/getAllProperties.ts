export interface GetAllProperties {
  result: {
    properties: GetAllPropertiesResult[];
    metaData: {
      total: number;
      pageNumber: number;
      pageLimit: number;
      totalPages: number;
    };
  };
  sc: boolean;
  time: number;
}

export interface GetAllPropertiesResult {
  id: number;
  host_id: number;
  property_type_id: number;
  property_status_id: number;
  manual_property_id: number;
  host: Host;
  propertyType: Property;
  propertyStatus: Property;
  manualProperty: ManualProperty;
  propertyDocuments: { id: number; document_id: number }[];
  created_at: Date;
  updated_at: Date;
}

export interface Host {
  id: number;
  email: null | string;
  name: string;
  sur_name: string;
  phone: null | string;
  password: string;
  google_token: null;
  is_verified: boolean;
  country_code: string;
  is_terms_approved: boolean;
  created_at: Date;
  updated_at: Date;
  profile_status: string;
  is_deleted: boolean;
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
  refundCurrencyType: string;
  refundAmount: string;
  nonRefundCurrencyType: string | null;
  nonRefundAmount: null | string;
  created_at: Date;
  updated_at: Date;
}

export interface Property {
  id: number;
  name: PropertyStatusName;
  created_at: Date;
  updated_at: Date;
}

export enum PropertyStatusName {
  Archives = 'Archives',
  ManualListings = 'Manual Listings',
  Publish = 'Publish',
}

export interface GetAllPropertyPayload {
  pageNumber: number;
  pageLimit: number;
  propertyStatus: 'Archives' | 'Publish' | 'Draft';
  sortByOrder: GetAllPropertySortByOrder;
  searchField?: GetAlPropertySearchField;
}

export interface GetAllPropertySortByOrder {
  'manualProperty.propertyName'?: 'ASC' | 'DESC';
  'property.created_at'?: 'ASC' | 'DESC';
  'manualProperty.propertyLocation'?: 'ASC' | 'DESC';
  'manualProperty.noOfBedrooms'?: 'ASC' | 'DESC';
  'manualProperty.maxGuest'?: 'ASC' | 'DESC';
}

export interface GetAlPropertySearchField {
  'manualProperty.propertyName'?: string;
  'manualProperty.propertyLocation'?: string;
}
