import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db } from './index';

async function updateUserInfo(user: any, updatedUserInfo: any) {
  const usersRef = doc(db, 'users', user.uid);
  await updateDoc(usersRef, updatedUserInfo);
}

async function isNewUser(user: any) {
  const usersRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(usersRef);
  return !docSnap.exists();
}

export { updateUserInfo, isNewUser };
