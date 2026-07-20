import axios from "axios";
import path from "path";
import { AI_SERVICE } from "../config/ai.js";

export const indexDocument = async (payload) => {
    console.log("Calling AI Service...");
    console.log(payload);

    payload.file_path = path.resolve(payload.file_path);

    const response = await axios.post(
        `${AI_SERVICE.BASE_URL}/documents/index`,
        payload
    );

    return response.data;
};

export const askAI = async (
    conversationId,
    question,
    department
) => {
    const response = await axios.post(
        `${AI_SERVICE.BASE_URL}/chat`,
        {
            conversationId,
            question,
            department
        }
    );

    return response.data;
};