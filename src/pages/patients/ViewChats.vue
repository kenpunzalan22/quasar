<script setup>
import { ref, onMounted } from "vue";
import ChatComponent from "components/ChatComponent.vue";
import { getChats, createChat } from "models/chat";

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

const loadMessages = async () => {
  messages.value = await getChats(props.patient.id);
};

onMounted(async () => {
  loadMessages();
});

const sendMessage = async (text) => {
  await createChat(
    text,
    {
      id: 1234,
      name: "Dr. John Doe",
    },
    {
      id: props.patient.id,
      name: `${props.patient.first_name} ${props.patient.last_name}`,
    }
  );
  loadMessages();
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
