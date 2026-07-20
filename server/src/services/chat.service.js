import axios from "axios";

import analyticsEvents from "../analytics/analytics.events.js";
import { ANALYTICS_EVENT_TYPES } from "../analytics/analytics.constants.js";
import Message from "../models/Message.js";
import { generateConversationTitle } from "../utils/conversationTitle.js";
import Conversation from "../models/Conversation.js";

import { logActivity } from "./activityLogger.service.js";

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





    const conversation = await Conversation.findById(
    conversationId
);
if (conversation.title === "New Chat") {

    const title = generateConversationTitle(question);

    await Conversation.findByIdAndUpdate(
        conversationId,
        {
            title
        }
    );

}

    const response = await axios.post(

        PYTHON_API,

        {

            question,

            department: user.department.code,
            

        }

    );

    const ai = response.data.data;



   

    await Message.create({

        conversation: conversationId,

        role: "assistant",

        content: ai.answer,

        responseTime: ai.response_time,

        sources: ai.sources

    });

    await analyticsEvents.log({

        employee: user._id,

        department: user.department._id,

        type: ANALYTICS_EVENT_TYPES.AI_CHAT,

        metadata: {

            question,

            answerLength: ai.answer.length,

            sources: ai.sources.length

        }

    });

    await logActivity({

        module: "Chat",

        action: "Ask AI",

        target: question,

        details: "AI response generated",

        performedBy: user._id,

        department: user.department._id,

        status: "Success"

    });

    await Conversation.findByIdAndUpdate(

        conversationId,

        {

            lastMessageAt: new Date()

        }

    );

    return {
    ...ai,
    conversationId
};

};