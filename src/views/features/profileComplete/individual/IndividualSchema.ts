import { z } from 'zod';

const IndividualStep1Schema = z.object({
  name: z.string().min(1, 'First name must be at least 1 character'),
  sur_name: z.string().min(1, 'Sur name must be at least 1 character'),
  residential_address: z
    .string()
    .min(1, 'Residential address must be at least 1 character'),
  country_of_issue: z
    .string()
    .min(2, 'Country of issue must be at least 2 characters'),
  id_number: z.string().min(1, 'ID number must be at least 1 character'),
  address_proof: z.string().min(1, 'Address proof is required'),
  document_path: z.string().min(1, 'Document is required'),
});

const IndividualStep2Schema = z.object({
  card_holder_name: z
    .string()
    .min(1, 'Card holder name is required')
    .min(2, 'Card holder name must be at least 2 characters')
    // no special characters allowed
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Card holder name must only contain letters and spaces',
    }),
  card_number: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiration_date: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/(20[2-9]\d)$/,
      'Expiration date must be in MM/YYYY format',
    ),
  cvv: z.string().regex(/^\d{3}$/, 'CVV must be 3 digits'),
});

const IndividualStep3Schema = z.object({
  protected_properties_count: z.coerce
    .number()
    .min(1, 'Number of protected properties required'),
  host_type: z.string().min(2, 'Host type must be at least 2 characters'),
  pms: z.string().min(2, 'PMS must be at least 2 characters'),
  alternative_contact_number: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .min(10, { message: 'Phone number must be at least 10 characters' })
    .max(15, { message: 'Phone number must be at most 15 characters' }),
  company_website: z.string().url().optional(),
  is_terms_approved: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export const individualSchema = z.object({
  stepOne: IndividualStep1Schema,
  stepTwo: IndividualStep2Schema,
  stepThree: IndividualStep3Schema,
});

export type IndividualSchema = z.infer<typeof individualSchema>;

export interface IndividualApiSchema {
  profile: Profile;
}

export interface Profile {
  company: Company;
  card: Card;
  other_details: OtherDetails;
}

export interface Card {
  card_holder_name: string;
  card_number: string;
  expiration_date: string;
  cvv: string;
}

export interface Company {
  id_number: string;
  country_of_issue: string;
  document_path: string;
  address_proof: string;
}

export interface OtherDetails {
  name: string;
  sur_name: string;
  residential_address: string;
  protected_properties_count: number;
  host_type: string;
  pms: string;
  alternative_contact_number: string;
  company_website?: string;
  is_terms_approved: boolean;
}
