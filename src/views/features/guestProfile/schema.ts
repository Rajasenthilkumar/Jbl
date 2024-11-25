import { z } from 'zod';

export const editGuestNameSchema = z.object({
  first_name: z
    .string()
    .min(1, { message: 'First name is required' })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'First name must only contain letters and spaces',
    }),
  last_name: z
    .string()
    .min(1, { message: 'Surname is required' })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Surname must only contain letters and spaces',
    }),
  image_url: z.string(),
  country_code: z.string().min(1, { message: 'Country code is required' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .min(10, { message: 'Phone number must be at least 10 characters' })
    .max(15, { message: 'Phone number must be at most 15 characters' }),
  bio: z.string().min(1, { message: 'Bio is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .max(100, { message: 'Email must be at most 100 characters' })
    .email({ message: 'Invalid email address' }),
});

export const addCardDetailsSchema = z.object({
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
      /^(0[1-9]|1[0-2])\/([2-9]\d)$/,
      'Expiration date must be in MM/YY format',
    ),
  cvv: z.string().regex(/^\d{3}$/, 'CVV must be 3 digits'),
});

export const editCardDetailsSchema = z.object({
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
      /^(0[1-9]|1[0-2])\/([2-9]\d)$/,
      'Expiration date must be in MM/YY format',
    ),
  cvv: z.string().regex(/^\d{3}$/, 'CVV must be 3 digits'),
});

export const guestDashboardSchema = z.object({
  result: z.object({
    upcomingBookings: z.array(
      z.object({
        id: z.number().int().positive(),
        CheckInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Check-in date must be in YYYY-MM-DD format',
        }),
        CheckOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Check-out date must be in YYYY-MM-DD format',
        }),
        status: z
          .string()
          .refine(
            (val) => ['confirmed', 'cancelled', 'pending'].includes(val),
            {
              message:
                'Status must be one of "confirmed", "cancelled", or "pending"',
            },
          ),
      }),
    ),
    pastBookings: z.array(
      z.object({
        id: z.number().int().positive(),
        bookingReference: z
          .string()
          .min(1, { message: 'Booking reference is required' }),
        guestName: z.string().min(1, { message: 'Guest name is required' }),
        CheckInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Check-in date must be in YYYY-MM-DD format',
        }),
        CheckOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: 'Check-out date must be in YYYY-MM-DD format',
        }),
        CurrencyType: z
          .string()
          .min(1, { message: 'Currency type is required' }),
        GrossBookingValue: z
          .string()
          .min(1, { message: 'Gross booking value is required' }),
        BookingSource: z
          .string()
          .min(1, { message: 'Booking source is required' }),
        TotalGuest: z.number().int().positive(),
        guestEmail: z.string().email({ message: 'Invalid guest email format' }),
        guestPhone: z
          .string()
          .regex(/^\d+$/, { message: 'Invalid guest phone number' }),
        createdAt: z.string(),
        updatedAt: z.string(),
        propertyId: z.number().int().positive(),
        guestId: z.number().int().positive(),
        protectionRef: z
          .string()
          .min(1, { message: 'Protection reference is required' }),
        status: z.string(),
        is_booking_verified: z.boolean(),
        guest_protection_details_id: z.number().int().positive(),
      }),
    ),
    totalBookings: z.number().int().positive(),
    rating: z.number().int().min(0).max(5),
    totalReviews: z.number().int().positive(),
  }),
  sc: z.boolean(),
  time: z.number().int().positive(),
});

export type GuestDashboardSchema = z.infer<typeof guestDashboardSchema>;

export type EditGuestNameSchema = z.infer<typeof editGuestNameSchema>;
export type ProfileSchema = z.infer<typeof editGuestNameSchema>;
export type EditCardDetailsSchema = z.infer<typeof editCardDetailsSchema>;
export type AddCardDetailsSchema = z.infer<typeof addCardDetailsSchema>;
