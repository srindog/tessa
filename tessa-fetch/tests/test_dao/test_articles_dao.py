import pytest
from dao.articles_dao import ArticlesDao

@pytest.fixture 
def articles_dao():
  return ArticlesDao()

@pytest.mark.integration
def test_fetch_articles_schema(articles_dao: ArticlesDao, news_topics):
  entries = articles_dao.fetch_news_articles_by_topic(news_topics[0])
  assert 'title' in entries[0]
  assert 'published' in entries[0]
  assert 'summary' in entries[0]
  assert 'link' in entries[0]
  assert 'source' in entries[0]






