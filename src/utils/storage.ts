/**
 * 内容缓存函数
 * @param key 
 * @param value 
 * @param options 
 */
export function setLocalStorage(key: string, value: any, options?: CallbackOptions): void;
export function setLocalStorage(value: AnyTypeObj, options?: CallbackOptions): void;
export function setLocalStorage(key: string | AnyTypeObj, value?: any, options?: CallbackOptions) {
  let data: AnyTypeObj = {}
  if (typeof key === 'string') {
    data[key] = value
    chrome.storage.local.set(data).then(res => {
      options?.onSuccess && options.onSuccess(res)
    }).catch(e => {
      console.log(e, '缓存设置失败')
      options?.onError && options.onError(e)
    })
  } else {
    data = key
    chrome.storage.local.set(data).then(res => {
      value?.onSuccess && value.onSuccess(res)
    }).catch(e => {
      console.log(e, '缓存设置失败')
      value?.onError && value.onError(e)
    })
  }
}

/**
 * 获取缓存函数 此处无异步调用，均为同步
 * @param key 
 */
export async function getLocalStorage(key?: string | string[]) {
  let storage: AnyTypeObj = {}
  if (typeof key === 'string' || Array.isArray(key)) {
    await chrome.storage.local.get(key).then(res => {
      console.log(res, '缓存获取成功')
      storage = res
    }).catch(e => {
      console.log(e, '缓存获取失败')
    })
  } else {
    await chrome.storage.local.get().then(res => {
      console.log(res, '缓存获取成功')
      storage = res
    }).catch(e => {
      console.log(e, '缓存获取失败')
    })
  }
  return storage
}
