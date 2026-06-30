from pydantic import BaseModel

class SummarizeRequest(BaseModel):
    text: str
    length: str

class SummarizeResponse(BaseModel):
    summary: str
