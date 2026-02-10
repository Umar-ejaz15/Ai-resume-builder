// Client-side API service for resume operations
// This replaces the old GlobelApi.js and calls Next.js API routes instead of Strapi

const createNewResume = async (data) => {
  const response = await fetch('/api/resumes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

const editNewResume = async (userEmail) => {
  const response = await fetch(
    `/api/resumes?filters[userEmail][$eq]=${userEmail}`
  );
  return response.json();
};

const readResumeData = async (id) => {
  const response = await fetch(`/api/resumes/${id}`);
  return response.json();
};

const updateResume = async (id, data) => {
  const response = await fetch(`/api/resumes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};

const deleteResume = async (id) => {
  const response = await fetch(`/api/resumes/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export default {
  createNewResume,
  editNewResume,
  readResumeData,
  updateResume,
  deleteResume,
};
