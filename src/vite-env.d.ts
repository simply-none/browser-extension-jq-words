/// <reference types="vite/client" />
// declare module "*.vue" {
//   // import type { DefineComponent } from "vue";
//   // const component: DefineComponent<typeof DefineComponent>;
//   // export default component;

//   import { Component } from "vue";
//   const component: Component;
//   export default component;
// }

type AnyTypeObj = { [key: string]: any }

type CallbackOptions = {
  onSuccess?: (res: any) => void;
  onError?: (err: any) => void;
}

type DictType =
  'youdao' |
  'bing' |
  'collins' |
  'jinshan' |
  'longman' |
  'cambridge' |
  'webster' |
  'oxford' | 
  'vocabulary' |
  'wordreference' | 
  'haici'

type CacheOrigin = {
  href: string;
  example: string;
  date: string;
}

type WordCache = {
  word: string,
  origin: cacheOrigin[],
  HTML: string;
  trans: string[];
  phonetic: string[];
  // 变形
  morph: string[];
  sound: string[];
}

interface WordList {
  [W in DictType]: {
    type: string;
    data: string;
    name: string;
    expand: boolean;
  }
}

interface ReqData<T> {
  type: 'error' | `info:${string}` | `req:${string}`;
  data: T;
}

type WordSimplyCacheType = 'trans' | 'phonetic' | 'morph' | 'sound'

type StorageType = 'history'