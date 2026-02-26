import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-helpand-supoort',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './helpand-supoort.page.html',
  styleUrls: ['./helpand-supoort.page.scss'],
})
export class HelpandSupoortPage implements OnInit {

   faqs = [
    {
      question: 'What are Abacus and Vedic Maths, and how do they benefit my child?',
      answer: 'Abacus and Vedic Maths are mental math techniques that improve arithmetic skills, concentration, and overall brain development in children. They provide a strong foundation in mathematics.',
      open: false,
    },
    {
      question: 'At what age can my child start learning?',
      answer: 'Children can start learning from age 5 depending on their interest and readiness.',
      open: false,
    },
    {
      question: 'How does Abacus improve concentration?',
      answer: 'It activates both sides of the brain which improves memory, focus, and attention span.',
      open: false,
    },
    {
      question: 'Is prior math knowledge required?',
      answer: 'No prior math knowledge is needed. Beginners can easily start learning.',
      open: false,
    },
    {
      question: 'How long is the course duration?',
      answer: 'Course duration typically ranges from 6 months to 2 years depending on levels.',
      open: false,
    },
    {
      question: 'Will this help in school exams?',
      answer: 'Yes, it improves speed, accuracy, and confidence in solving math problems.',
      open: false,
    },
    {
      question: 'Are online classes available?',
      answer: 'Yes, both online and offline classes are available.',
      open: false,
    },
    {
      question: 'Do students get certificates?',
      answer: 'Yes, certificates are provided after completing each level.',
      open: false,
    },
    {
      question: 'Is there a demo class available?',
      answer: 'Yes, a free demo class is provided before enrollment.',
      open: false,
    },
    {
      question: 'How can I enroll my child?',
      answer: 'You can enroll through our website or contact support team.',
      open: false,
    },
  ];

  constructor(private navCtrl: NavController, private sanitizer: DomSanitizer,private router: Router, private menu: MenuController) {}

  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }

   async goHome() {
       await this.menu.close();
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
  }

}
