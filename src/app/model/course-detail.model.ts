export interface DurationListResponse {
  status: string;
  errorCode: string;
  message: string;
  result: DurationResult[];
}

export interface DurationResult {
  durationId: string;
  duration: string;
}

export interface CourseLevelResponse {
  status: string;
  errorCode: string;
  message: string;
  result: CourseLevelResult;
}

export interface CourseLevelResult {
  courseTypeId: string;
  courseType: string;
  courseCode: string;
  courseLevels: CourseLevel[];
}

export interface CourseLevel {
  courseLevelId: string;
  courseLevel: string;
  courseLevelAmounts?: CourseLevelAmount[];
  price?: number;
  selected?: boolean;
}
export interface CourseLevelAmount {
  durationId: string;
  amount: string;
}
