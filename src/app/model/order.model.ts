export interface WorksheetOrder {
  orderId: string;
  orderedOn: string;
  Amount: string;
  state: string;
}

export interface StudentOrdersResponse {
  result: {
    worksheetOrders: WorksheetOrder[];
  };
}