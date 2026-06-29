from fastapi import APIRouter
from app.models.schema import SummarizeRequest, SummarizeResponse
from app.services.ai_service import summarize_text

router = APIRouter()

@router.post("/summarize", response_model=SummarizeResponse)
def summarize(req: SummarizeRequest):
    result = summarize_text(req.text)
    return {"summary": result}
