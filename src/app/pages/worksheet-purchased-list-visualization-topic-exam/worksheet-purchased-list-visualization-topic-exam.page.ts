import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { WorksheetPurchasedListToopicExamServices } from 'src/app/services/worksheet-purchased-list-toopic-exam-services';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Component({
  selector: 'app-worksheet-purchased-list-visualization-topic-exam',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './worksheet-purchased-list-visualization-topic-exam.page.html',
  styleUrls: ['./worksheet-purchased-list-visualization-topic-exam.page.scss'],
})
export class WorksheetPurchasedListVisualizationTopicExamPage implements OnInit {
 @ViewChild('scrollArea') scrollArea!: ElementRef;
@ViewChildren('stepItem') stepItems!: QueryList<ElementRef>;

studentId:any;
topicId:any;

practiceId:any;
examRnm:any;
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

 // 🔥 NEW
  displayText: string = '';
  isQuestionActive = false;
  isButtonsEnabled = false;

constructor(
private route:ActivatedRoute,
private examService:WorksheetPurchasedListToopicExamServices,
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

const res = await this.examService.getAllocatedTopicPractices(
this.studentId,
this.topicId
);

console.log("EXAM API:",res);

if(res.errorCode=='200'){

this.practiceId=res.result.practiceId;
this.examRnm = res.result.examRnm;

let questionData = res.result.questionsList;

if(typeof questionData === 'string'){
questionData = JSON.parse(questionData);
}

this.questions = questionData;

this.answers = new Array(this.questions.length).fill('');
this.isAnswered = new Array(this.questions.length).fill(false);
this.questionTimes = new Array(this.questions.length).fill(0);

this.startTimer();
this.startQuestionTimer();

 // 🔥 ADD THIS FOR FIRST QUESTION TTS
    setTimeout(() => {
      this.handleQuestionDisplay();
    }, 300);

}

}

getQuestionImage(question: string): string | null {

if (!question) return null;

  const match = question.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}
getQuestionText(question: string): string {
  if (!question) return '';

  let cleaned = question.replace(/<img[^>]+>/g, '');
  cleaned = cleaned.replace(/<br\s*\/?>/gi, '\n');

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

  // ✅ IMAGE QUESTION
   // if image → skip TTS
    if (/<img[^>]+src="([^">]+)"/.test(question)) {

    

    this.showImageAlert();

    // 3 sec delay → auto back
  

    return; // 🔥 stop further execution
  }
  // ✅ TEXT QUESTION → TTS
  const text = this.getQuestionText(question);
  const elements = text.split(/\s+/);

  this.speakAndDisplayOneByOne(elements);
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

  async speakAndDisplayOneByOne(elements: string[]) {

  this.isQuestionActive = true;
  this.isButtonsEnabled = false;
  this.displayText = '';

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
    } else {
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
    this.displayText = '';

    await this.delay(300); // small gap before next number
  }

  // ✅ FINAL
  this.displayText = 'Answer is';

  await TextToSpeech.speak({
    text: 'Answer is',
    lang: 'en-US'
  });

  this.isButtonsEnabled = true;
  this.isQuestionActive = false;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }



nextQuestion() {
    if (this.isQuestionActive) return;

    this.answers[this.currentIndex] = this.answer;
    this.isAnswered[this.currentIndex] = this.answer.trim() !== '';
    this.questionTimes[this.currentIndex] = this.questionSeconds;

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.answer = this.answers[this.currentIndex] || '';
      this.startQuestionTimer();

      setTimeout(() => {
        this.scrollToActiveStep();
        this.handleQuestionDisplay();
      }, 200);
    } else {
      this.showCompletionPopup();
    }
  }

  prevQuestion() {
    if (this.isQuestionActive) return;

    this.answers[this.currentIndex] = this.answer;
    this.isAnswered[this.currentIndex] = this.answer.trim() !== '';

    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.answer = this.answers[this.currentIndex] || '';
      this.startQuestionTimer();

      setTimeout(() => {
        this.scrollToActiveStep();
        this.handleQuestionDisplay();
      }, 200);
    }
  }

  goToQuestion(i: number) {
    if (this.isQuestionActive) return;

    this.answers[this.currentIndex] = this.answer;
    this.isAnswered[this.currentIndex] = this.answer.trim() !== '';

    this.currentIndex = i;
    this.answer = this.answers[i] || '';

    this.startQuestionTimer();

    setTimeout(() => {
      this.scrollToActiveStep();
      this.handleQuestionDisplay();
    }, 200);
  }
  async showCompletionPopup() {
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
  

goBack() {
  window.history.back();
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
   if (this.isQuestionActive) return;
this.answer = event.target.value ? event.target.value.toString() : '';
}

  async submitExam(){
     if (this.isQuestionActive) return;
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
      const questionData = this.questions.map((q, i) => {

    const given = (this.answers[i] || '').trim();
    const correct = (q.answer || q.correctAnswer || '').trim();

    return {
      question: q.question,
      given: given,
      answer: correct,
      is_currect: given === correct ? 1 : 0, // ✅ EXACT ANDROID KEY
      time_taken: Math.floor((this.questionTimes[i] || 0)), // seconds
      status: given ? 1 : 0 // ✅ EXACT ANDROID FORMAT
    };

  });
  console.log("FINAL SUBMIT DATA:", questionData);
  try {
    const res = await this.examService.submitAllocatedAssignmentExam(this.examRnm, questionData);
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

  
    this.router.navigate(['/worksheet-purchased-list-visualization-topic-exam-result'], {
      state: {
        topicName: this.topicName,
        totalTime: this.totalTime,
        questionData
      }
    });
  }


splitQuestion(question: string): string[] {

  if (!question) return [];

  let cleaned = question.replace(/<img[^>]+>/g, '');
  cleaned = cleaned.replace(/<br\s*\/?>/gi, '\n');

  const div = document.createElement('div');
  div.innerHTML = cleaned;

  return (div.textContent || '')
    .replace(/\u00A0/g, '')
    .split('\n')
    .map(v => v.trim())
    .filter(v => v.length > 0);
}
}