import pytest
from src.agents.analyzer import analyze_code

@pytest.mark.asyncio
async def test_analyze_code():
    response = await analyze_code("python", "print('hello')")
    assert isinstance(response, str)
    assert len(response) > 0
