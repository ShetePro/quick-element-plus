// 全局类型声明

declare global {
  /** 可索引类型 */
  type Recordable<T = any> = Record<string, T>;
  
  /** 键值对类型 */
  type KeyRecordable<T> = {
    [key: string]: T;
  };
  
  /** 字符串键值对 */
  type KeyString = {
    [key: string]: string;
  };
  
  /** 对话框状态 */
  type MainDialogStatus = "create" | "update" | "detail";
  
  /** 对话框基础函数 */
  type MainDialogBaseFn = {
    open: (data: Recordable, status: MainDialogStatus) => void;
  };
}

export {};
