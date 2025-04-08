import pytest
from config.config import CONFIG
import firebase_admin

@pytest.fixture
def initialize_firebase_app():
  self.cred = credentials.Certificate(CONFIG['firebase_config'])
  firebase_admin.initialize_app(self.cred, {
    'projectId': CONFIG['firebase_project'],
  })

@pytest.fixture
def news_topics():
  return ['software engineering']

@pytest.fixture
def professionals_to_fetch():
  return {
    'software engineer': {
      'limit': 1,
      'domains': ['machine learning'],
      'locations': ['New York']
    },
  }

  



