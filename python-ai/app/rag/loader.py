from pathlib import Path

import fitz

from docx import Document


class DocumentLoader:

    @staticmethod
    def load_pdf(path: str):

        document = fitz.open(path)

        pages = []

        for index, page in enumerate(document):

            pages.append(

                {

                    "page": index + 1,

                    "text": page.get_text()

                }

            )

        document.close()

        return pages

    @staticmethod
    def load_docx(path: str):

        document = Document(path)

        paragraphs = [

            paragraph.text

            for paragraph in document.paragraphs

            if paragraph.text.strip()

        ]

        return [

            {

                "page": 1,

                "text": "\n".join(paragraphs)

            }

        ]

    @staticmethod
    def load(path: str):

        extension = Path(path).suffix.lower()

        if extension == ".pdf":

            return DocumentLoader.load_pdf(path)

        if extension == ".docx":

            return DocumentLoader.load_docx(path)

        raise ValueError(

            f"Unsupported file type: {extension}"

        )