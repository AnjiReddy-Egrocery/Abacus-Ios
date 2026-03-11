export interface DatedetailsResponse {
  status: string;
  errorCode: string;
  message: string;
  result: BatchResult[];
}

export interface BatchResult {
  batchId: string;
  courseType: string;
  subCourseType: string;
  courseLevel: string;
  batchName: string;
  instructorName: string;
  startDate: string;
  startTime: string;
  endTime: string;
  dates: BatchDate[];
}

export interface BatchDate {
  dateId: string;
  batchId: string;
  scheduleDate: string;
  scheduleTopics: any;
  scheduleAssignmentTopics: any;
  topicsCount: number;
  assignmentTopicsCount: number;
}