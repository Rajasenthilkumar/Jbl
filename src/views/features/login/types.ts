export interface LoginResponse {
  result: Result;
  sc: boolean;
  time: number;
}

export interface Result {
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  name: string;
  email: string;
  token: string;
}
