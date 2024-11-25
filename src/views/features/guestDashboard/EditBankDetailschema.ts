import { z } from 'zod';

const editBankDetailSchema = z.object({
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

export type EditBankDetailschema = z.infer<typeof editBankDetailSchema>;
