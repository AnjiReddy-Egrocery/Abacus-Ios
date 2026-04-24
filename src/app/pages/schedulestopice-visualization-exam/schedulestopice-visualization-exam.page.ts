import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { AlertController, IonicModule } from '@ionic/angular';
import { ScheduleTopicExamResponse } from 'src/app/services/schedule-topic-exam-response';

@Component({
  selector: 'app-schedulestopice-visualization-exam',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './schedulestopice-visualization-exam.page.html',
  styleUrls: ['./schedulestopice-visualization-exam.page.scss'],
})

export class SchedulestopiceVisualizationExamPage implements OnInit {
@ViewChild('scrollArea') scrollArea!: ElementRef;
@ViewChildren('stepItem') stepItems!: QueryList<ElementRef>;
 @ViewChild('answerInput', { static: false }) answerInput!: any;

studentId:any;
topicId:any;

practiceId:any;
topicName:any;

questions:any[] = [];

currentIndex=0;

answer:string='';
answers:string[]=[];
isAnswered:boolean[]=[];

totalSeconds=0;
totalTime='00:00:00';
timerInterval:any;

questionSeconds=0;
questionTime='00:00';
questionTimerInterval:any;

questionTimes:number[]=[];

stopTTS = false;

 // 🔥 NEW
  displayText: string = '';
  isQuestionActive = false;
  isButtonsEnabled = false;

constructor(
private route:ActivatedRoute,
private examService:ScheduleTopicExamResponse,
private alertController: AlertController,
private router: Router 
){}

async ngOnInit(){

this.route.queryParams.subscribe(params=>{

this.studentId=params['studentId'];
this.topicId=params['topicId'];
this.topicName=params['topicName'];

this.startExam();

});

}

async startExam(){

const res = await this.examService.startTopicExam(
this.studentId,
this.topicId
);

console.log("EXAM API:",res);

if(res.errorCode=='200'){

this.practiceId=res.result.practiceId;

let questionData = res.result.questionsList;

if(typeof questionData === 'string'){
questionData = JSON.parse(questionData);
}

this.questions = questionData;

this.answers = new Array(this.questions.length).fill('');
this.isAnswered = new Array(this.questions.length).fill(false);
this.questionTimes = new Array(this.questions.length).fill(0);

this.startTimer();
//this.startQuestionTimer();

 setTimeout(() => {
      this.handleQuestionDisplay();
    }, 50);

}

}

getQuestionImage(question: string): string | null {

  // if (!question) return null;

  // const match = question.match(/<img[^>]+src="([^">]+)"/);

  return null;

}

getQuestionText(question: string): string {

  if (!question) return '';

  const cleaned = question.replace(/<img[^>]+>/g, '');

  const div = document.createElement('div');
  div.innerHTML = cleaned;

  return div.textContent?.replace(/\u00A0/g, '').trim() || '';

}

get currentQuestion(){
return this.questions[this.currentIndex]?.question;
}

handleQuestionDisplay() {

    const question = this.currentQuestion;
    if (!question) return;

    // if image → skip TTS
      if (/<img[^>]+src="([^">]+)"/.test(question)) {

     this.displayText = 'Beads question not available for visualization practice.';

    this.isQuestionActive = false;
    this.isButtonsEnabled = false;

      TextToSpeech.stop();

    // ⏳ 3 seconds taruvata back vellali
    setTimeout(() => {
      this.goBack();
    }, 3000);

