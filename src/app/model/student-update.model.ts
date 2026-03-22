export interface StudentUpdateProfile {
  status: string;
  errorCode: string;
  message: string;
  imageUrl: string;
  result: Result;
}

export interface Result {
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
}