import type { RouteRecordRaw } from 'vue-router'
import type { Component } from 'vue'

type RoleRecord = 'member' | 'vip'

export interface MetaRecordRawPlus {
  title: string
  icon: string
  roles: Array<RoleRecord>
  isMenu?: boolean
}

export interface RouteRecordRawPlus extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: MetaRecordRawPlus
  component?: Component | string
  components?: Component
  children?: RouteRecordRawPlus[]
  props?: Recordable
  fullPath?: string
}