    return; // stop
  }
    const text = this.getQuestionText(question);
    const elements = text.split(/\s+/);

    this.speakAndDisplayOneByOne();
  }

   async showImageAlert() {
  this.displayText = 'Beads question not available for visualization practice.';
  this.isQuestionActive = true;
  this.isButtonsEnabled = false;

  // 🔹 Show alert
  const alert = await this.alertController.create({
    header: 'Visualization Info',
    message: 'Beads question not available for visualization practice.',
    buttons: ['OK']
  });

  await alert.present();

  // 🔹 Wait for user to dismiss the alert, then go back
  await alert.onDidDismiss();

  // 🔹 Go back after alert closed
  this.goBack();
}

  focusAnswerInput() {
  setTimeout(() => {
    if (this.answerInput) {
      this.answerInput.setFocus(); // ✅ focus
    }
  }, 300);
}


  async speakAndDisplayOneByOne() {

     const question = this.currentQuestion;
  if (!question) return;

    this.stopTTS = false; // ✅ RESET FLAG

  this.isQuestionActive = true;
  this.isButtonsEnabled = false;
  const elements = this.splitQuestion(question);
  this.displayText = '';

  for (let i = 0; i < elements.length; i++) {

     if (this.stopTTS) return; // 🛑 STOP IMMEDIATELY

    let clean = elements[i].trim();
    if (!clean) continue;

    let speakText = '';
    let displayText = '';

   if (i === 0) {
      speakText = clean;
      displayText = clean;
    }
    else if (clean.startsWith('+')) {
      const num = clean.substring(1);
      speakText = `plus ${num}`;
      displayText = `+${num}`;
    }
    else if (clean.startsWith('-')) {
      const num = clean.substring(1);
      speakText = `minus ${num}`;
      displayText = `-${num}`;
    }
    else {
      // default case
      speakText = `plus ${clean}`;
      displayText = `+${clean}`;
    }
    // ✅ SHOW
    this.displayText = displayText;

    await TextToSpeech.speak({
      text: speakText,
      lang: 'en-US',
      rate: 1.0
    });

    // ⏳ WAIT
    await this.delay(1000);

    // ❌ CLEAR (this is the key fix)

  }

  // ✅ FINAL
  this.displayText = 'Answer is';

  await TextToSpeech.speak({
    text: 'Answer is',
    lang: 'en-US'
  });

  this.isButtonsEnabled = true;
  this.isQuestionActive = false;
   this.focusAnswerInput();
  this.startQuestionTimer();
  }
 delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
nextQuestion() {
    if (this.isQuestionActive) return;
  // Save current answer
  // Save current answer
  this.answers[this.currentIndex] = this.answer;
  this.isAnswered[this.currentIndex] = this.answer.trim() !== '';

  // ✅ Save current question time
  this.questionTimes[this.currentIndex] = this.questionSeconds;

  if (this.currentIndex < this.questions.length - 1) {
     clearInterval(this.questionTimerInterval);
      this.questionSeconds = 0;
     this.updateQuestionTimeUI();
    this.currentIndex++;
    this.answer = this.answers[this.currentIndex] || '';
    setTimeout(() => {
        this.scrollToActiveStep();
        this.handleQuestionDisplay();
      }, 50);
  }else {
    // Last question reached → navigate to another page
    
    
   console.log('Last question reached');

    clearInterval(this.questionTimerInterval);
    this.showCompletionPopup();
  }
}
  async showCompletionPopup() {
   const alert = await this.alertController.create({
    header: 'www.abacustrainer.com',
    message: 'Are you sure you want to submit exam? You will not be able to modify anything after submitting.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: () => {
          this.submitExamData();
        },
      },
    ],
  });

await alert.present();
  }

  async goBack() {
   this.stopTTS = true; // ✅ STOP LOOP

  try {
    await TextToSpeech.stop();
  } catch (e) {
    console.log('TTS stop error:', e);
  }

  clearInterval(this.timerInterval);
  clearInterval(this.questionTimerInterval);

  this.isQuestionActive = false;

  window.history.back();
}

prevQuestion(){
if (this.isQuestionActive) return;
this.answers[this.currentIndex] = this.answer;
  this.isAnswered[this.currentIndex] = this.answer.trim() !== '';

  // ✅ Save current question time
  this.questionTimes[this.currentIndex] = this.questionSeconds;

  if (this.currentIndex > 0) {
    this.currentIndex--;
      clearInterval(this.questionTimerInterval);
    this.questionSeconds = 0;
     this.updateQuestionTimeUI();
    this.answer = this.answers[this.currentIndex] || '';
   
   setTimeout(() => {
        this.scrollToActiveStep();
        this.handleQuestionDisplay();
      }, 50);
  }
}

