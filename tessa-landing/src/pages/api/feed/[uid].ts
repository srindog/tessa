import {
  collection,
  query,
  where,
  limit,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../firebase';

// const RECOMMENDATIONS: any = {'D62Nhz0ihbSrODRjSX74aIBjRz43#03-13-2022': {'uid': 'D62Nhz0ihbSrODRjSX74aIBjRz43', 'timestamp': 1647846613183, 'date': '03-13-2022', 'news': [{'title': 'Beem, an app that lets you livestream yourself in AR, raises $4 million - TechCrunch', 'published': 'Thu, 17 Feb 2022 08:00:00 GMT', 'content': null, 'topic': 'augmented reality', 'summary': '<a href="https://techcrunch.com/2022/02/17/beem-an-app-that-lets-you-live-stream-yourself-in-ar-raises-4-million/" target="_blank">Beem, an app that lets you livestream yourself in AR, raises $4 million</a>&nbsp;&nbsp;<font color="#6f6f6f">TechCrunch</font>', 'created': '2022-02-28 00:55:04.476137+00:00', 'source': {'href': 'https://techcrunch.com', 'title': 'TechCrunch'}, 'link': 'https://techcrunch.com/2022/02/17/beem-an-app-that-lets-you-live-stream-yourself-in-ar-raises-4-million/', 'id': 'A3houhxqnObClqq03g9y'}, {'summary': '<a href="https://www.cnbc.com/2022/02/22/sony-playstation-vr2-headset-unveiled.html" target="_blank">Sony unveils new virtual reality headset for PlayStation, which will compete with Facebook\'s Quest</a>&nbsp;&nbsp;<font color="#6f6f6f">CNBC</font>', 'published': 'Tue, 22 Feb 2022 14:10:14 GMT', 'topic': 'virtual reality', 'source': {'href': 'https://www.cnbc.com', 'title': 'CNBC'}, 'content': null, 'link': 'https://www.cnbc.com/2022/02/22/sony-playstation-vr2-headset-unveiled.html', 'title': "Sony unveils new virtual reality headset for PlayStation, which will compete with Facebook's Quest - CNBC", 'created': '2022-02-28 00:55:04.451137+00:00', 'id': 'ipHQFLD9JkKwtcQqubQZ'}], 'professionals': [{'tags': ['vp of product', 'virtual reality', 'San Francisco', ''], 'company': '', 'domain': 'virtual reality', 'filtered_description': 'Senior Product Manager Virtual Reality Dolby Laboratories year San Francisco California A complete immersion in a virtual world behind', 'location': 'San Francisco', 'has_school_in_description': false, 'career': 'vp of product', 'linkedin': 'https://www.linkedin.com/in/ashokbania', 'created': '2022-02-28 10:47:25.478284+00:00', 'name': 'ashok bania (অশোক বণিয়া)', 'id': '9ORlbSzH2ohQ37S7noFQ', 'similarity': 0.5, 'tags_in_common': {'domains': ['virtual reality'], 'locations': ['san francisco'], 'careers': ['vp of product']}, 'invite': 'Hi ashok, hope you are doing well! I am currently a senior associate software engineer at Capital One. Your career journey is so inspiring and I would love to learn more about your experiences as a vp of product in virtual reality. If you have a few minutes this or next week, would love to connect. Thanks!'}, {'company': '', 'created': '2022-02-28 09:47:43.442816+00:00', 'domain': 'virtual reality', 'name': 'Ankit Brahmbhatt', 'tags': ['product manager', 'virtual reality', 'San Francisco', ''], 'linkedin': 'https://www.linkedin.com/in/abrahmbhatt', 'location': 'San Francisco', 'has_school_in_description': false, 'career': 'product manager', 'filtered_description': 'Meta San Francisco California United States Lead Product Manager Reality Labs Lead Product Manager Virtual Reality Devices', 'id': '5LsiV7DutRryrkOyAWm1', 'similarity': 0.5, 'tags_in_common': {'domains': ['virtual reality'], 'locations': ['san francisco'], 'careers': ['product manager']}, 'invite': 'Hi Ankit, hope you are doing well! I am currently a senior associate software engineer at Capital One. Your career journey is so inspiring and I would love to learn more about your experiences as a product manager in virtual reality. If you have a few minutes this or next week, would love to connect. Thanks!'}]}, 'URu9BzyDVYbHmSp5CCK2WVy3juH2#03-13-2022': {'uid': 'URu9BzyDVYbHmSp5CCK2WVy3juH2', 'timestamp': 1647846613183, 'date': '03-13-2022', 'news': [{'topic': 'virtual reality', 'link': 'https://www.polygon.com/reviews/22909446/we-met-in-virtual-reality-review', 'summary': '<a href="https://www.polygon.com/reviews/22909446/we-met-in-virtual-reality-review" target="_blank">We Met In Virtual Reality review: a chaotic inside look at VRChat</a>&nbsp;&nbsp;<font color="#6f6f6f">Polygon</font>', 'published': 'Mon, 31 Jan 2022 08:00:00 GMT', 'created': '2022-02-28 00:55:04.458136+00:00', 'source': {'href': 'https://www.polygon.com', 'title': 'Polygon'}, 'content': null, 'title': 'We Met In Virtual Reality review: a chaotic inside look at VRChat - Polygon', 'id': 'MoLFufm08mupXDESxWnr'}, {'summary': '<a href="https://www.post-gazette.com/opinion/insight/2022/02/06/Virtual-reality-presents-new-challenges-for-parents/stories/202202060019" target="_blank">Virtual reality presents new challenges for parents</a>&nbsp;&nbsp;<font color="#6f6f6f">Pittsburgh Post-Gazette</font>', 'title': 'Virtual reality presents new challenges for parents - Pittsburgh Post-Gazette', 'topic': 'virtual reality', 'link': 'https://www.post-gazette.com/opinion/insight/2022/02/06/Virtual-reality-presents-new-challenges-for-parents/stories/202202060019', 'created': '2022-02-28 00:55:04.460136+00:00', 'published': 'Sun, 06 Feb 2022 08:00:00 GMT', 'content': null, 'source': {'title': 'Pittsburgh Post-Gazette', 'href': 'https://www.post-gazette.com'}, 'id': 'JKn4EZRR256Uw9AQSJGp'}], 'professionals': [{'career': 'senior software engineer', 'name': 'Kaiwen(Jack) S.', 'company': 'LinkedIn', 'location': 'New York', 'filtered_description': 'Senior Software Engineer Columbia University in the City of New York New York New York Natural Language Processing', 'has_school_in_description': true, 'linkedin': 'https://www.linkedin.com/in/kaiwen-jack-s-00a13014a', 'domain': 'natural language processing', 'tags': ['senior software engineer', 'natural language processing', 'New York', 'LinkedIn'], 'created': '2022-02-28 09:38:20.901343+00:00', 'id': '7TmgeI9RQh3oJbN47LbQ', 'similarity': 0.42857142857142855, 'tags_in_common': {'careers': ['senior software engineer'], 'locations': ['new york'], 'domains': ['natural language processing']}, 'invite': 'Hi Kaiwen(Jack), hope you are doing well! I am currently a software engineer at Capital One. Your career journey is so inspiring and I would love to learn more about your experiences as a senior software engineer in natural language processing. If you have a few minutes this or next week, would love to connect. Thanks!'}, {'location': 'San Francisco', 'created': '2022-02-28 09:38:20.953340+00:00', 'linkedin': 'https://www.linkedin.com/in/james-wu-0423731a', 'company': 'Apple', 'tags': ['senior software engineer', 'virtual reality', 'San Francisco', 'Apple'], 'domain': 'virtual reality', 'name': 'James Wu', 'career': 'senior software engineer', 'has_school_in_description': false, 'filtered_description': 'San Francisco Bay Area Senior Software Engineer Augmented Reality AR Virtual Reality VR Mixed Reality MR Extended Reality XR', 'id': '1RsYNbmnLpEg2i0h7GuL', 'similarity': 0.42857142857142855, 'tags_in_common': {'careers': ['senior software engineer'], 'locations': ['san francisco'], 'domains': ['virtual reality']}, 'invite': 'Hi James, hope you are doing well! I am currently a software engineer at Capital One. Your career journey is so inspiring and I would love to learn more about your experiences as a senior software engineer in virtual reality. If you have a few minutes this or next week, would love to connect. Thanks!'}]}}

async function fetchLatestRecommendations(uid: any) {
  const recommendationsRef = collection(db, 'recommendations');
  const userRecommendationsQuery = query(
    recommendationsRef,
    where('uid', '==', uid),
    orderBy('timestamp', 'desc'),
    limit(1)
  );
  const userRecommendationSnapshot = await getDocs(userRecommendationsQuery);
  const userRecommendations: any = [];
  userRecommendationSnapshot.forEach((doc) => {
    userRecommendations.push(doc.data());
  });
  return userRecommendations.length > 0 ? userRecommendations[0] : null;
}

export default async function feedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { uid },
    method,
  } = req;

  switch (method) {
    case 'GET': {
      // Get data from your database
      const feed = await fetchLatestRecommendations(uid);
      if (feed) {
        res.status(200).json({ feed });
      } else {
        res
          .status(404)
          .json({ message: 'No feed can be generated for user yet' });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
