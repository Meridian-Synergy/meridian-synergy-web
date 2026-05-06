import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        image: z.string().optional(),
        manufacturer: z.string().optional(),
        model: z.string().optional(),
        relatedDrones: z.array(z.string()).optional(),
        relatedServices: z.array(z.string()).optional(),
        specs: z.object({
          weight: z.string().optional(),
          maxFlightTime: z.string().optional(),
          camera: z.string().optional(),
          range: z.string().optional(),
        }).optional(),
        publishedAt: z.string().optional(),
        seo: z.object({
          keywords: z.array(z.string()).optional(),
        }).optional(),
      }),
    }),
  },
})
