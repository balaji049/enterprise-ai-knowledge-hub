import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:5000/api"

});

API.interceptors.request.use(config => {

    const token = localStorage.getItem("token");

    if (token) {

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

export const getDocuments = () =>

    API.get("/documents");

export const uploadDocument = formData =>

    API.post(

        "/documents",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

export const deleteDocument = id =>

    API.delete(`/documents/${id}`);