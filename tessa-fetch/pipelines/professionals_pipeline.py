from dao.professionals_dao import ProfessionalsDao
from .pipeline import Pipeline
import parsers.professionals_parser as professionals_parser
from itertools import islice
import json

class ProfessionalsPipeline(Pipeline):
    def __init__(self, professionals_to_fetch):
      self.professionals_to_fetch = professionals_to_fetch
      with open('start_indexes.json') as si_file:
        self.start_indexes = json.load(si_file)
      self.professionals_dao = ProfessionalsDao(self.start_indexes)

    def extract(self):
      careers_to_search_results = {}
      for career, fetch_info in self.professionals_to_fetch.items():
        careers_to_search_results[career] = {}
        locations = fetch_info['locations']
        for location in locations:
          careers_to_search_results[career][location] = {}
          domains = fetch_info['domains']
          for domain in domains:
            careers_to_search_results[career][location][domain] = []
            limit = fetch_info['limit']
            print(f'Fetching {limit} {domain} {career}s in {location}')
            search_results = self.professionals_dao.fetch_professionals(limit, career, location, domain)
            self.articles_count['extracted'] += len(search_results)
            careers_to_search_results[career][location][domain].extend(search_results)
            
      self.start_indexes = self.professionals_dao.get_start_indexes()
      return careers_to_search_results   

    def transform(self, professionals_to_search_results):
      professionals = []
      for career, domains in professionals_to_search_results.items():
        for domain, locations in domains.items():
          for location, search_results in locations.items():
            for search_result in search_results:
              if len(search_result) != 0:
                professionals_to_add = professionals_parser.parse_search_results(search_result, career, location, domain)
                professionals.extend(professionals_to_add)
                self.articles_count['transformed'] = len(professionals_to_add) 
      return professionals

    def load(self, professionals):
      for professionals_batch in self.chunks(professionals, self.batch_size):
        self.professionals_dao.batch_add_professionals(professionals_batch)
        self.articles_count['loaded'] += len(professionals_batch)
    
    def chunks(self, data, size):
      it = iter(data)
      for i in range(0, len(data), size):
        yield [p for p in islice(it, size)]

    def run(self):
      careers_to_search_results = self.extract()
      professionals = self.transform(careers_to_search_results)
      self.load(professionals)

        