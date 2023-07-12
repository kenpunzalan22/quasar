import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  or
} from "firebase/firestore";
import { db } from 'boot/firebaseConnection'

const allChats = async () => {
  const q = query(collection(db, "chats"),
    or(where('sender_id', '==', '1234'),
      where('receiver_id', '==', '1234')
    )
  );
  const querySnapshot = await getDocs(q);

  let chats = [];
  querySnapshot.forEach((doc) => {
    chats.push({ ...doc.data(), id: doc.id });
  });

  return chats;
};

export const getChats = async (user_id) => {
  const q = query(collection(db, "chats"),
    or(where('sender_id', '==', user_id),
      where('receiver_id', '==', user_id)
    )
  );
  const querySnapshot = await getDocs(q);

  let chats = [];
  querySnapshot.forEach((doc) => {
    chats.push({ ...doc.data(), id: doc.id });
  });

  return chats;
};

export const createChat = async (text, sender, receiver) => {
  let data = {
    text,
    sender_id: sender.id,
    receiver_id: receiver.id,
    sender_name: sender.name,
    receiver_name: receiver.name
  };

  const docRef = await addDoc(collection(db, "chats"), data);

  return docRef.id;
};
