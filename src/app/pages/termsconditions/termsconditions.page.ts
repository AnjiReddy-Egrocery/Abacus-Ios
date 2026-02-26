import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-termsconditions',
  standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './termsconditions.page.html',
  styleUrls: ['./termsconditions.page.scss'],
})
export class TermsconditionsPage implements OnInit {
formattedAboutText: SafeHtml = '';

  constructor(private navCtrl: NavController, private sanitizer: DomSanitizer,private router: Router, private menu: MenuController) {
    this.buildRefundPolicy();
  }

    async goHome() {
       await this.menu.close();
    this.router.navigate(['/dashboard']);
  }


  ngOnInit(): void {}

  buildRefundPolicy() {
    const headingsStyle = 'color:#4d148c; font-weight:bold; font-size:1.2rem; margin-top:1rem;';
    const paragraphStyle = 'font-size:1rem; color:#000; line-height:1.5; margin:0.5rem 0 1rem 0;';

    const headings = [
         "WHAT WE DO",
                "USE OF WEBSITE & SERVICES",
                "Eligibility",
                "Intellectual Property Rights",
                "User Conduct",
                "Account Registration (If Applicable)",
                "Payments, Purchases & Refund Policy",
                "Third-Party Links",
                "Children’s Use",
                "Disclaimer of Warranties",
                "Limitation of Liability",
                "Indemnification",
                "Changes to Terms",
                "CONTACT US"
    ];

       const termsText = `WHAT WE DO

These are the terms that apply to use of AbacusTrainer.com Handled by Deccan Spark Technologies. By visiting or using our website, worksheets, learning tools, downloads materials, videos and any services relating to the foregoing (Services), you agree to these Terms. In the event you do not accept, please cease using the Website right now.

USE OF WEBSITE & SERVICES

AbacusTrainer provides educational content such as training for Kids, Abacus language tools, worksheets, practice material and much more. The Website with its learning resources is for:

Parents

Guardians

Teachers

Students under supervision

You agree that you will not use the Website or its resources.

Eligibility

Minors We do not knowingly collect personal information from children under 13, except that a child may use the Website for purely educational purposes provided a parent, guardian or authorized teacher submits applicable information and such submission is done in accordance with relevant law.

INTELLECTUAL PROPERTY RIGHTS

All materials, in whatever form (documents and/or downloadable files), i.e. worksheets, images, videos, school books or designs, graphics as well as text, logos and branding are copyrighted and intellectual property of AbacusTrainer.com.

You may not reproduce, distribute, modify, create derivative works of, publicly display or sell any content without permission!
Worksheets can be downloaded for personal use, but may not be sold or redistributed in any form.

USER CONDUCT

You agree NOT to 

Post fake, harmful or inappropriate content,

Try to gain unauthorized access to, damage, or deactivate the Website

Utilize the material for commercial purposes without permission

Upload material that contains viruses, destructive features, spam, or malicious code

Abuse worksheets, downloads, or course materials

Account Registration (If Applicable)

If any portion of the Website requires you to open an account:

You are responsible for keeping your information up to date.

You must keep your login credentials confidential.

We can suspend or stop an account found to be violating these Terms.

PAYMENTS & REFUND POLICY

If the Website provides paid worksheets, courses, subscriptions, or training:

All prices are clearly stated on the Website.

All transactions are carried out securely through third-party payment gateways.

All payments are final and non-refundable as students/instructors pay only after attending a demo session and understanding how the course/program works.

You will NOT be entitled to a refund for:

Student course fees

Instructor training fees

Workbook or worksheet purchases

Digital downloads

Subscriptions or any other paid services

Third-Party Links

The Website may include links to external sites (tools, resources, payment gateways). We are not liable for the content, privacy, or services on those third-party websites.

Children’s Use

Because we're a platform built for students:

Kids can access worksheets and practice without typing personal details.

A parent, guardian or instructor must submit any required information for registration, communication, or certificate issuance.

We strive to provide a safe environment for learning.

DISCLAIMER OF WARRANTIES

Our worksheets, tools, and learning resources are provided without any warranty. We do not guarantee uninterrupted access or error-free data handling.

You use this site at your own risk.

Limitation of Liability

AbacusTrainer.com, to the maximum extent permitted by law, shall NOT be liable for:

Direct, indirect, incidental, consequential or punitive damages

Lost data, profits, or business interruption

Problems caused by misuse of content or materials

You agree to use the Website properly and at your own risk.

Indemnification

You further agree to indemnify and hold AbacusTrainer.com (or any third party) from all liabilities, claims, damages and expenses, including reasonable lawyers' fees and costs made against.

Your misuse of the Website

Violation of these Terms

Violation of third-party rights

Changes to Terms

We may change or revise these Terms at any time.

The “Effective Date” shall be amended accordingly. Your continued use of the Website following any changes constitutes your acceptance of the new Terms.

CONTACT US

For any queries, feedback or support, contact us at:

Email: info@abacustrainer.com

Address: Narsingi, Gandipet, Hyderabad, Telangana`;


    // Split by double line breaks for headings/paragraphs
    const lines = termsText.split('\n\n');

    let html = '';

    for (let line of lines) {
      line = line.trim();
      if (headings.includes(line)) {
        html += `<div style="${headingsStyle}">${line}</div>`;
      } else if (line.length > 0) {
        html += `<p style="${paragraphStyle}">${line}</p>`;
      }
    }

    // Make Angular trust this HTML
    this.formattedAboutText = this.sanitizer.bypassSecurityTrustHtml(html);
  }
}

