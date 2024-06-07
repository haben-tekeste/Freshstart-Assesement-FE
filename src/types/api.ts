export type Item = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export type itemApiResponse = {
  message: string;
  items: Item[];
  rows?: number;
};
