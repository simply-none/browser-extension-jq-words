/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<typeof DefineComponent>;
  export default component;
}

type DictType = 'youdao' | 'bing' | 'collins'

type CacheOrigin = {
  href: string;
  example: string;
}

type WordCache = {
  word: string,
  origin: cacheOrigin[],
  HTML: string;
  trans: string[];
  phonetic: string[];
  // 变形
  morph: string[];
}

type WordSimplyCacheType = 'trans' | 'phonetic' | 'morph'