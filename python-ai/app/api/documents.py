from fastapi import APIRouter

from app.models.request import IndexRequest

from app.services.indexing import IndexingService

router = APIRouter()

service = IndexingService()


@router.post("/documents/index")

def index_document(

    request: IndexRequest

):

    metadata = {

        "document_id": request.document_id,

        "document_name": request.document_name,

        "department": request.department

    }

    print("=" * 50)
    print(metadata)
    print(request.file_path)
    print("=" * 50)

    return service.index_document(

        metadata,

        request.file_path

    )