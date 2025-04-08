import connectors.goog_connector as goog
import connectors.firebase_connector as firebase
from config.table_names import NEWS
import datetime

class ArticlesDao():
  NEWS = 'news'

  def __init__(self):
    self.db = firebase.get_firestore_client()
    self.batch = self.db.batch()

  def batch_add_news_articles(self, news_article_batch):
    for news_article in news_article_batch:
      news_article['created'] = datetime.datetime.now()
      news_article_ref = self.db.collection(NEWS).document()
      self.batch.set(news_article_ref, news_article)
    self.batch.commit()
      
  def fetch_news_articles_by_topic(self, topic):
    query = {
      'q': topic,
    }
    news_response = goog.get(self.NEWS, query)
    return news_response['entries']




