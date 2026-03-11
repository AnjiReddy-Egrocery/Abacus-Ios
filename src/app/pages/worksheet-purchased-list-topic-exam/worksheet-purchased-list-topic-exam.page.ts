import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule, NavController, ToastController } from '@ionic/angular';

import { WorksheetPurchasedListToopicExamServices } from 'src/app/services/worksheet-purchased-list-toopic-exam-services';

@Component({
  selector: 'app-worksheet-purchased-list-topic-exam',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './worksheet-purchased-list-topic-exam.page.html',
  styleUrls: ['./worksheet-purchased-list-topic-exam.page.scss'],
})
export class WorksheetPurchasedListTopicExamPage implements OnInit {
 @ViewChild('scrollArea') scrollArea!: ElementRef;
@ViewChildren('stepItem') stepItems!: QueryList<ElementRef>;

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

}

}

getQuestionImage(question: string): string | null {

  if (!question) return null;

  const match = question.match(/<img[^>]+src="([^">]+)"/);

  return match ? match[1] : null;

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

nextQuestion() {
  // Save current answer
  this.answers[this.currentIndex] = this.answer;
  this.isAnswered[this.currentIndex] = this.answer.trim() !== '';

  // ✅ Save current question time
  this.questionTimes[this.currentIndex] = this.questionSeconds;

  if (this.currentIndex < this.questions.length - 1) {
    this.currentIndex++;
    this.answer = this.answers[this.currentIndex] || '';
    this.startQuestionTimer();

    setTimeout(() => this.scrollToActiveStep(), 50);
  }else {
    // Last question reached → navigate to another page
    
    
   console.log('Last question reached');

    clearInterval(this.questionTimerInterval);
    this.showCompletionPopup();
  }
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

prevQuestion(){

this.answers[this.currentIndex] = this.answer;
  this.isAnswered[this.currentIndex] = this.answer.trim() !== '';

  // ✅ Save current question time
  this.questionTimes[this.currentIndex] = this.questionSeconds;

  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.answer = this.answers[this.currentIndex] || '';
    this.startQuestionTimer();

    setTimeout(() => this.scrollToActiveStep(), 50);
  }
}

goToQuestion(i:number){

this.answers[this.currentIndex] = this.answer;
this.isAnswered[this.currentIndex] = this.answer.trim() !== '';

this.currentIndex = i;
this.answer = this.answers[i] || '';

this.startQuestionTimer();

setTimeout(()=>this.scrollToActiveStep(),50);

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
    const res = await this.examService.submitAllocatedAssignmentExam(this.practiceId, questionData);
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

  
    this.router.navigate(['/worksheet-purchased-list-topic-exam-result'], {
      state: {
        topicName: this.topicName,
        totalTime: this.totalTime,
        questionData
      }
    });
  }


splitQuestion(question: string): string[] {

  if (!question) return [];

  // remove image tag
  const cleaned = question.replace(/<img[^>]+>/g, '');

  // convert <br> to newline
  const withBreaks = cleaned.replace(/<br\s*\/?>/gi, '\n');

  const div = document.createElement('div');
  div.innerHTML = withBreaks;

  const text = div.textContent || '';

  return text
    .replace(/\u00A0/g, '')
    .split('\n')
    .map(v => v.trim())
    .filter(v => v.length > 0);

}
}