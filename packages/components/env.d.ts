// 全局类型
type Recordable<T = any> = Record<string, T>;
type KeyRecordable<T> = { [key: string]: T };
type KeyString = { [key: string]: string };

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
