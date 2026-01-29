// 布局模式枚举
export enum LayoutModeTypeEnum {
  LEFT = 'left',
  TOP = 'top',
  LEFT_TOP = 'left-top',
}

type UseSettingReturnType = {
  greyChange: (value: boolean) => void;
  weaknessChange: (value: boolean) => void;
  changeLayoutMode: (mode: LayoutModeTypeEnum) => void;
  colorChange: (color: string) => void;
}

export function useSetting(): UseSettingReturnType {
  /** 灰色模式设置 */
  const greyChange = (value: boolean): void => {
    toggleClass(value, "html-grey", document.querySelector("html"));
  };
  
  /** 色弱模式设置 */
  const weaknessChange = (value: boolean): void => {
    toggleClass(
      value,
      "html-weakness",
      document.querySelector("html")
    );
  };
  
  const changeLayoutMode = (mode: LayoutModeTypeEnum) => {
    // 布局模式切换逻辑
    console.log('Change layout mode to:', mode);
  }
  
  const colorChange = (color: string) => {
    const html = document.querySelector('html')
    if (html?.style) {
      html.style.setProperty('--el-color-primary', color)
    }
  }
  
  return {
    greyChange,
    weaknessChange,
    changeLayoutMode,
    colorChange
  }
}

function toggleClass(flag: boolean, clsName: string, target?: HTMLElement | null) {
  const targetEl = target || document.body;
  let { className } = targetEl;
  className = className.replace(clsName, "").trim();
  targetEl.className = flag ? `${className} ${clsName} ` : className;
}
