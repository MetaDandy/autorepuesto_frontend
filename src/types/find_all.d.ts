export type FindAll<T> = {
  page: number;
  limit: number;
  totalCount: number;
  hasMore: boolean;
  data: T[];
}