import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture
def client():
    """Create a test client for the FastAPI application."""
    return TestClient(app)


def test_root_endpoint_returns_200(client):
    """Test that the root endpoint returns a successful response."""
    response = client.get("/")
    assert response.status_code == 200


def test_root_endpoint_returns_html(client):
    """Test that the root endpoint returns HTML content."""
    response = client.get("/")
    assert response.headers["content-type"].startswith("text/html")


def test_root_endpoint_contains_title(client):
    """Test that the HTML contains the expected title."""
    response = client.get("/")
    assert "Snake Game" in response.text


def test_root_endpoint_contains_canvas(client):
    """Test that the HTML contains the game canvas."""
    response = client.get("/")
    assert '<canvas id="gameCanvas"' in response.text


def test_root_endpoint_contains_score_display(client):
    """Test that the HTML contains score display elements."""
    response = client.get("/")
    assert 'id="score"' in response.text
    assert 'id="highScore"' in response.text


def test_static_css_file_accessible(client):
    """Test that CSS static files are accessible."""
    response = client.get("/static/css/style.css")
    assert response.status_code == 200
    assert "text/css" in response.headers["content-type"]


def test_static_js_file_accessible(client):
    """Test that JavaScript static files are accessible."""
    response = client.get("/static/js/game.js")
    assert response.status_code == 200
    # JavaScript files can be served as application/javascript or text/javascript
    assert any(
        content_type in response.headers["content-type"].lower()
        for content_type in ["javascript", "text/plain"]
    )


def test_nonexistent_static_file_returns_404(client):
    """Test that requesting non-existent static files returns 404."""
    response = client.get("/static/nonexistent.txt")
    assert response.status_code == 404


def test_html_includes_static_file_references(client):
    """Test that the HTML correctly references static files."""
    response = client.get("/")
    html_content = response.text

    # Check for CSS reference
    assert '/static/css/style.css' in html_content

    # Check for JS reference
    assert '/static/js/game.js' in html_content
