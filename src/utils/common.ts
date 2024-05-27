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
