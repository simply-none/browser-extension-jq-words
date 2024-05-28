export const debounce = (func: Function, delay: number) => {
  let timer: string | number | NodeJS.Timeout | undefined = undefined;
  console.log("start");

  return function (this: any, word: string, cacheOrigin?: CacheOrigin) {
    console.log("clear start");
    clearTimeout(timer); // 清除上一次的定时器
    timer = setTimeout(() => {
      console.log("开始执行");
      // 设置新的定时器，延迟执行函数
      func.apply(this, [word, cacheOrigin]);
    }, delay);
  };
};

interface DialogPosition {
  top: number;
  left: number;
}

interface DialogOptions {
  height: number;
  width: number;
  offset: number;
}

export const computedDialogPosition = (position: DialogPosition, options: DialogOptions) => {
  // 计算弹窗的位置，防止在窗口外
  const docEle = document.documentElement;
  console.log(position, 'position')
  console.log(options, 'options')
  console.log(docEle.clientHeight, 'docEle.clientHeight', docEle.clientWidth, 'docEle.clientWidth')
  // options.offset: 弹窗顶部距离鼠标的偏移量，options.height：弹窗的高度
  let dialogEndHeight = position.top + options.height
  let dialogEndWidth = position.left + options.width
  const result = {
    // 鼠标位置 + 弹窗高度 + 偏移量 > 窗口高度，则top = 窗口高度 - 弹窗高度 - 偏移量
    top: position.top + options.offset + options.height > docEle.clientHeight ? docEle.clientHeight - options.height - options.offset : position.top + options.offset,
    // 鼠标位置 + 弹窗宽度 + 偏移量 > 窗口宽度，则left = 窗口宽度 - 弹窗宽度 - 偏移量
    left: position.left + options.offset + options.width > docEle.clientWidth ? docEle.clientWidth - options.width - options.offset : position.left + options.offset
  }
  console.log(result, 'result')
  return result
}
