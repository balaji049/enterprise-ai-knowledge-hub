class ResponseParser:

    @staticmethod
    def parse(

        answer,

        sources,

        response_time

    ):

        return {

            "answer": answer,

            "sources": sources,

            "response_time": response_time

        }