import type { CollectionConfig } from 'payload'

export const Works: CollectionConfig = {
  slug: 'works',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'medium', 'year', 'available'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'medium',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload a photo of the piece. Until one is set, the placeholder illustration below is used.',
      },
    },
    {
      name: 'svgViewBox',
      type: 'text',
      admin: {
        description: 'Placeholder illustration viewBox. Ignored once an image is uploaded.',
      },
    },
    {
      name: 'svgContent',
      type: 'textarea',
      admin: {
        description: 'Placeholder illustration SVG markup. Ignored once an image is uploaded.',
      },
    },
    {
      name: 'sizes',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'priceNote',
      type: 'text',
    },
  ],
}
