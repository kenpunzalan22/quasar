<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import ChatComponent from "components/ChatComponent.vue";
import { listenChats, createChat } from "models/chat";

const chats = ref([]);
const selected_id = ref(null);
let unsubscribe = null;

const user = computed(() => JSON.parse(localStorage.getItem("user")));

const loadMessages = async () => {
  unsubscribe = listenChats(user.value.uid, (data) => {
    chats.value = data;
  });
};

onMounted(async () => {
  loadMessages();
});

onUnmounted(() => {
  unsubscribe();
});

const inbox = computed(() => {
  const all = chats.value.map((c) => ({
    name: c.sender_id === user.value.uid ? c.receiver_name : c.sender_name,
    id: c.sender_id === user.value.uid ? c.receiver_id : c.sender_id,
  }));

  const uniqueSet = new Set(all.map((item) => JSON.stringify(item)));

  return Array.from(uniqueSet).map((item) => JSON.parse(item));
});

const messages = computed(() => {
  const messages = chats.value.filter(
    (c) =>
      c.sender_id === selected_id.value || c.receiver_id === selected_id.value
  );

  return messages || [];
});

const drawer = ref(true);

const sendMessage = async (text) => {
  await createChat(
    text,
    {
      id: user.value.uid,
      name: "Dr. John Doe",
    },
    {
      id: selected_id.value,
      name: inbox.value.find((i) => i.id === selected_id.value).name,
    }
  );
};
</script>

<template>
  <q-drawer v-model="drawer" :width="350" :breakpoint="700" bordered>
    <q-toolbar>
      <q-toolbar-title>
        <q-icon name="mail" />
        Inbox
      </q-toolbar-title>
    </q-toolbar>

    <q-separator />

    <q-scroll-area class="fit">
      <q-list>
        <template v-for="inb in inbox" :key="inb.id">
          <q-item
            clickable
            @click="selected_id = inb.id"
            :active="selected_id === inb.id"
          >
            <q-item-section> {{ inb.name }} </q-item-section>
          </q-item>

          <q-separator />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>

  <q-page>
    <ChatComponent
      v-if="selected_id"
      :name="inbox.find((i) => i.id === selected_id).name"
      :messages="messages"
      @send="sendMessage"
    />
  </q-page>
</template>
