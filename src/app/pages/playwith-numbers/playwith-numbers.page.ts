import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

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
  operations = ['Addition', 'Subtraction', 'Multiplication', 'Division'];
  operands = ['2', '3', '4', '5'];
  totalQuestions = ['5', '10', '15', '20'];

  selectedLevel: string ='';
  selectedOperation: string = '';
  selectedOperands: string = '';
  selectedTotalQuestions: string = '';

  dynamicSpinners: any[] = [];

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  startNumberGame() {
    console.log('Start Game Level:', this.selectedLevel);
    const levelNumber = this.selectedLevel.replace('Level-', '');
    this.router.navigate(['/gamelevels', this.selectedLevel]);
  }

  onOperationChange() {
    if (this.selectedOperation === 'Multiplication') {
      this.dynamicSpinners = [
        { selected: null, options: Array.from({ length: 10 }, (_, i) => i + 1) },
        { selected: null, options: Array.from({ length: 10 }, (_, i) => i + 1) },
      ];
    } else {
      this.dynamicSpinners = [];
    }
  }

  onOperandsChange() {
    const count = parseInt(this.selectedOperands, 10);
    this.dynamicSpinners = [];
    for (let i = 0; i < count; i++) {
      this.dynamicSpinners.push({ selected: null, options: Array.from({ length: 10 }, (_, j) => j + 1) });
    }
  }

  createNumberGame() {
    console.log({
      operation: this.selectedOperation,
      operands: this.selectedOperands,
      totalQuestions: this.selectedTotalQuestions,
      dynamic: this.dynamicSpinners,
    });
  }
}
