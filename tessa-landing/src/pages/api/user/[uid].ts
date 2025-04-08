import { doc, getDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../firebase';

const MAX_RETRIES = 2;
async function fetchUser(uid: any, retries = 0): Promise<any> {
  if (retries >= MAX_RETRIES) {
    return null;
  }
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  }
  return fetchUser(uid, retries + 1);
}

export default async function userHandler(
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
      const userData = await fetchUser(uid);
      if (userData) {
        res.status(200).json({ userData });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
      break;
    }
    case 'PUT':
      // Update or create data in your database
      return;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
