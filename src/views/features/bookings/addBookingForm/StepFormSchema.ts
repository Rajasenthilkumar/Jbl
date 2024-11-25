import { z } from 'zod';

const addBookingFormStep1Schema = z.object({
  bookingReference: z
    .string({
      message: 'Booking Reference must be string',
    })
    .min(1, 'Booking Reference must be at least 1'),
  propertyId: z.number(),
  CheckInDate: z.string(),
  CheckOutDate: z.string(),
  CurrencyType: z.string(),
  GrossBookingValue: z.string().min(1, { message: 'This field is required' }),
  BookingSource: z.string(),
  TotalGuest: z.coerce
    .number({ message: 'Total guests must be a number' })
    .min(1, 'Total guests must be at least 1'),
});

const addBookingFormStep2Schema = z.object({
  guestName: z.string().min(2),
  guestEmail: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  guestPhone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .min(10, { message: 'Phone number must be at least 10 characters' })
    .max(15, { message: 'Phone number must be at most 15 characters' }),
});

export const addBookingFormSchema = z.object({
  stepOne: addBookingFormStep1Schema,
  stepTwo: addBookingFormStep2Schema,
});

export type AddBookingFormSchema = z.infer<typeof addBookingFormSchema>;
