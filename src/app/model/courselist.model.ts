export interface CourseListResponse {
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
  courseLevels: CourseLevels[];
}

export interface CourseLevels {
  courseLevelId: string;
  courseLevel: string;
}