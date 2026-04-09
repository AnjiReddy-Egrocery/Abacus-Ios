import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { QuizData } from 'src/app/model/quiz-data.model';

@Component({
  selector: 'app-quizexam',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './quizexam.page.html',
  styleUrls: ['./quizexam.page.scss'],
})
export class QuizexamPage implements OnInit {

 @ViewChild('scrollArea') scrollArea!: ElementRef;
  @ViewChildren('stepItem') stepItems!: QueryList<ElementRef>;

  questions: string[] = [];
  correctAnswers: string[] = [];
  answers: string[] = [];
  quizData: QuizData[] = [];

  currentIndex = 0;
  answer: string = '';
  headerTitle: string = '';

  totalSeconds = 0;
  timerInterval: any;
  totalTime = '00:00:00';

  questionSeconds = 0;
  questionTimerInterval: any;
  questionTime = '00:00';

  selectedOperation: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private alertCtrl: AlertController) {}

  ngOnInit() {
    // Fetch quiz data from route params
   const state = history.state;
  this.questions = state.questions || [];
  this.correctAnswers = state.answers || [];

  this.selectedOperation = state.operation || '';

  this.answers = new Array(this.questions.length).fill('');
  this.quizData = this.questions.map((q, i) => ({
    question: q,
    correctAnswer: this.correctAnswers[i],
    enterAnswer: '',
    isCorrect: false,
    status: '',
    timeTaken: 0
  }));

  this.setHeaderTitle();
  this.startTotalTimer();
  this.startQuestionTimer();
  }

  get currentQuestion() {
    return this.questions[this.currentIndex] || '';
  }

  goHome(){
    this.router.navigate(['/playwithnumbers']);
  }

 setHeaderTitle() {

  if (this.selectedOperation === 'Multiplication') {
    this.headerTitle = 'Multiplication with Two Rows';
    return;
  }

  if (this.selectedOperation === 'Addition') {

    // current question ni use cheyyadam better
    const question = this.currentQuestion;

    const count = question.split('+').length;

    const numberWords: any = {
      1: 'One',
      2: 'Two',
      3: 'Three',
      4: 'Four',
      5: 'Five',
      6: 'Six',
      7: 'Seven',
      8: 'Eight',
      9: 'Nine',
      10: 'Ten'
    };

    const word = numberWords[count] || count;

    this.headerTitle = `Addition with ${word} Rows`;
  }
}

  onAnswerChange(event: any) { this.answer = event.target.value ? event.target.value.toString() : ''; }

  saveCurrentAnswer() {
    const cur = this.quizData[this.currentIndex];
    cur.enterAnswer = this.answer;
    cur.timeTaken = this.questionSeconds;
    cur.isCorrect = Number(this.answer) === Number(cur.correctAnswer);
    cur.status = cur.isCorrect ? 'correct' : 'wrong';
    this.questionSeconds = 0;
  }

  nextQuestion() {
    this.saveCurrentAnswer();
    if (this.currentIndex < this.quizData.length - 1) {
      this.currentIndex++;
      this.answer = this.quizData[this.currentIndex].enterAnswer || '';
      this.startQuestionTimer();
      this.setHeaderTitle();
      setTimeout(() => this.scrollToActiveStep(), 50);
    } else this.submitQuiz();
  }

  previousQuestion() {
    this.saveCurrentAnswer();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.answer = this.quizData[this.currentIndex].enterAnswer || '';
      this.startQuestionTimer();
      this.setHeaderTitle();
      setTimeout(() => this.scrollToActiveStep(), 50);
    }
  }

  goToQuestion(i: number) {
    this.saveCurrentAnswer();
    this.currentIndex = i;
    this.answer = this.quizData[i].enterAnswer || '';
    this.startQuestionTimer();
    this.setHeaderTitle();
    setTimeout(() => this.scrollToActiveStep(), 50);
  }

  startTotalTimer() {
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
    this.questionSeconds = this.quizData[this.currentIndex]?.timeTaken || 0;
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

  pad(num: number) { return num < 10 ? '0' + num : num.toString(); }

  scrollLeft() { this.scrollArea.nativeElement.scrollBy({ left: -80, behavior: 'smooth' }); }
  scrollRight() { this.scrollArea.nativeElement.scrollBy({ left: 80, behavior: 'smooth' }); }

  scrollToActiveStep() {
   const stepArray = this.stepItems.toArray();

  if (stepArray[this.currentIndex]) {
    const container = this.scrollArea.nativeElement;
    const activeEl = stepArray[this.currentIndex].nativeElement;

    const containerWidth = container.offsetWidth;
    const elementLeft = activeEl.offsetLeft;
    const elementWidth = activeEl.offsetWidth;

    // center position calculate
    let scrollPosition = elementLeft - (containerWidth / 2) + (elementWidth / 2);

    // boundary fix (last question left shift avvakunda)
    const maxScroll = container.scrollWidth - containerWidth;
    scrollPosition = Math.max(0, Math.min(scrollPosition, maxScroll));

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }
}

  async submitQuiz() {
    this.saveCurrentAnswer();
    clearInterval(this.timerInterval);
    clearInterval(this.questionTimerInterval);

    const alert = await this.alertCtrl.create({
      header: 'Quiz Completed',
      message: 'Do you want to submit your answers?',
      buttons: [
        { 
          text: 'Cancel', 
          role: 'cancel' ,
           handler: () => {
          console.log('Submission cancelled');
           this.startTotalTimer();
          this.startQuestionTimer();
        }
        },
        { text: 'Submit', handler: () => this.showReport() }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

 showReport() {
  console.log('Quiz Data:', this.quizData);

  // navigate and pass quizData and totalTime
  this.router.navigate(['/start-game-result-page'], {
    state: {
      quizData: this.quizData,   // all questions
      totalTime: this.totalTime, // total timer
       headerTitle: this.headerTitle 
                       // optional, current level
    }
  });
}

splitQuestion(q: string): string[] {
  const parts = q.split(/(\+|\-|\*|\/)/).map(x => x.trim()).filter(x => x);

  const result: string[] = [];

  for (let i = 0; i < parts.length; i++) {

    if (i === 0) {
      // first number
      result.push(parts[i]);
    } else if (['+', '-', '*', '/'].includes(parts[i])) {
      // combine operator + next number
      const combined = parts[i] + parts[i + 1];
      result.push(combined);
      i++; // skip next number (already used)
    }
  }

  return result;
}
}