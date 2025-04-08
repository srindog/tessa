import pytest
from pipelines.articles_pipeline import ArticlesPipeline

@pytest.fixture
def topics_to_news_entries():
 return {'software engineering': [{'title': "The Three Phases Of 'Sustained' Software Engineering - Forbes", 'title_detail': {'type': 'text/plain', 'language': None, 'base': '', 'value': "The Three Phases Of 'Sustained' Software Engineering - Forbes"}, 'links': [{'rel': 'alternate', 'type': 'text/html', 'href': 'https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/'}], 'link': 'https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/', 'id': 'CAIiEFTi9j155lPphvsMQjwuXdIqFQgEKg0IACoGCAowrqkBMKBFMMGBAg', 'guidislink': False, 'published': 'Sun, 20 Feb 2022 16:04:21 GMT', 'published_parsed': [2022, 2, 20, 16, 4, 21, 6, 51, 0], 'summary': '<a href="https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/" target="_blank">The Three Phases Of \'Sustained\' Software Engineering</a>&nbsp;&nbsp;<font color="#6f6f6f">Forbes</font>', 'summary_detail': {'type': 'text/html', 'language': None, 'base': '', 'value': '<a href="https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/" target="_blank">The Three Phases Of \'Sustained\' Software Engineering</a>&nbsp;&nbsp;<font color="#6f6f6f">Forbes</font>'}, 'source': {'href': 'https://www.forbes.com', 'title': 'Forbes'}, 'sub_articles': []}]}

@pytest.fixture
def news_articles():
  return [
    {
      'title': "The Three Phases Of 'Sustained' Software Engineering - Forbes",
      'topic': 'software engineering' ,
      'published': 'Sun, 20 Feb 2022 16:04:21 GMT', 
      'summary': '<a href="https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/" target="_blank">The Three Phases Of \'Sustained\' Software Engineering</a>&nbsp;&nbsp;<font color="#6f6f6f">Forbes</font>', 
      'link': 'https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/', 
      'source': {'href': 'https://www.forbes.com', 'title': 'Forbes'}, 
      'content': None,
    }
  ]

@pytest.fixture()
def mock_articles_pipeline(mocker, news_topics):
  def mock_get(endpoint, query):
      return {'feed': {}, 'entries': [{'title': "The Three Phases Of 'Sustained' Software Engineering - Forbes", 'title_detail': {'type': 'text/plain', 'language': None, 'base': '', 'value': "The Three Phases Of 'Sustained' Software Engineering - Forbes"}, 'links': [{'rel': 'alternate', 'type': 'text/html', 'href': 'https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/'}], 'link': 'https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/', 'id': 'CAIiEFTi9j155lPphvsMQjwuXdIqFQgEKg0IACoGCAowrqkBMKBFMMGBAg', 'guidislink': False, 'published': 'Sun, 20 Feb 2022 16:04:21 GMT', 'published_parsed': [2022, 2, 20, 16, 4, 21, 6, 51, 0], 'summary': '<a href="https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/" target="_blank">The Three Phases Of \'Sustained\' Software Engineering</a>&nbsp;&nbsp;<font color="#6f6f6f">Forbes</font>', 'summary_detail': {'type': 'text/html', 'language': None, 'base': '', 'value': '<a href="https://www.forbes.com/sites/adrianbridgwater/2022/02/20/the-three-phases-of-sustained-software-engineering/" target="_blank">The Three Phases Of \'Sustained\' Software Engineering</a>&nbsp;&nbsp;<font color="#6f6f6f">Forbes</font>'}, 'source': {'href': 'https://www.forbes.com', 'title': 'Forbes'}, 'sub_articles': []}]}
  mocker.patch(
      'dao.articles_dao.goog.get',
      mock_get
  )

  return ArticlesPipeline(news_topics)

@pytest.mark.unit
def test_extract(mock_articles_pipeline, topics_to_news_entries):
  actual = mock_articles_pipeline.extract()
  assert topics_to_news_entries == actual

@pytest.mark.unit
def test_transform(mock_articles_pipeline, topics_to_news_entries, news_articles):
  actual = mock_articles_pipeline.transform(topics_to_news_entries)
  assert news_articles == actual

@pytest.mark.unit
def test_chunks(mock_articles_pipeline):
  for i, item in enumerate(mock_articles_pipeline.chunks([i for i in range(1501)], 500)):
    if i == 0:
      assert len(item) == 500
    elif i == 1:
      assert len(item) == 500
    elif i == 2:
      assert len(item) == 500
    elif i == 3:
      assert len(item) == 1



