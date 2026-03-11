export interface AllocatedPractice {
  practiceId: string;
  examRnm: string;
  studentId: string;
  topicId: string;
  startedOn: string;
  submitedOn: string;
  practiceStatus: string;
  topicName: string;
  questionsList?: any;
}

export interface AllocatedTopicResult {
  topicId: string;
  courseTypeId: string;
  courseLevelId: string;
  topicName: string;
  formulaName: string;
  practicesList: AllocatedPractice[];
}

export interface AllocatedViewResponse {
  status: string;
  errorCode: string;
  message: string;
  result?: AllocatedTopicResult;
}