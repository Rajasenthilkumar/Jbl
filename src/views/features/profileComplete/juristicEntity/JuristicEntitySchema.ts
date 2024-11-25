import { z } from 'zod';

// Step 1: Company information
const JuristicStep1Schema = z.object({
  company_name: z.string().min(2, 'Company name must be at least 2 characters'),
  company_address: z
    .string()
    .min(5, 'Company address must be at least 5 characters'),
  business_registration_number: z
    .string()
    .min(1, 'Business registration number must be at least 1 character'),
  country_of_registration: z
    .string()
    .min(2, 'Country of registration must be at least 2 characters'),
  vat_number: z.string().optional(),
  document_path: z.string().min(1, 'Document is required'),
  address_proof: z.string().min(1, 'Address Proof is required'),
  id_proof: z.string().min(1, 'ID Proof is required'),
});

// Step 2: Payment details
const JuristicStep2Schema = z.object({
  card_holder_name: z
    .string()
    .min(1, 'Card holder name is required')
    .min(2, 'Card holder name must be at least 2 characters')
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

// Step 3: Other details
const JuristicStep3Schema = z.object({
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
  company_website: z
    .union([z.string().url(), z.literal('')])
    .optional()
    .or(z.literal('')),
  is_terms_approved: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export const juristicEntitySchema = z.object({
  stepOne: JuristicStep1Schema,
  stepTwo: JuristicStep2Schema,
  stepThree: JuristicStep3Schema,
});

export type JuristicEntitySchema = z.infer<typeof juristicEntitySchema>;

export type JuristicEntityApiSchema = {
  profile: {
    company: z.infer<typeof JuristicStep1Schema>;
    card: z.infer<typeof JuristicStep2Schema>;
    other_details: z.infer<typeof JuristicStep3Schema>;
  };
};
