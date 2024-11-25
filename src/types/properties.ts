export interface PropertyType {
  result: PropertyTypeResult[];
  sc: boolean;
  time: number;
}

export interface PropertyTypeResult {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface PropertyStatus {
  result: PropertyStatusResult[];
  sc: boolean;
  time: number;
}

export interface PropertyStatusResult {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface DamageProtection {
  result: DamageProtectionResult[];
  sc: boolean;
  time: number;
}

export interface DamageProtectionResult {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
