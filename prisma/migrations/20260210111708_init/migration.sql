-- CreateTable
CREATE TABLE "resumes" (
    "id" TEXT NOT NULL,
    "userEmail" VARCHAR(255) NOT NULL,
    "userName" VARCHAR(255),
    "tittle" VARCHAR(500),
    "name" VARCHAR(255),
    "title" VARCHAR(500),
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "location" VARCHAR(255),
    "summary" TEXT,
    "experience" JSONB DEFAULT '[]',
    "education" JSONB DEFAULT '[]',
    "skills" JSONB DEFAULT '{}',
    "projects" JSONB DEFAULT '[]',
    "certifications" JSONB DEFAULT '[]',
    "documentId" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resumes_documentId_key" ON "resumes"("documentId");

-- CreateIndex
CREATE INDEX "resumes_userEmail_idx" ON "resumes"("userEmail");
