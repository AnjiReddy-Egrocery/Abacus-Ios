export class CoursesListResponse {

  status!: string;
  errorCode!: string;
  message!: string;

  result!: CourseResult[];

}

export class CourseResult {

  courseTypeId!: string;
  courseType!: string;
  subCourseType!: string;
  courseLevel!: string;

}