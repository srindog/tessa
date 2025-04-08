from bs4 import BeautifulSoup
import re
import datetime

SEARCH_RESULT_CLASS="g"
LINK_CLASS = "yuRUbf"
TITLE_CLASS = "LC20lb MBeuO DKV0Md"
TITLE_DELIM = " - "
SUBTITLE_CLASS = "MUxGbd wuQ4Ob WZ8Tjf"
SUBTITLE_DELIM = ' \u00b7 '
DESC_CLASS = "VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf"
TITLE_LINKEDIN_PATTERN = ' | LinkedIn'
SCHOOL_KEYWORDS = {'University', 'College', 'university', 'college'}
LINKEDIN_STOPWORDS = {'at', 'connections'}

def parse_search_results(search_results, search_career, search_location, search_domain):
  try:
    search_results_soup = BeautifulSoup(search_results, 'html.parser')
  except:
    print(search_results)
    return []
  
  parsed_search_results = []
  for search_result in search_results_soup.find_all(class_=SEARCH_RESULT_CLASS):
    parsed_search_result = {}

    subtitle_arg = parse_subtitle(search_result)
    location, career, company = subtitle_arg
    name, career_in_title, company_in_title = parse_title(search_result)
    linkedin = parse_link(search_result)

    parsed_search_result['name'] = name
    parsed_search_result['career'] = search_career
    parsed_search_result['company'] = company_in_title if len(company) == 0 else company
    parsed_search_result['domain'] = search_domain
    parsed_search_result['location'] = search_location
    parsed_search_result['linkedin'] = linkedin

    description = parse_description(search_result)
    seen_words = generate_seen_words(parsed_search_result)
    filtered_description = filter_seen_words_in_description(seen_words, description)
    parsed_search_result['filtered_description'] = filtered_description
    parsed_search_result['has_school_in_description'] = school_exists(filtered_description)
   
    parsed_search_result['tags'] = [search_career, search_domain, search_location]
    
    if len(parsed_search_result['company']) != 0 and search_domain.lower() != parsed_search_result['company'].lower():
      parsed_search_result['tags'].append(parsed_search_result['company'])
    
    parsed_search_results.append(parsed_search_result)
  return parsed_search_results
        
def parse_link(search_result):
  link = search_result.find(class_=LINK_CLASS).find('a')['href']
  return link

def parse_subtitle(search_result):
  subtitle = parse_and_check_text_from_class(search_result, SUBTITLE_CLASS)
  if not subtitle:
    return ['', '', '']
  subtitle_arg = subtitle.split(SUBTITLE_DELIM)
  subtitle_arg = fill_list_with_default_values(subtitle_arg, 3, '')
  return subtitle_arg

def fill_list_with_default_values(list_, length, default_value):
  while len(list_) < length:
    list_.append(default_value)
  return list_

def parse_title(search_result):
  title = parse_and_check_text_from_class(search_result, TITLE_CLASS)
  title_arg = title.split(TITLE_DELIM)
  if len(title_arg) < 1:
    return []
  name = title_arg[0]

  position, company = parse_position_and_company_in_title(title_arg)
  return name, position, company

def parse_position_and_company_in_title(title_arg):
  position = ''
  company = ''
  if len(title_arg) == 3:
    position = title_arg[1]
    company = title_arg[2]
  elif len(title_arg) == 2:
    if TITLE_LINKEDIN_PATTERN not in title_arg[1]:
      position = title_arg[1]
    else:
      company = title_arg[1]
  company = company.replace(TITLE_LINKEDIN_PATTERN, '')
  return position, company

def parse_description(search_result):
  description = parse_and_check_text_from_class(search_result, DESC_CLASS)
  return description

def generate_seen_words(parsed_search_result):
  seen_words = set()
  for key, value in parsed_search_result.items():
    value = remove_punctuation(value)
    if key != 'location' and value not in seen_words:
      seen_words.add(value)
  return seen_words

def filter_seen_words_in_description(seen_words, description):
  description = remove_numbers(remove_punctuation(description))
  for word in seen_words:
    description = description.replace(word, '')
  filtered_words = [word for word in description.split() if word not in LINKEDIN_STOPWORDS]
  return ' '.join(filtered_words)

def remove_punctuation(text):
  return re.sub(r'[^\w\s]', '', text)

def remove_numbers(text):
  return re.sub(r'[0-9]+', '', text)

def school_exists(filtered_description):
  return any(school_keyword in filtered_description for school_keyword in SCHOOL_KEYWORDS)            

def parse_and_check_text_from_class(search_result, className):
  parsed_element = search_result.find(class_=className)
  if not parsed_element:
    # print(f'Change the html class constants if consistently failing')
    return ''
  return parsed_element.text