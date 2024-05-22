interface ReqData<T> {
  type: 'error' | `info:${string}` | `req:${string}`;
  data: T;
}