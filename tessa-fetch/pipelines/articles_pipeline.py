from dao.articles_dao import ArticlesDao
import parsers.article_parser as article_parser
from .pipeline import Pipeline
from itertools import islice

class ArticlesPipeline(Pipeline):
  def __init__(self, topics):
    self.topics = topics
    self.articles_dao = ArticlesDao()

  def extract(self):
    topics_to_news_entries = {}
    for topic in self.topics:
      print(f'Fetching {topic} news')
      news_entries = self.articles_dao.fetch_news_articles_by_topic(topic)
      topics_to_news_entries[topic] = news_entries
      self.articles_count['extracted'] += len(news_entries)
    return topics_to_news_entries

  def transform(self, topics_to_news_entries):
    news_articles = []
    for topic, news_entries in topics_to_news_entries.items():
      for news_entry in news_entries:
        news_article = article_parser.parse_news_entry(news_entry, topic)
        news_articles.append(news_article)
        
    self.articles_count['transformed'] = len(news_articles) 
    return news_articles

  def load(self, news_articles):
    for news_article_batch in self.chunks(news_articles, self.batch_size):
      self.articles_dao.batch_add_news_articles(news_article_batch)
      self.articles_count['loaded'] += len(news_article_batch)

  def chunks(self, data, size):
    it = iter(data)
    for i in range(0, len(data), size):
      yield [p for p in islice(it, size)]

  def run(self):
    topics_to_news_entries = self.extract()
    news_articles = self.transform(topics_to_news_entries)
    self.load(news_articles)