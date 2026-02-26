import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-privacypolicy',
   standalone: true,
    imports: [IonicModule, FormsModule, CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],// ✅ ADD THIS LINE
  templateUrl: './privacypolicy.page.html',
  styleUrls: ['./privacypolicy.page.scss'],
})
export class PrivacypolicyPage implements OnInit {
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
       "Information We Collect",
                "Cookies and Tracking Technologies",
                "How We Use Your Information",
                "Sharing Your Information",
                "Data Retention",
                "Security",
                "International Data Transfers",
                "Your Rights",
                "Children’s Privacy",
                "Changes to This Privacy Policy",
                "CONTACT US"
    ];

       const termsText = `AbacusTrainer.com respect your privacy. This Privacy Policy describes how we collect, use, share and protect personal information or data when you visit our website, access our services or otherwise engage with us. By using the Site, you consent to this Privacy Policy. Handled by Deccan Spark Technologies.

Information We Collect

We may receive the following types of information:

Personal Information You Provide

Name
Email address
Phone number (if you include it)
Any other information you decide to provide us (through, for example, contact or registration forms)

Usage Information

IP address
Browser type and version
Operating system
Pages you visit on our Site
Time and date of access
Time spent on each page
Referring site/exit pages
Device identifiers (if applicable)

Cookies and Tracking Technologies

We and our service providers use cookies and similar technologies, such as pixels, tags, device IDs, local storage, or other identifiers, to collect information about how you use our Site (for example, we remember your preferences) as well as to count visits and analyse traffic.

Cookies can be controlled through browser settings; however, disabling some cookies may affect your use of parts or all of our Site.

How We Use Your Information

Maintaining, developing and expanding the Site
Replying to your contact (e.g., contact form inquiries)
We will send you updates, newsletters or other communications (only if you voluntarily subscribe to it)
Enhancing our Site (e.g., by examining how the website is used)
Tracking and analyzing trends in usage and for other user experience needs
Ensuring our Site’s security and integrity

Sharing Your Information

We will not sell your data. We may disclose your information in the following circumstances:

Service Providers: We may transfer and disclose information to third parties who provide services on our behalf such as hosting providers, e-mail service providers, analytics companies or other service providers.

Legal Reasons: We have the right to share your information with the police and /or other authorities if it is required by law, a legal request (such as a subpoena) or in certain other cases.
Business Transfers: If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.

Data Retention

We will only keep your personal information for as long as it is necessary to fulfil the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law. We will delete or anonymize your data securely after it is no longer needed.

Security

We employ the necessary technical and organizational measures to safeguard your information. The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure.

International Data Transfers

If you are accessing our Site from outside India (or any other country), please be aware that your information may be transferred to, stored in facilities operated and maintained by or on behalf of us, and we use such a transfer to provide the Services. If you use our Site, you agree to such transfer and the processing of your data according to the terms contained in this Policy.

Your Rights

The collection and use of personal data used on or in connection with this Website is governed by applicable privacy legislation. Depending on the country you reside in, you may have certain rights that relate to your personal information, including

Request to access or delete your personal data
The right to restrict or object to our processing of your data.
The right to withdraw consent if processing is based on consent.
The right to testify a complaint with a data protection authority (if applicable)
If you would like to use any of your rights, then please email us under the Contact Us

Children’s Privacy

Our services are child-centred with worksheets, study materials and learning resources for kids. Our vision is to keep children’s personal information safe and promote a safe environment for learning.
We don’t ask for personal information unless we truly need it to give you a premium download. No personal information (including a child's name, address or location) is entered without the parent/guardian's permission, except where required for enrolment of any courses/products.

Changes to This Privacy Policy

We can revise this Privacy Policy from time to time. If and when we do, we will post the revised date at the top of this page and alert you of such changes. We suggest that you periodically check this policy for any modifications.

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
