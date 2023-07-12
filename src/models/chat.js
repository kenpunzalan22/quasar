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

export const createChat = (text, sender, receiver) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      let chats = allChats();
      let data = {
        text,
        sender_id: sender.id,
        receiver_id: receiver.id,
        sender_name: sender.name,
        receiver_name: receiver.name,
        id: chats.length + 1,
      };

      chats.push(data);
      localStorage.setItem("chats", JSON.stringify(chats));

      resolve(data);
    }, 1000);
  });
};
