from pydantic import BaseModel

class AnalyzeRequest(BaseModel):
    language: str
    code: str

class FixRequest(BaseModel):
    language: str
    code: str
