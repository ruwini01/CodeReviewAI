from pydantic import BaseModel

class AnalyzeResponse(BaseModel):
    analysis: str

class FixResponse(BaseModel):
    fixed_code: str
