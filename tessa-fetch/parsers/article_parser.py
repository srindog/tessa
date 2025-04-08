def parse_news_entry(news_entry, topic):
  return {
    'title': news_entry['title'],
    'topic': topic,
    'published': news_entry['published'],
    'summary': news_entry['summary'],
    'link': news_entry['link'],
    'source': news_entry['source'],
    'content': None
  }
  