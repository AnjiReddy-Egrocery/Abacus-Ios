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
   @ViewChild('answerInput', { static: false }) answerInput!: any;

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

  displayText: string = ''; 
  selectedOperation: string = '';         // For showing each number/operator


isButtonsEnabled: boolean = false; // buttons start disabled during TTS
isQuestionActive: boolean = false; // TTS running

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

  setTimeout(() => {
  this.speakQuestionWithTTS();
}, 300);

  this.setHeaderTitle();
  this.startTotalTimer();
 // this.startQuestionTimer();
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
  this.isButtonsEnabled = false;



  const elements = this.splitQuestion(question);

  this.displayText = ''; // reset

  for (let i = 0; i < elements.length; i++) {
    let clean = elements[i].trim();
    if (!clean) continue;

    let speakText = '';
    let displayPart = '';

    if (clean.startsWith('+')) {
      const num = clean.substring(1);
      speakText = `plus ${num}`;
      displayPart = `+${num}`;
    }
    else if (clean.startsWith('-')) {
      const num = clean.substring(1);
      speakText = `minus ${num}`;
      displayPart = `-${num}`;
    }
    else if (clean.startsWith('*')) {
      const num = clean.substring(1);
      speakText = `multiply by ${num}`;
      displayPart = `*${num}`;
    }
    else if (clean.startsWith('/')) {
      const num = clean.substring(1);
      speakText = `divide by ${num}`;
      displayPart = `/${num}`;
    }
    else {
      speakText = clean;
      displayPart = clean;
    }

    // ✅ SHOW each step (Android la)
    this.displayText = displayPart;

    await TextToSpeech.speak({
      text: speakText,
      lang: 'en-US',
      rate: 1.0
    });

    await new Promise(res => setTimeout(res, 500));
  }

  // ✅ 🔥 LAST STEP → Replace with "Answer is"
  this.displayText = 'Answer is';

  await TextToSpeech.speak({
    text: 'Answer is',
    lang: 'en-US'
  });

    

  // ✅ Enable input
  this.isQuestionActive = false;
  this.isButtonsEnabled = true;

  this.focusAnswerInput();

  this.startQuestionTimer();

  
}

repeatQuestion() {
  // ❌ TTS running unte repeat allow cheyyakudadhu
  if (this.isQuestionActive) return;

  

  // 🔄 Reset timer


  // 🧹 Clear display
  this.displayText = '';

  // 🔁 Re-play same question (TTS + UI flow)
  this.speakQuestionWithTTS();
}

focusAnswerInput() {
  setTimeout(() => {
    if (this.answerInput) {
      this.answerInput.setFocus(); // ✅ focus
    }
  }, 300);
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

        if (!cur) return;

        cur.enterAnswer = this.answer || '';
        cur.timeTaken = this.questionSeconds || 0;

        cur.isCorrect =
          this.answer !== '' &&
          Number(this.answer) === Number(cur.correctAnswer);

        cur.status = cur.isCorrect ? 'correct' : 'wrong';
          
  }

  nextQuestion() {
    if (this.isQuestionActive) return; // prevent clicking during TTS
    this.saveCurrentAnswer();
    clearInterval(this.questionTimerInterval);
    if (this.currentIndex < this.quizData.length - 1) {
      this.currentIndex++;
          // ✅ RESET UI TIME IMMEDIATELY
    const cur = this.quizData[this.currentIndex];
    this.questionSeconds = cur.timeTaken || 0;
    this.updateQuestionTimeUI();

    // 4️⃣ RESTORE ANSWER
    this.answer = cur.enterAnswer || '';
     // this.startQuestionTimer();
      this.setHeaderTitle();
      setTimeout(() => {
      this.scrollToActiveStep();
      this.speakQuestionWithTTS(); // 🔹 speak question automatically
    }, 50);
    } else this.submitQuiz();
  }

  previousQuestion() {
     if (this.isQuestionActive) return;
    this.saveCurrentAnswer();

     clearInterval(this.questionTimerInterval);
    
    if (this.currentIndex > 0) {
      this.currentIndex--;
          // ✅ RESET UI TIME IMMEDIATELY
   
      const cur = this.quizData[this.currentIndex];
    this.questionSeconds = cur.timeTaken || 0;
    this.updateQuestionTimeUI();

    // 4️⃣ RESTORE ANSWER
    this.answer = cur.enterAnswer || '';
      //this.startQuestionTimer();
      this.setHeaderTitle();
      setTimeout(() => {
      this.scrollToActiveStep();
      this.speakQuestionWithTTS(); // 🔹 speak question automatically
    }, 50);
    }
  }

  goToQuestion(i: number) {
     if (this.isQuestionActive) return; // prevent clicking during TTS
     
    this.saveCurrentAnswer();
     clearInterval(this.questionTimerInterval);
    this.currentIndex = i;
        // ✅ RESET UI TIME IMMEDIATELY
  
        const cur = this.quizData[i];

      this.answer = cur.enterAnswer || '';

      this.questionSeconds = cur.timeTaken || 0;
      this.updateQuestionTimeUI();
    //this.startQuestionTimer();
    this.setHeaderTitle();
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

        // ✅ load previous time if exists
      
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

  // Only scroll if NOT last question
  if (stepArray[this.currentIndex] && this.currentIndex < this.questions.length - 1) {
    stepArray[this.currentIndex].nativeElement.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  }
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
      totalTime: this.totalTime, 
       headerTitle: this.headerTitle // total timer
                       // optional, current level
    }
  });
}

splitQuestion(q: string): string[] {
  // 👉 split into numbers and operators separately
  const tokens = q.match(/(\d+|[+\-*/])/g) || [];

  const result: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (['+', '-', '*', '/'].includes(tokens[i])) {
      // combine operator with next number
      if (i + 1 < tokens.length) {
        result.push(tokens[i] + tokens[i + 1]);
        i++; // skip next number
      }
    } else {
      // first number
      result.push(tokens[i]);
    }
  }

  return result;
}
}