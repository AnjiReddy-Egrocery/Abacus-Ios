export interface CourseTypeResponse {
  status: string;
  errorCode: string;
  message: string;
  result: CourseType[];
}

export interface CourseType {
  courseTypeId: string;
  courseType: string;
  courseCode: string;
  courseLevels: CourseTypeLevel[];
}

export interface CourseTypeLevel {
  courseLevelId: string;
  courseLevel: string;
  courseType: string;
  courseLevelTopics: CourseLevelTopic[];
  courseLevelAssignmentTopics: CourseLevelAssignmentTopic[];
}

export interface CourseLevelTopic {
  topicId: string;
  topic: string;
}

export interface CourseLevelAssignmentTopic {
  topicId: string;
  topic: string;
}