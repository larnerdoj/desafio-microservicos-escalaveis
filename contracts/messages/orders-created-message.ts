export interface OrderCreatedMessage {
  orderId: string;
  customerId: {
    id: string;
  };
  amount: number;
}