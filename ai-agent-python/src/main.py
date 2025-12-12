from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.models.request_model import AnalyzeRequest, FixRequest
from src.models.response_model import AnalyzeResponse, FixResponse
from src.agents.analyzer import analyze_code
from src.agents.fixer import fix_code

app = FastAPI(title="AI Code Review & Auto-Fix API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health():
    return {"status": "running"}

@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(request: AnalyzeRequest):
    result = await analyze_code(request.language, request.code)
    return AnalyzeResponse(analysis=result)

@app.post("/api/fix", response_model=FixResponse)
async def fix_endpoint(request: FixRequest):
    result = await fix_code(request.language, request.code)
    return FixResponse(fixed_code=result)