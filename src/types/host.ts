export interface HostInfo {
  result: Result;
  sc: boolean;
  time: number;
}

export interface Result {
  profiles: never[];
  google_token: string;
  id: number;
  email: string;
  name: string;
  sur_name: string;
  phone: string;
  is_verified: boolean;
  country_code: string;
  is_terms_approved: boolean;
  created_at: Date;
  updated_at: Date;
  profile_status: ProfileStatus;
  is_deleted: boolean;
}

export enum ProfileStatus {
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete',
  SKIP = 'skip',
}

export interface profileDetails {
  id: number;
  email: string;
  name: string;
  sur_name: string;
  phone: string;
  google_token: string;
  is_verified: boolean;
  country_code: string;
  is_terms_approved: boolean;
  created_at: Date | string;
  updated_at: Date | string;
  profile_status: ProfileStatus;
  is_deleted: boolean;
  profiles: profileData[];
}

export interface profileData {
  id: number;
  user_id: number;
  host_id: number;
  profile_type: profileType;
  company_name: string;
  company_address: string;
  business_registration_number: string;
  country_of_registration: string;
  id_number: number | null;
  country_of_issue: string;
  vat_number: string;
  protected_properties_count: number;
  host_type: hostType;
  pms: string | null;
  alternative_contact_number: string;
  company_website: string | null;
  document_path: string;
  paystack_customer_code: string | null;
  paystack_authorization_code: string | null;
  is_terms_approved: boolean;
  address_proof: string | null;
  profile_image_url: string | null;
  id_proof: string | null;
  residential_address: null;
  createdAt: Date;
  updatedAt: Date;
  is_deleted: boolean;
}

export enum profileType {
  JURISTIC = 'Juristic',
  INDIVIDUAL = 'Individual',
}

export enum hostType {
  OWNER = 'Owner',
  PROPERTY_MANAGER = 'Property Manager',
}
