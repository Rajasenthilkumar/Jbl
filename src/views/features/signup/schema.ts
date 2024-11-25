import { z } from 'zod';

export const signUpSchema = z.object({
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
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  country_code: z.string().min(1, { message: 'Country code is required' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .min(10, { message: 'Phone number must be at least 10 characters' })
    .max(15, { message: 'Phone number must be at most 15 characters' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(5, { message: 'Password must be at least 5 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[\W_]/, {
      message: 'Password must contain at least one special character',
    }),
  is_terms_approved: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
  is_verified: z.boolean(),
});

export type SignUpFormType = z.infer<typeof signUpSchema>;
