import pytest
from dao.professionals_dao import ProfessionalsDao

@pytest.mark.integration
def test_fetch_professionals_schema(professionals_to_fetch):
    professionals_dao = ProfessionalsDao({})
    response = professionals_dao.fetch_professionals(1, 'software engineer')
    assert 'html' in response[0]




