import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { QUESTIONS } from 'src/app/data/questions-data';

@Component({
  selector: 'app-game-levels',
  standalone: true,
      imports: [IonicModule, FormsModule, CommonModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
        
  templateUrl: './game-levels.page.html',
  styleUrls: ['./game-levels.page.scss'],
})
export class GameLevelsPage {
  @ViewChild('scrollArea') scrollArea!: ElementRef;
  @ViewChildren('stepItem') stepItems!: QueryList<ElementRef>;

  questions: string[] = [];
  currentIndex = 0;

  answer: string = '';          // current input
  answers: string[] = [];       // store all answers

  isAnswered: boolean[] = [];
  totalSeconds = 0;
  timerInterval: any;
  totalTime = '00:00:00';

  questionSeconds = 0;
  questionTimerInterval: any;
  questionTime = '00:01';
  questionTimes: number[] = []; // store each question time

  levelNumber = '1';

  constructor(private route: ActivatedRoute,private router: Router, private alertCtrl: AlertController) {}

  ngOnInit() {
    const levelParam = this.route.snapshot.paramMap.get('level') || '1';
    this.levelNumber = levelParam.replace('Level-', '');

    const key = ('level' + this.levelNumber) as keyof typeof QUESTIONS;
    this.questions = QUESTIONS[key] || [];

    this.isAnswered = new Array(this.questions.length).fill(false);
    this.answers = new Array(this.questions.length).fill('');
    this.questionTimes = new Array(this.questions.length).fill(0);

    this.startQuestionTimer();
    this.startTimer();
  }

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  nextQuestion() {
    // Save current answer
      // Save current answer
  this.answers[this.currentIndex] = this.answer;
  this.isAnswered[this.currentIndex] = this.answer.trim() !== '';
  this.questionTimes[this.currentIndex] = this.questionSeconds;

  // Check if there is a next question
  if (this.currentIndex < this.questions.length - 1) {
    // Move to next question
    this.currentIndex++;
    this.answer = this.answers[this.currentIndex] || '';
    this.startQuestionTimer();
    setTimeout(() => this.scrollToActiveStep(), 50);
  } else {
    // Last question reached → navigate to another page
    console.log('All questions completed!');
    
    // Example: navigate to "exam-result" page and pass answers & times
    this.router.navigate(['/exam-result'], {
      state: { answers: this.answers, times: this.questionTimes }
    });
  }

  }

  prevQuestion() {
    // Save current answer
    this.answers[this.currentIndex] = this.answer;
    this.isAnswered[this.currentIndex] = this.answer.trim() !== '';
    this.questionTimes[this.currentIndex] = this.questionSeconds;

    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.answer = this.answers[this.currentIndex] || '';
      this.startQuestionTimer();
      setTimeout(() => this.scrollToActiveStep(), 50);
    }
  }

  goToQuestion(i: number) {
    // Save current answer
    this.answers[this.currentIndex] = this.answer;
    this.isAnswered[this.currentIndex] = this.answer.trim() !== '';

    // Move to clicked question
    this.currentIndex = i;
    this.answer = this.answers[this.currentIndex] || '';

    // Restart question timer
    this.startQuestionTimer();

    // Scroll step into view
    setTimeout(() => this.scrollToActiveStep(), 50);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.totalSeconds++;
      const hrs = Math.floor(this.totalSeconds / 3600);
      const mins = Math.floor((this.totalSeconds % 3600) / 60);
      const secs = this.totalSeconds % 60;
      this.totalTime = `${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;
    }, 1000);
  }

  startQuestionTimer() {
    clearInterval(this.questionTimerInterval);

    this.questionSeconds = this.questionTimes[this.currentIndex] || 0;
    this.updateQuestionTimeUI();

    this.questionTimerInterval = setInterval(() => {
      this.questionSeconds++;
      this.updateQuestionTimeUI();
    }, 1000);
  }

  updateQuestionTimeUI() {
    const mins = Math.floor(this.questionSeconds / 60);
    const secs = this.questionSeconds % 60;
    this.questionTime = `${this.pad(mins)}:${this.pad(secs)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  scrollLeft() {
    this.scrollArea.nativeElement.scrollBy({ left: -80, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollArea.nativeElement.scrollBy({ left: 80, behavior: 'smooth' });
  }

  scrollToActiveStep() {
     const stepArray = this.stepItems.toArray();

  // Only scroll if NOT last question
  if (stepArray[this.currentIndex] && this.currentIndex < this.questions.length - 1) {
    stepArray[this.currentIndex].nativeElement.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }
}

  submitExam() {
     clearInterval(this.questionTimerInterval);
    this.showCompletionPopup();
  }

  async showCompletionPopup() {
  const alert = await this.alertCtrl.create({
    header: 'Level-1 Completed',
    message: 'Are you sure you want to submit the Play with Number Game? You will not be able to modify anything after submitting.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Submission cancelled');
        }
      },
      {
        text: 'OK',
        handler: () => {
          this.showReportActivity();
        }
      }
    ],
    backdropDismiss: false
  });

  await alert.present();
}

showReportActivity() {
  const originalAnswers = this.questions.map(q => this.generateOriginalAnswer(q));

  const reportData = {
    questions: this.questions,
    enteredAnswers: this.answers,
    isQuestionAttempted: this.isAnswered.map(ans => ans ? 'true' : 'false'),
    isQuestionCorrect: this.isAnswered.map(ans => ans ? 'true' : 'false'), // Replace with your correctness logic
    originalAnswers: originalAnswers,
    questionTimes: this.questionTimes,
    totalTime: this.totalTime,
    level: this.levelNumber
  };

  console.log('Report Data:', reportData);

  this.router.navigate(['/exam-result'], { state: { report: reportData } });
}

generateOriginalAnswer(question: string): string {
  let originalAnswers: string[] = [];
  const levelValue = Number(this.levelNumber); // Android getLevelValue()

  switch(levelValue) {
    case 1:
      originalAnswers = ["5", "6", "5", "8", "0", "8", "9", "8", "4", "9",
                         "5", "6", "3", "1", "7", "1", "1", "16", "14", "11"];
      break;
    case 2:
      originalAnswers = ["5", "5", "4", "0", "5", "0", "2", "17", "10", "79",
                         "25", "15", "22", "10", "33", "12", "78", "126", "172", "88"];
      break;
    case 3:
      originalAnswers = ["7","8","7","6","6","8","9","9","6","1",
                         "1","12","15","12","3","3","5","8","3","3"];
      break;
    case 4:
      originalAnswers = ["30","42","54","42","63","400","252","51","312","384",
                         "425","210","162","122","432","536","192","792","435","296"];
      break;
    case 5:
      originalAnswers = ["335","175","95","216","150","396","315","1920","357","5369",
                         "858","740","660","2303","1340","4500","4168","6232","4548","2608"];
      break;
    default:
      originalAnswers = ["No answers available"];
  }

  const questionIndex = this.questions.indexOf(question);
  if (questionIndex >= 0 && questionIndex < originalAnswers.length) {
    return originalAnswers[questionIndex];
  } else {
    return "";
  }
}


  splitQuestion(question: string): string[] { return question.match(/[+-]?\d+|\d+/g) || []; }
}
