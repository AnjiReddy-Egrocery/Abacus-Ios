export interface QuizData {
  question: string;
  enterAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;    // changed from string
  status: string;
  timeTaken: number;
}