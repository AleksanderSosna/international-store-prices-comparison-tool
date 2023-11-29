export type IkeaProductPageMessage = {
  request: 'productId and productNo and productPrice and countryCode'
}

export type IkeaProductPageResponse = {
  productId: string;
  productNo: string;
  productPrice: number;
  countryCode: string;
}
