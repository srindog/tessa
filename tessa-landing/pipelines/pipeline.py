from abc import ABC, abstractmethod

class Pipeline(ABC):
  batch_size = 500
  articles_count = {
    'extracted': 0,
    'transformed': 0,
    'loaded': 0
  }

  @abstractmethod
  def extract(self):
    pass

  @abstractmethod
  def transform(self):
    pass

  @abstractmethod
  def load(self):
    pass

  @abstractmethod
  def chunks(self, data, size):
    pass

