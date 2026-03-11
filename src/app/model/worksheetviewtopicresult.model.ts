export interface AllocatedResultResponse {
  status: string;
  errorCode?: string;
  message?: string;
  result?: AllocatedResult;
}

export interface AllocatedResult {
  practiceId?: string;
  examRnm?: string;
  studentId?: string;
  topicId?: string;
  questionsList?: string; // this is probably JSON string, parse if needed
  startedOn?: string;
  submitedOn?: string;
  practiceStatus?: string;
  topicName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
}