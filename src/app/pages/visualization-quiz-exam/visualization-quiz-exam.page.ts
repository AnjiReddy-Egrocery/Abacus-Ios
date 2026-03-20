import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { QuizData } from 'src/app/model/quiz-data.model';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-visualization-quiz-exam',
   imports: [IonicModule, FormsModule, CommonModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './visualization-quiz-exam.page.html',
  styleUrls: ['./visualization-quiz-exam.page.scss'],
})
export class VisualizationQuizExamPage implements OnInit {
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

  displayText: string = '';          // For showing each number/operator


isButtonsEnabled: boolean = false; // buttons start disabled during TTS
isQuestionActive: boolean = false; // TTS running

  constructor(private router: Router, private route: ActivatedRoute, private alertCtrl: AlertController) {}

  ngOnInit() {
    // Fetch quiz data from route params
   const state = history.state;
  this.questions = state.questions || [];
  this.correctAnswers = state.answers || [];

  this.answers = new Array(this.questions.length).fill('');
  this.quizData = this.questions.map((q, i) => ({
    question: q,
    correctAnswer: this.correctAnswers[i],
    enterAnswer: '',
    isCorrect: false,
    status: '',
    timeTaken: 0
  }));

  setTimeout(() => {
  this.speakQuestionWithTTS();
}, 300);

  this.setHeaderTitle(this.questions[0]);
  this.startTotalTimer();
  this.startQuestionTimer();
  }

  get currentQuestion() {
    return this.questions[this.currentIndex] || '';
  }

  goHome(){
    this.router.navigate(['/visualization-playwith-numbers']);
  }
async speakQuestionWithTTS() {
  const question = this.currentQuestion;
  if (!question) return;

  this.isQuestionActive = true;
  this.isButtonsEnabled = false; // disable buttons while TTS runs
  this.displayText = '';

  const elements = question.split(/\s+/);

  for (let i = 0; i < elements.length; i++) {
    let clean = elements[i].trim();
    if (!clean) continue;

    let speakText = '';
    let displayText = '';

    if (clean.startsWith('+')) {
      const num = clean.substring(1);
      speakText = `plus ${num}`;
      displayText = `+${num}`;
    } else if (clean.startsWith('-')) {
      const num = clean.substring(1);
      speakText = `minus ${num}`;
      displayText = `-${num}`;
    } else if (clean.startsWith('*')) {
      const num = clean.substring(1);
      speakText = `multiply by ${num}`;
      displayText = `*${num}`;
    } else if (clean.startsWith('/')) {
      const num = clean.substring(1);
      speakText = `divide by ${num}`;
      displayText = `/${num}`;
    } else {
      speakText = `plus ${clean}`;
      displayText = `+${clean}`;
    }

    this.displayText = displayText;

    await TextToSpeech.speak({
      text: speakText,
      lang: 'en-US',
      rate: 1.0
    });

   
  }

  // ✅ At the end, say “Answer is” and enable buttons
  this.displayText = 'Answer is';
  await TextToSpeech.speak({ text: 'Answer is', lang: 'en-US' });

  this.isQuestionActive = false;   // TTS finished
  this.isButtonsEnabled = true;    // buttons now enabled
}

 setHeaderTitle(question: string) {
  // Split numbers from operators
  const parts = question.split(/[\+\-\*\/]/).map(p => p.trim()); // array of numbers as strings
  const operatorMatch = question.match(/[\+\-\*\/]/); // first operator only

  if (parts.length >= 2 && operatorMatch) {
    const op = operatorMatch[0]; // '+', '-', '*', '/'

    // Map each number to its digit type
    const digits = parts.map(n => {
      const num = Number(n);
      if (num < 10) return '1-digit';
      if (num < 100) return '2-digit';
      if (num < 1000) return '3-digit';
      if (num < 10000) return '4-digit';
      return 'number';
    });

    const titleOp = {
      '+': 'Add',
      '-': 'Subtract',
      '*': 'Multiply',
      '/': 'Divide'
    }[op] || 'Play with Numbers';

    // Join the digit labels with the operator symbol
    this.headerTitle = `${titleOp} ${digits.join(` ${op} `)}`;
  } else {
    this.headerTitle = 'Play with Numbers';
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
    if (this.isQuestionActive) return; // prevent clicking during TTS
    this.saveCurrentAnswer();
    if (this.currentIndex < this.quizData.length - 1) {
      this.currentIndex++;
      this.answer = this.quizData[this.currentIndex].enterAnswer || '';
      this.startQuestionTimer();
      this.setHeaderTitle(this.quizData[this.currentIndex].question);
      setTimeout(() => {
      this.scrollToActiveStep();
      this.speakQuestionWithTTS(); // 🔹 speak question automatically
    }, 50);
    } else this.submitQuiz();
  }

  previousQuestion() {
     if (this.isQuestionActive) return;
    this.saveCurrentAnswer();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.answer = this.quizData[this.currentIndex].enterAnswer || '';
      this.startQuestionTimer();
      this.setHeaderTitle(this.quizData[this.currentIndex].question);
      setTimeout(() => {
      this.scrollToActiveStep();
      this.speakQuestionWithTTS(); // 🔹 speak question automatically
    }, 50);
    }
  }

  goToQuestion(i: number) {
    this.saveCurrentAnswer();
    this.currentIndex = i;
    this.answer = this.quizData[i].enterAnswer || '';
    this.startQuestionTimer();
    this.setHeaderTitle(this.quizData[i].question);
     setTimeout(() => {
    this.scrollToActiveStep();
    this.speakQuestionWithTTS();
  }, 50);
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
    if (stepArray[this.currentIndex]) stepArray[this.currentIndex].nativeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  async submitQuiz() {
     if (this.isQuestionActive) return;
    this.saveCurrentAnswer();
    clearInterval(this.timerInterval);
    clearInterval(this.questionTimerInterval);

    const alert = await this.alertCtrl.create({
      header: 'Quiz Completed',
      message: 'Do you want to submit your answers?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Submit', handler: () => this.showReport() }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

 showReport() {
  console.log('Quiz Data:', this.quizData);

  // navigate and pass quizData and totalTime
  this.router.navigate(['/visualization-quiz-exam-result'], {
    state: {
      quizData: this.quizData,   // all questions
      totalTime: this.totalTime, // total timer
                       // optional, current level
    }
  });
}

splitQuestion(q: string): string[] {
  return (q.match(/[+-]?\d+|\d+/g) || []) as string[];
}
}