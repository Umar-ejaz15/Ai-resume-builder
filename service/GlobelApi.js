import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "https://reliable-love-b78741c7a8.strapiapp.com/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = (data) => axiosClient.post("/api/user-resumes", data);
const editNewResume = (userEmail) =>
  axiosClient.get(`/api/user-resumes?filters[userEmail][$eq]=${userEmail}`);
const updateResume = (id, data) =>
  axiosClient.put(`/api/user-resumes/${id}`, data);

const readResumeData = (id) => axiosClient.get(`/api/user-resumes/${id}`);

const deleteResume = (id) => axiosClient.delete(`/api/user-resumes/${id}`);

export default {
  createNewResume,
  editNewResume,
  updateResume,
  readResumeData,
  deleteResume,
};
