import pytest
import connectors.goog_connector as goog

@pytest.mark.integration
def test_get():
    q = {'q': 'google', 'num': 1}
    response = goog.get('crawl', q)
    assert 'results' in response
    assert 'html' in response

