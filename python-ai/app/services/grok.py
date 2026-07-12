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

        print("Groq Success")

        return response.choices[0].message.content