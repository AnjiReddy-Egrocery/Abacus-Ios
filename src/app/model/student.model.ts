export interface StudentTotalDetails {
  status: string;
  errorCode: string;
  message: string;
  imageUrl: string;
  result: StudentResult;
}

export interface StudentResult {
  studentId: string;
  mId?: string;

  firstName: string;
  middleName?: string;
  lastName: string;

  dateOfBirth: string;
  dobMonth?: string;
  dobDate?: string;

  gender: string;
  age?: string;

  motherTongue: string;

  profilePic: string;

  fatherName?: string;
  fatherMobile?: string;
  fatherQualification?: string;
  fatherOccupation?: string;

  motherName?: string;
  motherMobile?: any;
  motherQualification?: string;
  motherOccupation?: string;

  parentEmail?: string;

  joinDate?: string;
  emailId?: any;

  schoolName?: any;
  schoolMobile?: any;
  schoolAddress?: any;

  courseTypeId?: any;
  subCourseTypeId?: any;
  courseLevelId?: any;

  cityName?: any;
  stateId?: any;

  status?: string;
}