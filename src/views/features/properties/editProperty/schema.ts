import { z } from 'zod';

export const editPropertySchema = z.object({
  property_type_id: z.coerce.number().min(0, 'Property type ID is required'),
  property_status_id: z.coerce
    .number()
    .min(0, 'Property status ID is required'),
  propertyName: z.string().min(1, 'Property name is required'),
  propertyLocation: z.string().min(1, 'Property location is required'),
  propertyImage: z.string().min(1, 'Property image is required'),
  noOfBedrooms: z.coerce.number().min(1, 'Number of bedrooms is required'),
  noOfBathrooms: z.coerce.number().min(1, 'Number of bathrooms is required'),
  maxGuest: z.coerce.number().min(1, 'Number of guests is required'),
  damage_protection_id: z.coerce
    .number()
    .min(1, 'Damage protection ID is required'),
  nonRefundCurrencyType: z.string().optional(),
  refundCurrencyType: z.string().optional(),
  refundAmount: z.coerce.number().optional(),
  nonRefundAmount: z.coerce.number().optional(),
});

export type EditPropertySchemaType = z.infer<typeof editPropertySchema>;

export type EditPropertyApiType = {
  property_status_id?: number; // Required
  host_id: number; // Required
  propertyName?: string; // Required
  propertyLocation?: string; // Required
  propertyImage?: string; // Required
  noOfBedrooms?: number; // Required
  noOfBathrooms?: number; // Required
  maxGuest?: number; // Required
  damage_protection_id?: number; // Expected number, received string
  nonRefundCurrencyType?: string | null; // Required
  refundAmount?: number | string | null; // Required
  nonRefundAmount?: number | string | null; // Required
  refundCurrencyType?: string | null; // Required
  property_type_id: number | string; // Required
};
