import time

from app.rag.retriever import Retriever

from app.services.grok import GrokService

from app.services.prompt_builder import PromptBuilder

from app.services.response_parser import ResponseParser


class ChatService:

    def __init__(self):

        self.retriever = Retriever()

        self.grok = GrokService()

    def ask(

        self,

        question,

        department

    ):

        start = time.time()

        results = self.retriever.retrieve(

            question,

            department

        )

        if len(results) == 0:

            return {

                "answer":

                "I couldn't find this information in the enterprise knowledge base.",

                "sources": [],

                "response_time": 0

            }

        context = self.retriever.build_context(

            results

        )

        prompt = PromptBuilder.build(

            question,

            context

        )

        answer = self.grok.generate(

            prompt

        )

        elapsed = int(

            (time.time() - start) * 1000

        )

        return ResponseParser.parse(

            answer,

            results,

            elapsed

        )