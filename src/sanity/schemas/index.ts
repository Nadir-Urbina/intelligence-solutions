import testimonial from './testimonial'
import caseStudy from './caseStudy'
import contactInfo from './contactInfo'
import blogPost from './blogPost'

// Import these schemas once they're created
// import blockContent from './blockContent'
// import category from './category'
// import post from './post'
// import author from './author'

export const schemaTypes = [
  // Only include schemas that actually exist
  testimonial,
  caseStudy,
  contactInfo,
  blogPost
] 