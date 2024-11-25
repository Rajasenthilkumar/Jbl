import { z } from 'zod';

export const addDocumentSchemaSchema = z.object({
  document_title: z.string(),
  document_type_id: z.number(),
  property_id: z.array(z.number()),
  is_visible: z.boolean().optional(),
  document_url: z.string().optional(),
  document_link: z.string().optional(),
});

export type AddDocumentEntitySchema = z.infer<typeof addDocumentSchemaSchema>;

export type AddDocumentApiSchema = {
  document_title: string;
  document_type_id: number;
  property_id: number[];
  is_visible: boolean;
  document_url?: string;
  document_link?: string;
  is_terms_accepted: boolean;
};
