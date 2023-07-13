<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import ChatComponent from "components/ChatComponent.vue";
import { listenChats, createChat } from "models/chat";

const props = defineProps({
  patient: {
    type: Object,
    required: true,
  },
});

const dialog = ref(false);

const openChat = () => {
  dialog.value = true;
};

const messages = ref([]);
let unsubscribe = null;

const user = computed(() => JSON.parse(localStorage.getItem("user")));

const loadMessages = async () => {
  unsubscribe = listenChats(props.patient.user_id, (data) => {
    messages.value = data;
  });
};

onMounted(async () => {
  loadMessages();
});

onUnmounted(() => {
  unsubscribe();
});

const sendMessage = async (text) => {
  await createChat(
    text,
    {
      id: user.value.uid,
      name: "Dr. John Doe",
    },
    {
      id: props.patient.user_id,
      name: `${props.patient.first_name} ${props.patient.last_name}`,
    }
  );
};
</script>

<template>
  <q-btn round flat size="sm" color="green" icon="chat" @click="openChat" />

  <q-dialog v-model="dialog">
    <q-card flat bordered style="width: 500px" class="q-mt-xl">
      <ChatComponent
        :name="`${patient.first_name} ${patient.last_name}`"
        :messages="messages"
        @send="sendMessage"
      />
    </q-card>
  </q-dialog>
</template>
