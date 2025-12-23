<template>
  <div class="h-[calc(100vh-64px)] flex bg-base-200">
    <!-- Sidebar: Ticket List -->
    <div class="w-80 md:w-96 flex-none bg-base-100 border-r border-base-300">
      <TicketList />
    </div>

    <!-- Main Content: Chat -->
    <div class="flex-1 bg-base-100 min-w-0">
      <TicketChat />
    </div>
  </div>
</template>

<script setup>
import TicketList from '@/components/Support/TicketList.vue';
import TicketChat from '@/components/Support/TicketChat.vue';
</script>