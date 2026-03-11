export interface BachDetailsResponse {
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
}