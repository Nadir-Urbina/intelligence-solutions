import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// This secret should be stored in an environment variable in production
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET || 'your-secret-here';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    // Validate secret
    if (secret !== SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }
    
    const body = await request.json();
    const { _type } = body;
    
    // Revalidate based on content type
    switch (_type) {
      case 'testimonial':
        revalidateTag('testimonials');
        break;
      case 'caseStudy':
        revalidateTag('caseStudies');
        
        // If it's an update to an existing case study, also revalidate that specific slug
        if (body.slug?.current) {
          revalidateTag(`caseStudy-${body.slug.current}`);
        }
        break;
      case 'blogPost':
        revalidateTag('blogPosts');
        
        // If it's an update to an existing blog post, also revalidate that specific slug
        if (body.slug?.current) {
          revalidateTag(`blogPost-${body.slug.current}`);
        }
        break;
      case 'contactInfo':
        revalidateTag('contactInfo');
        break;
      default:
        // Fallback to revalidate all tags
        revalidateTag('testimonials');
        revalidateTag('caseStudies');
        revalidateTag('blogPosts');
        revalidateTag('contactInfo');
    }
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// Support GET requests for testing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const tag = searchParams.get('tag');
    
    // Validate secret
    if (secret !== SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }
    
    if (!tag) {
      return NextResponse.json({ message: 'No tag specified' }, { status: 400 });
    }
    
    revalidateTag(tag);
    
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
} 