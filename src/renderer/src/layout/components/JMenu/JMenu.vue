<template>
  <div class="mt-30px">
    <p class="text-12px pl-21px text-gray-400">{{ data?.meta.title || '' }}</p>
    <ul class="list-none pl-0 text-13px text-gray-600">
      <li
        v-for="item in data?.children"
        :key="item.path"
        class="hover:bg-[rgba(233,233,233,.8)] px-20px py-6px mt-10px border-rounded flex items-center justify-start gap-6px"
        @click="emits('click', item)"
      >
        <i :class="item.meta.icon" class="text-18px text-gray-400" />
        <span>{{ item.meta.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordRawPlus } from '@renderer/router/types'
import type { PropType } from 'vue'
defineProps({
  data: Object as PropType<RouteRecordRawPlus>
})

const emits = defineEmits(['click'])
</script>

<style lang="less" scoped></style>
