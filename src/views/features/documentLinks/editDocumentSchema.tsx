import { z } from 'zod';

export const editDocumentSchema = z.object({
  document_title: z.string(),
  document_type_id: z.number(),
  document_link: z.string().optional() || z.null().optional(),
  document_url: z.string().optional() || z.null().optional(),
  property_id: z.array(z.number()),
  is_terms_accepted: z.boolean(),
  is_visible: z.boolean(),
});

export type EditDocumentSchemaType = z.infer<typeof editDocumentSchema>;
