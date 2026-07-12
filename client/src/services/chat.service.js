import * as api from "../api/chat.api";

export const askAI = async payload => {

    const response = await api.askAI(payload);

    return response.data;

};