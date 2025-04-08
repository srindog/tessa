import React from 'react';

const Article = ({ data, className }: any) => {
  return (
    <a href={data.link} target="_blank" rel="noreferrer noopener">
      <div className={className}>{data.title}</div>
    </a>
  );
};

function NewsFeed(props: any) {
  const { news } = props;

  return (
    <>
      <h2 className="text-4xl font-semibold text-gray-900">News</h2>
      {/* <h2 className="text-2xl text-gray-800">topics: <span>{getUniqueTopicsFromNews(news)}</span></h2> */}
      {news.map((article: any, i: any) => (
        <Article
          className="text-2xl text-gray-800 bg-blue-50 hover:bg-blue-100 mb-1 p-3 rounded-lg border-2 border-solid border-blue-300 shadow-lg"
          data={article}
          key={`article-${i}`}
        />
      ))}
    </>
  );
}

export default NewsFeed;
