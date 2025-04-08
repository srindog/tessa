import connectors.goog_connector as goog
import connectors.firebase_connector as firebase
from config.table_names import PROFESSIONALS
import datetime

class ProfessionalsDao():
  LINKEDIN_SITE_RESTRICTION = 'site:linkedin.com/in'
  GOOG_BASE_URL = 'https://api.goog.io/v1'
  CRAWL = 'crawl'

  def __init__(self, start_indexes):
    self.db = firebase.get_firestore_client()
    self.batch = self.db.batch()
    self.start_indexes = start_indexes

  def batch_add_professionals(self, professionals_batch):
    for professional in professionals_batch:
      professional['created'] = datetime.datetime.now()
      professional_ref = self.db.collection(PROFESSIONALS).document()
      self.batch.set(professional_ref, professional)
    self.batch.commit()

  def fetch_professionals(self, limit, *keywords):
    num_results = limit #self.decide_num_results(limit)
    q = self.build_q(*keywords)
    start_index = self.decide_start_index(q)
    query = {
        'q': q,
        'start': 0,
        'num_results': num_results,
        'hl': 'en',
        'gl': 'us'
    }
    result_counter = 0
    professionals_search_results = []
    while result_counter < limit:

      crawl_results = goog.get(self.CRAWL, query)
      if 'html' not in crawl_results:
        crawl_results['html'] = []
      professionals_search_results.append(crawl_results['html'])
      query['start'] += num_results
      result_counter += num_results
      self.start_indexes[q] += num_results
    return professionals_search_results

  def build_q(self, *keywords):
    keyword_q = ' '.join(f'"{keyword}"' for keyword in keywords)
    q = f'{self.LINKEDIN_SITE_RESTRICTION} {keyword_q}'
    return q

  def decide_num_results(self, limit):
    return limit if limit <= 100 else 100

  def decide_start_index(self, q):
    if q not in self.start_indexes:
      self.start_indexes[q] = 0
    return self.start_indexes[q]

  def get_start_indexes(self):
    return self.start_indexes



      



