import {
  collection,
  addDoc,
  query,
  where,
  or,
  onSnapshot
} from "firebase/firestore";
import { db } from 'boot/firebaseConnection'

export const listenChats = (user_id, callback) => {
  const q = query(collection(db, "chats"),
    or(where('sender_id', '==', user_id),
      where('receiver_id', '==', user_id)
    )
  );

  return onSnapshot(q, (querySnapshot) => {
    let chats = [];
    querySnapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() });
    });
    callback(chats.sort((a, b) => a.timestamp - b.timestamp));
  });
}

export const createChat = async (text, sender, receiver) => {
  let data = {
    text,
    sender_id: sender.id,
    receiver_id: receiver.id,
    sender_name: sender.name,
    receiver_name: receiver.name,
    timestamp: new Date().getTime(),
  };

  const docRef = await addDoc(collection(db, "chats"), data);

  return docRef.id;
};
