import uuid


class TextSplitter:

    def __init__(

        self,

        chunk_size=1200,

        overlap=200

    ):

        self.chunk_size = chunk_size

        self.overlap = overlap

    def split(

        self,

        pages,

        metadata

    ):

        chunks = []

        chunk_number = 1

        for page in pages:

            text = page["text"]

            page_number = page["page"]

            paragraphs = [

                p.strip()

                for p in text.split("\n\n")

                if p.strip()

            ]

            current = ""

            for paragraph in paragraphs:

                if (

                    len(current) +

                    len(paragraph)

                    < self.chunk_size

                ):

                    current += paragraph + "\n\n"

                else:

                    chunks.append(

                        {

                            "chunk_id":

                                f"chunk_{chunk_number}",

                            "document_id":

                                metadata["document_id"],

                            "document_name":

                                metadata["document_name"],

                            "department":

                                metadata["department"],

                            "page":

                                page_number,

                            "text":

                                current.strip()

                        }

                    )

                    chunk_number += 1

                    current = (

                        current[-self.overlap:]

                        + "\n"

                        + paragraph

                    )

            current = current.strip()

            if current:

                chunks.append({

                    "chunk_id": f"chunk_{chunk_number}",

                    "document_id": metadata["document_id"],

                    "document_name": metadata["document_name"],

                    "department": metadata["department"],

                    "page": page_number,

                    "text": current

                })

                chunk_number += 1

        return chunks