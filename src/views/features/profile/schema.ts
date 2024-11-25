import { z } from 'zod';

export const editCompanySchema = z.object({
  profile: z.object({
    company: z.object({
      company_name: z.string().optional(),
      business_registration_number: z.string().optional(),
      country_of_registration: z
        .string()
        .min(1, 'Country of registration is required')
        .optional(),
      vat_number: z.string().optional(),
      document_path: z
        .string()
        .regex(/\.(pdf|txt|png|svg|jpg|jpeg)$/, {
          message: 'Only PDF or TXT or IMG files are allowed',
        })
        .optional(),
      country_of_issue: z.string().optional(),
      residential_address: z.string().optional(),
      company_address: z.string().optional(),
      id_number: z.string().optional(),
      address_proof: z
        .string()
        .regex(/\.(pdf|txt|png|svg|jpg|jpeg)$/, {
          message: 'Only PDF or TXT  or IMG files are allowed',
        })
        .optional(),
    }),
  }),
});

export const addCardDetailsSchema = z.object({
  cardholder_name: z
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

export const editEmergencyDetailsSchema = z.object({
  alternative_contact_number: z
    .string()
    .length(10, 'Emergency contact must be exactly 10 digits')
    .regex(/^\d{10}$/, 'Emergency contact must be only digits'),
});

export const editWebsiteDetailsSchema = z.object({
  company_website: z.string(),
});

export const editProfileNameSchema = z.object({
  profile: z.object({
    other_details: z.object({
      name: z
        .string()
        .min(1, { message: 'First name is required' })
        .regex(/^[A-Za-z\s]+$/, {
          message: 'First name must only contain letters and spaces',
        }),
      sur_name: z
        .string()
        .min(1, { message: 'Surname is required' })
        .regex(/^[A-Za-z\s]+$/, {
          message: 'Surname must only contain letters and spaces',
        }),
      profile_image_url: z.string(),
      country_code: z.string().min(1, { message: 'Country code is required' }),
      phone: z
        .string()
        .min(10, { message: 'Phone number must be at least 10 characters' })
        .max(15, { message: 'Phone number must be at most 15 characters' })
        .regex(/^\d+$/, { message: 'Phone number must contain only digits' }),
    }),
  }),
});

export type EditCompanySchema = z.infer<typeof editCompanySchema>;
export type AddCardDetailsSchema = z.infer<typeof addCardDetailsSchema>;
export type EditEmergencyDetailsSchema = z.infer<
  typeof editEmergencyDetailsSchema
>;
export type EditWebsiteDetailsSchema = z.infer<typeof editWebsiteDetailsSchema>;
export type EditProfileNameSchema = z.infer<typeof editProfileNameSchema>;
export type ProfileSchema = z.infer<typeof editProfileNameSchema>;
