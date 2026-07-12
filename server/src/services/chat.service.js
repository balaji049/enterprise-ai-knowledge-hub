import axios from "axios";

import Message from "../models/Message.js";

import Conversation from "../models/Conversation.js";

const PYTHON_API =

    "http://127.0.0.1:8000/api/chat";

export const askAI = async (

    {

        conversationId,

        question,

        user

    }

) => {

    console.log("conversationId:", conversationId);
    console.log("question:", question);
    console.log("department:", user.department.code);

    await Message.create({

        conversation: conversationId,

        role: "user",

        content: question

    });

    console.log("User message saved");

    console.log("Calling Python...");

    const response = await axios.post(

        PYTHON_API,

        {

            question,

            department:

                user.department.code

        }

    );

    console.log(response.data);

    const ai = response.data.data;

    console.log("Saving AI message...");

    await Message.create({

        conversation: conversationId,

        role: "assistant",

        content: ai.answer,

        responseTime:

            ai.response_time,

        sources:

            ai.sources

    });

    console.log("AI message saved");

    await Conversation.findByIdAndUpdate(

        conversationId,

        {

            lastMessageAt:

                new Date()

        }

    );

    return ai;

};
