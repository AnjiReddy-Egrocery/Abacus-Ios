export interface OrderListResponse {
  status: string;
  errorCode: string;
  message: string;
  emptyAssignmentTopicsessage: string;
  result: Result;
}

export interface Result {
  orderId: string;
  studentId: string;
  price: string;
  orderedOn: string;
  merchantRefNo: string;
  paymentID: string;
  paymentMethod: string;
  transactionID: string;
  amount: string;
  paymentThrough: string;
  dateCreated: string;
  status: string;
  courseTypes: CourseType[];
}

export interface CourseType {
  courseTypeId: string;
  courseType: string;
}