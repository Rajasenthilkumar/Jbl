import { z } from 'zod';

const bookingVerificationFormStep1Schema = z.object({
  first_name: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, { message: 'First name must be at most 50 characters' })
    .regex(/^[A-Za-z]+$/, {
      message: 'First name must only contain letters',
    }),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, { message: 'Email must be at most 50 characters' })
    .regex(/^[A-Za-z]+$/, {
      message: 'Last name must only contain letters',
    }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .max(100, { message: 'Email must be at most 100 characters' })
    .email({ message: 'Invalid email address' }),
  country_code: z.string().min(1, { message: 'Country code is required' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .min(10, { message: 'Phone number must be at least 10 characters' })
    .max(15, { message: 'Phone number must be at most 15 characters' }),
  id_number: z
    .string()
    .min(1, 'ID number is required')
    .min(2, 'ID number must be at least 2 characters')
    .max(50, { message: 'ID document must be at most 50 characters' })
    .regex(/^[^!@#$%^&*(),.?":{}|<>]*$/, {
      message: 'ID Number cannot contain special character',
    }),
  id_document: z
    .string()
    .nonempty({ message: 'ID document is required' })
    .max(250, { message: 'ID document must be at most 250 characters' }),
});

const bookingVerificationFormStep2Schema = z.object({
  damage_protection_id: z.number(),
});

const bookingVerificationFormStep3Schema = z.object({
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

const bookingVerificationFormStep4Schema = z.object({
  signatureFile: z.union([z.instanceof(File), z.string()]),
});

export const bookingVerificationFormSchema = z.object({
  stepOne: bookingVerificationFormStep1Schema,
  stepTwo: bookingVerificationFormStep2Schema,
  stepThree: bookingVerificationFormStep3Schema,
  stepFour: bookingVerificationFormStep4Schema,
});

export type BookingVerificationFormSchema = z.infer<
  typeof bookingVerificationFormSchema
>;
