import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// POST - Create new resume
export async function POST(request) {
  try {
    const session = await auth()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tittle, userEmail, userName } = body.data

    const resume = await prisma.resume.create({
      data: {
        tittle,
        userEmail,
        userName,
        experience: [],
        education: [],
        skills: { languages: [], frameworks: [], databases: [], tools: [] },
        projects: [],
        certifications: [],
      },
    })

    // Return in Strapi-like format for compatibility
    return NextResponse.json({
      data: {
        documentId: resume.id,
        id: resume.id,
        ...resume,
      },
    })
  } catch (error) {
    console.error('Error creating resume:', error)
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    )
  }
}

// GET - Get all resumes for user (with filter support)
export async function GET(request) {
  try {
    const session = await auth()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    // Support Strapi-style filter: ?filters[userEmail][$eq]=email
    const userEmail = searchParams.get('filters[userEmail][$eq]')

    const resumes = await prisma.resume.findMany({
      where: userEmail ? { userEmail } : {},
      orderBy: { createdAt: 'desc' },
    })

    // Return in Strapi-like format
    return NextResponse.json({
      data: resumes.map(resume => ({
        documentId: resume.id,
        id: resume.id,
        ...resume,
      })),
    })
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    )
  }
}
