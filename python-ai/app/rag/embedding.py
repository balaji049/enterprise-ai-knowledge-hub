from sentence_transformers import SentenceTransformer


class EmbeddingModel:

    _model = None

    @classmethod
    def load(cls):

        if cls._model is None:

            cls._model = SentenceTransformer(

                "BAAI/bge-small-en-v1.5"

            )

        return cls._model

    @classmethod
    def encode(cls, text):

        model = cls.load()

        return model.encode(

            text,

            normalize_embeddings=True

        ).tolist()

    @classmethod
    def encode_batch(cls, texts):

        model = cls.load()

        return model.encode(

            texts,

            normalize_embeddings=True

        ).tolist()