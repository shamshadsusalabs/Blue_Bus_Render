import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.css'
})
export class FooterSectionComponent {


  showSeoLinks = false;

  toggleSeoLinks() {
    this.showSeoLinks = !this.showSeoLinks;
    console.log(this.showSeoLinks);
  }

  showSeoLinks1 = false;

  toggleSeoLinks1() {
    this.showSeoLinks1 = !this.showSeoLinks1;
    console.log(this.showSeoLinks1);
  }
  showSeoLinks2= false;

  toggleSeoLinks2() {
    this.showSeoLinks2 = !this.showSeoLinks2;
    console.log(this.showSeoLinks2);
  }
}
