import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./_SharedComponent/navbar/navbar.component";
import { HeroSectionComponent } from "./_SharedComponent/hero-section/hero-section.component";
import { OfferCardComponent } from './_SharedComponent/offer-card/offer-card.component';
import { OtherServiceComponent } from "./_SharedComponent/other-service/other-service.component";
import { AppInstallComponent } from "./_SharedComponent/app-install/app-install.component";
import { PrimeSectionComponent } from "./_SharedComponent/prime-section/prime-section.component";
import { PartnerSectionComponent } from "./_SharedComponent/partner-section/partner-section.component";
import { FaqSectionComponent } from './_SharedComponent/faq-section/faq-section.component';
import { GlobalSectionComponent } from "./_SharedComponent/global-section/global-section.component";
import { FooterSectionComponent } from "./_SharedComponent/footer-section/footer-section.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeroSectionComponent, OfferCardComponent, OtherServiceComponent, AppInstallComponent, PrimeSectionComponent, PartnerSectionComponent, FaqSectionComponent, GlobalSectionComponent, FooterSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Red_Bus';
}
