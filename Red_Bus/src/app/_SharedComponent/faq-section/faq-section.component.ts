import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.css'
})
export class FaqSectionComponent {
  showSeoLinks = false;

  toggleSeoLinks() {
    this.showSeoLinks = !this.showSeoLinks;
    console.log(this.showSeoLinks);
  }
}
