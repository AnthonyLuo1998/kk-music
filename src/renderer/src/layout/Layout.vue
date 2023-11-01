<template>
  <!-- container -->
  <div class="flex flex-row h-full w-full">
    <!-- aside -->
    <div class="w-210px bg-[rgb(250,250,250)]">
      <DefaultAside />
    </div>

    <!-- right container -->
    <div class="flex-1 flex flex-col justify-start items-start">
      <!-- header -->
      <div class="w-full h-80px drag">
        <DefaultHeader />
      </div>
      <!-- content -->
      <div class="w-full h-[calc(100%-70px-80px)]">
        <DefaultContent />
      </div>
      <!-- footer -->
      <div class="w-full h-80px">
        <DefaultFooter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultAside from './default/DefaultAside.vue'
import DefaultContent from './default/DefaultContent.vue'
import DefaultFooter from './default/DefaultFooter.vue'
import DefaultHeader from './default/DefaultHeader.vue'
</script>
