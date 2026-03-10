export interface AllocatedTopicExamResponse {
 status: string;
  errorCode: string;
  message: string;
  result: ExamResult;
}
export interface ExamResult {
  practiceId: string;
  examRnm: string;
  studentId: string;
  topicId: string;
  topicName: string;
  questionsList: Question[];
}
export interface Question {
  id: string;
  question: string;

  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;

  correctAnswer: string;
}