goToQuestion(i:number){
if (this.isQuestionActive) return;
this.answers[this.currentIndex] = this.answer;
this.isAnswered[this.currentIndex] = this.answer.trim() !== '';

this.currentIndex = i;
this.updateQuestionTimeUI();
this.answer = this.answers[i] || '';

//this.startQuestionTimer();

 setTimeout(() => {
      this.scrollToActiveStep();
      this.handleQuestionDisplay();
    }, 50);

}

startTimer(){

this.timerInterval=setInterval(()=>{

this.totalSeconds++;

const hrs=Math.floor(this.totalSeconds/3600);
const mins=Math.floor((this.totalSeconds%3600)/60);
const secs=this.totalSeconds%60;

this.totalTime=`${this.pad(hrs)}:${this.pad(mins)}:${this.pad(secs)}`;

},1000);

}

startQuestionTimer(){

clearInterval(this.questionTimerInterval);

this.questionSeconds=this.questionTimes[this.currentIndex]||0;
this.updateQuestionTimeUI();

this.questionTimerInterval=setInterval(()=>{

this.questionSeconds++;
this.updateQuestionTimeUI();

},1000);

}

updateQuestionTimeUI(){

const mins=Math.floor(this.questionSeconds/60);
const secs=this.questionSeconds%60;

this.questionTime=`${this.pad(mins)}:${this.pad(secs)}`;

}

pad(num:number){
return num<10?'0'+num:num.toString();
}

scrollLeft(){
this.scrollArea.nativeElement.scrollBy({left:-80,behavior:'smooth'});
}

scrollRight(){
this.scrollArea.nativeElement.scrollBy({left:80,behavior:'smooth'});
}

scrollToActiveStep(){

const stepArray=this.stepItems.toArray();

if(stepArray[this.currentIndex]){

stepArray[this.currentIndex].nativeElement.scrollIntoView({
behavior:'smooth',
inline:'center',
block:'nearest'
});

}

}

onAnswerChange(event:any){
this.answer = event.target.value ? event.target.value.toString() : '';
}

  async submitExam(){

    this.answers[this.currentIndex] = this.answer;
    this.isAnswered[this.currentIndex] = this.answer.trim() !== '';
    this.questionTimes[this.currentIndex] = this.questionSeconds;

  const alert = await this.alertController.create({
    header: 'www.abacustrainer.com',
    message: 'Are you sure you want to submit exam? You will not be able to modify anything after submitting.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: () => {
          this.submitExamData();
        },
      },
    ],
  });

await alert.present();
}
  async submitExamData() {
      const questionData = this.questions.map((q, i) => ({
      question: q.question,
      given: this.answers[i] || '',        // ✅ student’s answer
      answer: q.correctAnswer || q.answer, // API correct answer
      is_correct: this.answers[i] === (q.correctAnswer || q.answer),
      time_taken: this.questionTimes[i] || 0,
      status: this.answers[i] ? 'answered' : 'not_answered',
    }));
  try {
    const res = await this.examService.submitAllocatedTopicExam(this.practiceId, questionData);
    console.log('Submission response:', res);

    if (res.errorCode === '200') {
      //alert('All Questions are Submitted');
      this.navigateToResultPage(questionData);
    } else {
      alert('Submission failed: ' + res.message);
    }
  } catch (err) {
    console.error('Submission error', err);
    alert('Submission error!');
  }
  }
  navigateToResultPage(questionData: any){

    console.log("Navigating to result page with:");
  console.log("topicName:", this.topicName);
 
  console.log("totalTime:", this.totalTime);
  console.log("questions:", this.questions);
  console.log("answers:", this.answers);
  console.log("questionTimes:", this.questionTimes);
  console.log("questionData:", questionData);

  
    this.router.navigate(['/schedulestopic-visualization-result'], {
      state: {
        topicName: this.topicName,
        totalTime: this.totalTime,
        questionData
      }
    });
  }


repeatQuestion() {
  // ❌ TTS running unte repeat allow cheyyakudadhu
  if (this.isQuestionActive) return;

  

  // 🔄 Reset timer


  // 🧹 Clear display
  this.displayText = '';

  // 🔁 Re-play same question (TTS + UI flow)
  this.speakAndDisplayOneByOne();
}

splitQuestion(q: string): string[] {
  // 👉 split into numbers and operators separately
  const tokens = q.match(/[+-]?\d+/g) || [];

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

