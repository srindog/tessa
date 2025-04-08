import React, { useState, useCallback } from 'react';

import { Button, Card, CardBody, Input, Label } from '@windmill/react-ui';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

import {
  capitalizePhrase,
  getDateStringFromDateInput,
} from '../../../../utils/grammer';

const lodash = require('lodash');

const NewsRecommendation = ({ data }: any) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card className={`mb-1 shadow-md bg-gray-50 mb-3`}>
        <CardBody>
          <a href={data.link} target="_blank" rel="noreferrer noopener">
            <div className="text-xl  flex justify-center font-semibold text-gray-800 bg-blue-50 hover:bg-blue-100 mb-3 p-3 rounded-lg border-2 border-solid border-blue-300 shadow-lg">
              {data.title}
            </div>
          </a>
          {expanded && (
            <div className="ml-3 text-xl font-normal inline-block">
              <p>
                {`Recommended on ${getDateStringFromDateInput(data.timestamp)}`}
              </p>
              <p>{`Topic: ${capitalizePhrase(data.topic)}`}</p>
              <p>{`Source: ${capitalizePhrase(data.source.title)}`}</p>
              <p>{`Link: ${data.link}`}</p>
              <p>
                {`Published: ${getDateStringFromDateInput(data.published)}`}
              </p>
            </div>
          )}
          <Button
            className={`${expanded ? 'mt-2' : 'mt-0'} bg-blue-400`}
            block
            onClick={toggleExpanded}
            icon={expanded ? FaAngleUp : FaAngleDown}
            layout="primary"
            aria-label="expand"
          />
        </CardBody>
      </Card>
    </div>
  );
};

function NewsRecommendations(props: any) {
  const { news } = props;

  const [searchQuery, setSearchQuery] = useState('');
  let filteredNews = news;

  if (searchQuery) {
    filteredNews = news.filter((articleData: any) => {
      const articleString = JSON.stringify(articleData).toLowerCase();
      return articleString.includes(searchQuery.toLowerCase());
    });
  }

  const handleChange = (evt: any) => {
    setSearchQuery(evt.target.value);
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
  };

  const debouncedHandleChange = useCallback(
    lodash.debounce(handleChange, 300),
    []
  );

  if (!news) return <p>No news found...</p>;

  return (
    <div className="mt-2">
      {news.length > 0 && (
        <form onSubmit={handleSubmit}>
          <Label>
            <span className="text-lg">Search Your Recommended News</span>
            <Input
              css="true"
              className="mb-4"
              onChange={debouncedHandleChange}
            />
          </Label>
        </form>
      )}
      <div className="grid gap-4 grid-cols-2">
        {news.length > 0 && filteredNews.length > 0 ? (
          filteredNews.map((article: any, i: any) => {
            return <NewsRecommendation key={`article-${i}`} data={article} />;
          })
        ) : (
          <p>No news found</p>
        )}
      </div>
    </div>
  );
}

export default NewsRecommendations;
