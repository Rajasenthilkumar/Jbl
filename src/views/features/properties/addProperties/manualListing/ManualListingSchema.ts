import { z } from 'zod';

const manualListingStep1Schema = z.object({
  propertyName: z
    .string()
    .min(1, 'Property name is required')
    .min(2, 'Property name must be at least 2 characters'),
  propertyLocation: z
    .string()
    .min(1, 'Property location is required')
    .min(2, 'Property location must be at least 2 characters'),
  propertyImage: z.string().min(1, 'Property image is required'),
});

const manualListingStep2Schema = z.object({
  noOfBedrooms: z.coerce.number().min(1, 'At least 1 bedroom is required'),
  noOfBathrooms: z.coerce.number().min(1, 'At least 1 bathroom is required'),
  maxGuest: z.coerce
    .number()
    .min(1, 'Maximum number of guests must be at least 1'),
});

const manualListingStep3Schema = z.object({
  damage_protection_id: z.coerce
    .number()
    .min(1, 'Damage protection ID is required'),
  nonRefundCurrencyType: z.string().optional(),
  refundCurrencyType: z.string().optional(),
  refundAmount: z.coerce.number().optional(),
  nonRefundAmount: z.coerce.number().optional(),
});

export const manualListingSchemaEntitySchema = z.object({
  stepOne: manualListingStep1Schema,
  stepTwo: manualListingStep2Schema,
  stepThree: manualListingStep3Schema,
});

export type ManualListingEntitySchema = z.infer<
  typeof manualListingSchemaEntitySchema
>;

export type ManualListingAPIEntitySchema = {
  property_status_id: number; // Required
  host_id: number; // Required
  propertyName: string; // Required
  propertyLocation: string; // Required
  propertyImage: string; // Required
  noOfBedrooms: number; // Required
  noOfBathrooms: number; // Required
  maxGuest: number; // Required
  damage_protection_id: number; // Expected number, received string
  nonRefundCurrencyType?: string | null; // Required
  refundAmount?: number | string | null; // Required
  nonRefundAmount?: number | string | null; // Required
  refundCurrencyType?: string | null; // Required
  property_type_id: number | string; // Required
};
