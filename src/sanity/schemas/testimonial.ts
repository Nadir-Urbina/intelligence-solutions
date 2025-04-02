export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'companyLink',
      title: 'Company Link',
      type: 'url',
      description: 'The website URL of the company',
    },
    {
      name: 'videoLink',
      title: 'Video Link',
      type: 'url',
      description: 'YouTube or Vimeo link for video testimonials. If provided, video will be shown instead of text quote.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'title',
      media: 'image',
    },
  },
} 