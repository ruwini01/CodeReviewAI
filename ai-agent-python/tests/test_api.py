def test_health(client):
    res = client.get("/")
    assert res.status_code == 200
    assert res.json()["status"] == "running"

def test_analyze_api(client):
    res = client.post("/api/analyze", json={
        "language": "python",
        "code": "print('hello')"
    })
    assert res.status_code == 200
    assert "analysis" in res.json()

def test_fix_api(client):
    res = client.post("/api/fix", json={
        "language": "python",
        "code": "print('hello'"
    })
    assert res.status_code == 200
    assert "fixed_code" in res.json()
