export type Paginator<T> = {
  data: T;
  total: number;
  limit: number;
  offset: number;
};
