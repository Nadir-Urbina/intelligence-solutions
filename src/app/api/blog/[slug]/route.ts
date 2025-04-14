import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostBySlug } from '@/src/sanity/lib/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const posts = await getBlogPostBySlug(params.slug);
    
    if (!posts || posts.length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(posts[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
} 