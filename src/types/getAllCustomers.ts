export interface getAllCustomers {
  authorizations: never[];
  result: {
    metaData: MetaData;
    authorizations: GetAllAuthroizations[];
  };
  sc: boolean;
  time: number;
}

export interface MetaData {
  total: number;
  pageNumber: number;
  pageLimit: number;
  totalPages: number;
}

export interface GetAllAuthroizations {
  authorization_code: string;
  bin: string;
  last4: number;
  exp_month: number;
  exp_year: number;
  channel: null | string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: null | string;
  reusable: true;
  signature: null | string;
  account_name: null | string;
}

export interface CustomerType {
  length: number;
  result: CustomerTypeResult[];
  sc: boolean;
  time: number;
}

export interface CustomerTypeResult {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: string;
  signature: string;
  account_name: string;
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
