export interface AllocatedWorksheetSubmitResponse {
  status: string;
  errorCode: string;
  message: string;
  result: {
    practiceId: string;
    examRnm: string;
    studentId: string;
    instructorId: string;
    topicId: string;
    questionsList: string;
    startedOn: string;
    submitedOn: string;
    practiceStatus: string;
    topicName: string;
    firstName: string;
    middleName: string;
    lastName: string;
  };
}