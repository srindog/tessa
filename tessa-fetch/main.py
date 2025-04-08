from config.config import CONFIG

import firebase_admin
from firebase_admin import credentials

from pipelines.articles_pipeline import ArticlesPipeline
from pipelines.professionals_pipeline import ProfessionalsPipeline

#structure user interests like
'''
{
  '... other user data'.
  'positions': [],
  'domains': [],
  'locations': [],
}
'''

def main(args):

  interests = [
    'blockchain', 
    'machine learning', 
    'quantum computing',
    'artificial intelligence',
    'data mining', 
    'big data',
    'virtual reality',
    'augmented reality',
    'metaverse',
    'web3',
    'cloud computing',
    'crypto',
    'devops',
    'ui ux',
    'payments',
    'natural language processing',
    'robotics',
    'react js',
    'frontend',
    'backend',
    'full stack development',
    'distributed systems',
    'growth',
    'Capital One', 
    'Facebook', 
    'Google', 
    'Microsoft', 
    'Amazon',
    'Tesla', 
    'crypto',
    'artificial intelligence',
    'augmented reality',
  ]

  locations = ['new york']

  fetch_info = {'limit': 3, 'domains': interests, 'locations': locations}

  professionals_to_fetch = {
    'software engineer': fetch_info,
    'senior software engineer': fetch_info,
    'product manager': fetch_info,
    'senior product manager': fetch_info,
    'vp of engineering': fetch_info,
    'software engineer': fetch_info,
    'senior product manager': fetch_info,
    'vp of engineering': fetch_info
  }

  articles_pipeline = ArticlesPipeline(interests)
  articles_pipeline.run()
  professionals_pipeline = ProfessionalsPipeline(professionals_to_fetch)
  professionals_pipeline.run()
  

if __name__ == '__main__':
    main(CONFIG)
    