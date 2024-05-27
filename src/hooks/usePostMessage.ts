// import { onMounted, onUnmounted, ref } from "vue";
// import type { Ref } from "vue";

// export default function usePostMessage(eventType: string) {

//   onMounted(() => {
//     addEventListener("message", getMessageFn);
//   })

//   onUnmounted(() => {
//     removeEventListener("message", getMessageFn);
//   })
//   function getMessageFn(ev: { data: ReqData<{ [k: string]: any;}> }) {
//     if (!ev.data.type) {
//       return false;
//     }
//     if (ev.data.type === "info:word-desc") {
//       console.log(ev.data);
//       if (ev.data.data.type) {
//         // TODO：加上！表示对象已定义，不然会报未定义的错误
//         // TODO:这里第一次初始化时会报错
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
//       }
//     }
//   }

// }