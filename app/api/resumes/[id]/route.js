import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// GET - Get single resume
export async function GET(request, { params }) {
  try {
    const session = await auth()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const resume = await prisma.resume.findUnique({
      where: { id },
    })

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    // Return in Strapi-like format
    return NextResponse.json({
      data: {
        documentId: resume.id,
        id: resume.id,
        ...resume,
      },
    })
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

// PUT - Update resume
export async function PUT(request, { params }) {
  try {
    const session = await auth()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const updateData = body.data

    // Remove fields that shouldn't be updated directly
    const { documentId, id: _, createdAt, ...dataToUpdate } = updateData

    const resume = await prisma.resume.update({
      where: { id },
      data: dataToUpdate,
    })

    return NextResponse.json({
      data: {
        documentId: resume.id,
        id: resume.id,
        ...resume,
      },
    })
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

// DELETE - Delete resume
export async function DELETE(request, { params }) {
  try {
    const session = await auth()

    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.resume.delete({
      where: { id },
    })

    return NextResponse.json({
      message: 'Resume deleted successfully',
      data: { id }
    })
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}
