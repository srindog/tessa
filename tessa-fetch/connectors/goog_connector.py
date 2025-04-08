import urllib
import requests
from config.headers import GOOG_HEADERS

GOOG_BASE_URL = 'https://api.goog.io/v1'
def get(endpoint, query):
  url = f'{GOOG_BASE_URL}/{endpoint}/{urllib.parse.urlencode(query)}'
  return requests.get(url, headers=GOOG_HEADERS).json()

