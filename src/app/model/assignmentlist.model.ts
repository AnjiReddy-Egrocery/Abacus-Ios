export interface AssignmentListResponse {
  status: string;
  errorCode: string;
  message: string;
  emptyTopicsessage: string;
  result: Result;
}

export interface Result {
  dateId: string;
  batchId: string;
  scheduleDate: string;
  scheduleTopics: string;
  scheduleAssignmentTopics: string;
  startDate: string;
  scheduleStartTime: string;
  scheduleEndTime: string;
  batchName: string;
  courseTypeId: string;
  subCourseTypeId: string;
  courseLevelId: string;
  assignmentsList: Assignment[];
}

export interface Assignment {
  topicId: string;
  courseTypeId: string;
  subCourseTypeId: string;
  courseLevelId: string;
  topicName: string;
  formulaName: string;
  practicesCount: number;
}