export interface StudentTotalDetails {
  status: string;
  errorCode: string;
  message: string;
  imageUrl: string;
  result: StudentResult;
}

export interface StudentResult {
  studentId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  motherTongue: string;
  profilePic: string;
  fatherName: string;
  motherName: string;

  fatherMobile?: string;
  motherMobile?: any;
  parentEmail?: string;
  age?: string;
}