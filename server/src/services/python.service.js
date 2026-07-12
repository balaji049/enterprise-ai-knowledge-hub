import axios from "axios";
import path from "path";

const PYTHON_API = "http://127.0.0.1:8000/api";

export const indexDocument = async (payload) => {

    console.log("Calling Python...");
    console.log(payload);

    payload.file_path = path.resolve(payload.file_path);

    const response = await axios.post(

        `${PYTHON_API}/documents/index`,

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

        `${PYTHON_API}/chat`,

        {

            conversationId,

            question,

            department

        }

    );

    return response.data.data;

};
