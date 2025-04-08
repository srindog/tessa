import pytest
from pipelines.professionals_pipeline import ProfessionalsPipeline
import datetime

@pytest.fixture
def professional_search_result():
  with open('tests/professionals_search_result.txt', 'r', encoding='utf-8') as f:
    search_result = f.read()
  return search_result


@pytest.fixture
def careers_to_search_results(professional_search_result):
  return {
    "software engineer": {
      "machine learning": {
        "New York": [professional_search_result]
      }
    }
  }

@pytest.fixture()
def professionals():
  return [{'name': 'Akshaan Kakar', 'career': 'software engineer', 'company': 'Clubhouse', 'domain': 'machine learning', 'location': 'New York', 'linkedin': 'https://www.linkedin.com/in/akshaan', 'filtered_description': 'Senior Software Engineer Machine Learning Reddit Inc Apr Sep years months Greater New York City Area HyperScience Graphic', 'has_school_in_description': False, 'tags': ['software engineer', 'machine learning', 'New York', 'Clubhouse']}]

@pytest.fixture
def mock_professionals_pipeline(mocker, professional_search_result, professionals_to_fetch):
  def mock_get(endpoint, query):
      return {'html': professional_search_result}
  mocker.patch(
    'dao.professionals_dao.goog.get',
    mock_get
  )
  return ProfessionalsPipeline(professionals_to_fetch)


@pytest.mark.unit
def test_extract(mock_professionals_pipeline, careers_to_search_results):
  actual = mock_professionals_pipeline.extract()
  assert careers_to_search_results == actual

@pytest.mark.unit
def test_transform(mock_professionals_pipeline, careers_to_search_results, professionals):
  actual = mock_professionals_pipeline.transform(careers_to_search_results)
  print(actual)
  print('__________')
  print(professionals)
  assert professionals == actual

@pytest.mark.unit
def test_chunks(mock_professionals_pipeline):
  for i, item in enumerate(mock_professionals_pipeline.chunks([i for i in range(1501)], 500)):
    if i == 0:
      assert len(item) == 500
    elif i == 1:
      assert len(item) == 500
    elif i == 2:
      assert len(item) == 500
    elif i == 3:
      assert len(item) == 1


def test_load():
  pass