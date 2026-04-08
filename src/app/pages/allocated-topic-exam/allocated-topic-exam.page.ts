import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { TopicExam } from 'src/app/services/topic-exam';

@Component({
  selector: 'app-allocated-topic-exam',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './allocated-topic-exam.page.html',
  styleUrls: ['./allocated-topic-exam.page.scss'],
})
export class AllocatedTopicExamPage implements OnInit {

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

constructor(
private route:ActivatedRoute,
private examService:TopicExam,
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
this.examRnm=res.result.examRnm;

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

  let cleaned = question.replace(/<img[^>]+>/g, '');
  cleaned = cleaned.replace(/<br\s*\/?>/gi, '\n');

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

  try {
    const res = await this.examService.submitAllocatedTopicExam(this.examRnm, questionData);
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

  
    this.router.navigate(['/allocated-topic-exam-result-page'], {
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