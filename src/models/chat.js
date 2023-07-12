import { addDoc, collection } from 'firebase/firestore'
import { db } from 'boot/firebaseConnection'

const allChats = () => {
  return JSON.parse(localStorage.getItem("chats") || "[]");
};

export const getChats = (user_id) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      const chats = allChats();

      resolve(
        chats.filter(
          (chat) => chat.sender_id === user_id || chat.receiver_id === user_id
        )
      );
    }, 1000);
  });
};

export const createChat = async (text, sender, receiver) => {
  let data = {
    text,
    sender_id: sender.id,
    receiver_id: receiver.id,
    sender_name: sender.name,
    receiver_name: receiver.name,
  };

  const docRef = await addDoc(collection(db, "chats"), data);

  return docRef.id;
};
