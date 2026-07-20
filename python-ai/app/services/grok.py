from openai import OpenAI

from app.core.config import GROQ_API_KEY


class GrokService:

    def __init__(self):

        print("Initializing Groq...")
        print("API Key Loaded:", bool(GROQ_API_KEY))

        self.client = OpenAI(

            api_key=GROQ_API_KEY,

            base_url="https://api.groq.com/openai/v1"

        )

        self.last_usage = {

            "prompt_tokens": 0,

            "completion_tokens": 0,

            "total_tokens": 0

        }

    def generate(self, prompt):

        print("Calling Groq...")

        response = self.client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",
                    "content": "You are an enterprise knowledge assistant."
                },

                {
                    "role": "user",
                    "content": prompt
                }

            ],

            temperature=0

        )

        usage = getattr(response, "usage", None)

        self.last_usage = {

            "prompt_tokens": getattr(usage, "prompt_tokens", 0) or 0,

            "completion_tokens": getattr(usage, "completion_tokens", 0) or 0,

            "total_tokens": getattr(usage, "total_tokens", 0) or 0

        }

        print("Groq Success")

        return response.choices[0].message.content