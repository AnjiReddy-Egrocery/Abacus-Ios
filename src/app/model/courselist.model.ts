export interface CourseListResponse {
  status: string;
  errorCode: string;
  message: string;
  emptyAssignmentTopicsessage: string;
  result: Result[];
}

export interface Result {
  orderId: string;
  courseTypeId: string;
 courseType: string;
  courseLevels: CourseLevels[];
}

export interface CourseLevels {
  courseLevelId: string;
  courseLevel: string;
}