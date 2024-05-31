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

export const formatDate = (dat: Date, type: 'date' | 'time' | 'dateTime' = 'dateTime') => {
  //获取年月日，时间
  let year = dat.getFullYear();
  let mon =
    dat.getMonth() + 1 < 10 ? "0" + (dat.getMonth() + 1) : dat.getMonth() + 1;
  let data = dat.getDate() < 10 ? "0" + dat.getDate() : dat.getDate();
  let hour = dat.getHours() < 10 ? "0" + dat.getHours() : dat.getHours();
  let min = dat.getMinutes() < 10 ? "0" + dat.getMinutes() : dat.getMinutes();
  let seon = dat.getSeconds() < 10 ? "0" + dat.getSeconds() : dat.getSeconds();

  let newDate = ''
  if (type === 'date') {
    newDate = year + "-" + mon + "-" + data;
  } else if (type === 'time') {
    newDate = hour + ":" + min + ":" + seon;
  } else {
    newDate = year + "-" + mon + "-" + data + " " + hour + ":" + min + ":" + seon;
  }
  return newDate;
};

// 计算两天日期的间隔天数
export const getDaysBetweenTwoDate = (date1: string, date2: string) => {
  const formatDate1 = formatDate(new Date(date1), 'date');
  const formatDate2 = formatDate(new Date(date2), 'date');
  const aDayMillisecond = 24 * 60 * 60 * 1000;
  return Math.abs(Math.ceil(((new Date(formatDate1).getTime()) - (new Date(formatDate2).getTime())) / aDayMillisecond)) + 1;
}

// 获取当前日期的前某天的日期
export const getDayBeforeCurDay = (gap: number) => {
  const aDayMillisecond = 24 * 60 * 60 * 1000;
  const cur = Date.now()
  const dayBefore = new Date(cur - gap * aDayMillisecond)
  return formatDate(dayBefore, 'date')
}

// 获取前某天到当前日期的日期列表
export const getBeforeDaysToCurDay = (gap: number) => {
  const aDayMillisecond = 24 * 60 * 60 * 1000;
  const cur = Date.now()
  let dayBefore: string[] = []
  for (let i = gap - 1; i >= 0; i--) {
    dayBefore.push(formatDate(new Date(cur - i * aDayMillisecond), 'date'))
  }
  return dayBefore
}

export const saveJsonFile = (data: object) => {
  // 创建Blob对象
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });

  // 创建下载链接并模拟点击下载
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `extension-d-${Date.now()}.json`;
  link.click();

  // 释放URL对象
  URL.revokeObjectURL(url);
}

// 获取所有的可选的词典类型
export const getDictTypes = (): DictType[] => {
  return ['bing', 'youdao', 'collins', 'jinshan', 'longman', 'cambridge', 'webster', 'oxford', 'vocabulary', 'wordreference', 'haici']
}