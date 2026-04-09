import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-playwith-numbers',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
 
  templateUrl: './playwith-numbers.page.html',
  styleUrls: ['./playwith-numbers.page.scss'],
})
export class PlaywithNumbersPage {
  levels = ['Level-1', 'Level-2', 'Level-3', 'Level-4', 'Level-5'];
  operations = ['Addition',  'Multiplication'];
  operands = ['1','2', '3', '4', '5','6','7','8','9','10'];
  totalQuestions = ['10', '20', '30', '40', '50','60','70','80','90','100'];

  selectedLevel: string ='';
  selectedOperation: string = '';
  selectedOperands: string = '';
  selectedTotalQuestions: string = '';

 dynamicSpinners: any[] = [];

  constructor(private router: Router,private toastCtrl: ToastController) {}

  goHome() {
    this.router.navigate(['/dashboard']);
  }

 async startNumberGame() {

  if (!this.selectedLevel) {

    const toast = await this.toastCtrl.create({
      message: 'Please select level',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });

    toast.present();
    return;
  }

  console.log('Start Game Level:', this.selectedLevel);

  const levelNumber = this.selectedLevel.replace('Level-', '');

  this.router.navigate(['/gamelevels', levelNumber]);
}

  onOperationChange() {
    if (this.selectedOperation === 'Multiplication') {
      this.dynamicSpinners = [
        { selected: null, options: Array.from({ length: 4 }, (_, i) => i + 1) },
        { selected: null, options: Array.from({ length: 4 }, (_, i) => i + 1) },
      ];
    } else {
      this.dynamicSpinners = [];
    }
  }

 onOperandsChange() {

    const count = parseInt(this.selectedOperands, 10);

    this.dynamicSpinners = [];

    for (let i = 0; i < count; i++) {

      this.dynamicSpinners.push({
        selected: null,
        options: Array.from({ length: 4 }, (_, j) => j + 1)
      });

    }

  }
async createNumberGame() {

  // ✅ Operation check
  if (!this.selectedOperation) {
    this.showToast('Please select operation');
    return;
  }

  // ✅ Total Numbers check
  if (this.selectedOperation !== 'Multiplication' && !this.selectedOperands) {
    this.showToast('Please select total numbers');
    return;
  }

  // ✅ Dynamic ranges check
  if (this.dynamicSpinners.length === 0) {
    this.showToast('Please select number ranges');
    return;
  }

  const notSelectedRange = this.dynamicSpinners.find(d => !d.selected);

  if (notSelectedRange) {
    this.showToast('Please select all number ranges');
    return;
  }

  // ✅ Total Questions check
  if (!this.selectedTotalQuestions) {
    this.showToast('Please select total questions');
    return;
  }

  // ✅ Generate Questions
  const totalQ = parseInt(this.selectedTotalQuestions, 10);

  const ranges = this.dynamicSpinners.map(d =>
    Array.from({ length: Math.pow(10, d.selected) - 1 }, (_, i) => i + 1)
  );

  const questions: string[] = [];
  const answers: string[] = [];

  for (let i = 0; i < totalQ; i++) {

    if (this.selectedOperation === 'Addition') {

      let q = ranges.map(r => r[Math.floor(Math.random() * r.length)]).join(' + ');
      questions.push(q);

      const ans = q.split('+').reduce((a, b) => a + parseInt(b.trim(), 10), 0);
      answers.push(ans.toString());

    }

    if (this.selectedOperation === 'Multiplication') {

      let q = ranges.map(r => r[Math.floor(Math.random() * r.length)]).join(' * ');
      questions.push(q);

      const ans = q.split('*').reduce((a, b) => a * parseInt(b.trim(), 10), 1);
      answers.push(ans.toString());

    }

  }

  console.log('Questions:', questions);
  console.log('Answers:', answers);

  // ✅ SUCCESS Toast
  const successToast = await this.toastCtrl.create({
    message: 'Game Created Successfully ✅',
    duration: 2000,
    color: 'success'
  });

  successToast.present();
  //👉 OPTIONAL navigate to quiz page
  this.router.navigate(['/quizexam'], 
    { state: 
      { 
        questions,
         answers,
         operation: this.selectedOperation 
        }
       });

}

async showToast(msg: string) {
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000,
    position: 'bottom',
    color: 'danger'
  });

  toast.present();
}

}
