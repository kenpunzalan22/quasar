<script setup>
import { ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  messages: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["send"]);

const message = ref("");

const sendMessage = () => {
  if (message.value.trim() === "") return;

  emit("send", message.value);
  message.value = "";
};
</script>

<template>
  <q-toolbar>
    <q-btn
      round
      flat
      size="sm"
      color="primary"
      icon="menu"
      @click="drawer = !drawer"
    />

    <q-toolbar-title v-if="props.name">
      {{ props.name }}
    </q-toolbar-title>

    <q-space />

    <q-btn round flat size="sm" color="primary" icon="videocam" />
    <q-btn round flat size="sm" color="primary" icon="phone" />
    <q-btn round flat size="sm" color="primary" icon="info" />
  </q-toolbar>

  <q-separator />

  <div class="row" style="height: calc(100vh - 235px)">
    <div class="q-pa-md row justify-center" style="width: 100%">
      <div class="q-mx-lg" style="width: 100%">
        <q-chat-message
          v-for="message in props.messages"
          :key="message.id"
          :text="[message.text]"
          :sent="message.sender_id === 1234"
        />
      </div>
    </div>
  </div>

  <q-separator />

  <q-form @submit.prevent="sendMessage">
    <q-toolbar>
      <q-input
        label="Type your message here"
        filled
        round
        dense
        style="width: 100%"
        v-model="message"
      />

      <q-btn flat round color="red" icon="send" class="q-ml-xs" type="submit" />
    </q-toolbar>
  </q-form>
</template>
