'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { apiVersion, dataset, projectId } from './src/sanity/env'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { structure } from './src/sanity/structure'

export default defineConfig({
  name: 'intelligence-solutions',
  title: 'Intelligence Solutions',
  projectId,
  dataset,
  plugins: [
    deskTool(),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})
