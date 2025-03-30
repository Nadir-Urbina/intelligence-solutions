import type { StructureResolver } from 'sanity/desk'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Case Studies')
        .child(
          S.documentTypeList('caseStudy')
            .title('Case Studies')
        ),
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentTypeList('blogPost')
            .title('Blog Posts')
        ),
      S.listItem()
        .title('Testimonials')
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
        ),
    ]) 