// import { onMounted, onUnmounted, ref } from "vue";
// import type { Ref } from "vue";

// export default function useSelectedWordTypes(word: string) {

//   const wordTypes: DictType[] = ['bing', 'youdao', 'collins', 'jinshan', 'longman', 'cambridge', 'webster', 'oxford', 'vocabulary', 'wordreference', 'haici']
//   let selectedWordTypes: Ref<DictType[]> = ref([]);

//   onMounted(() => {
//     addEventListener("message", getMessageFn);
//   })

//   onUnmounted(() => {
//     removeEventListener("message", getMessageFn);
//   })
//   function getMessageFn(ev: { data: ReqData<ReqDataType> }) {
//     if (!ev.data.type) {
//       return false;
//     }
//     let total = Object.keys(selectedWordList).length;
//     console.log(total, ev, "total");
//     if (ev.data.type === "info:word-desc") {
//       console.log(ev.data);
//       total--;
//       console.log(total, "total2");
//       if (ev.data.data.type) {
//         // TODO：加上！表示对象已定义，不然会报未定义的错误
//         // TODO:这里第一次初始化时会报错
//         if (!selectedWordList[ev.data.data.type]) {
//           selectedWordList[ev.data.data.type] = {} as WordItem;
//         }
//         selectedWordList[ev.data.data.type]!.data = ev.data.data.text;
//       }

//       if (ev.data.data.status === "close") {
//         console.log("连接已关闭");
//       }
//     }
//     if (ev.data.type === "info:storage-get") {
//       console.log(ev.data, "缓存数据");
//     }

//     if (ev.data.type === "info:get-select-dictTypes") {
//       console.log(ev.data, "info:get-select-dictTypes");
//       let storage = ev.data.data.storage;
//       if (!storage) {
//         window.postMessage(
//           {
//             type: "req:storage",
//             data: {
//               type: "set",
//               word: "setting:selectedWordTypes",
//               storage: ["youdao", "bing", "longman"],
//             },
//           },
//           "*"
//         );
//       } else {
//         selectedWordTypes.value = JSON.parse(storage);
//       }
//     }
//   }

//   return { selectedWordTypes }
// }