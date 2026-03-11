export interface CourseLevelTopicResponse {
  status: string;
  errorCode: string;
  message: string;
  result: TopicResult;
}

export interface TopicResult {
  courseLevelId: string;
  courseLevel: string;
  courseLevelTopics: CourseLevelTopics[];
}

export interface CourseLevelTopics {
  topicId: string;
  topic: string;
}