import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { OfferCardComponent } from '../offer-card/offer-card.component';
import { OtherServiceComponent } from '../other-service/other-service.component';
import { AppInstallComponent } from '../app-install/app-install.component';
import { PrimeSectionComponent } from '../prime-section/prime-section.component';
import { PartnerSectionComponent } from '../partner-section/partner-section.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { GlobalSectionComponent } from '../global-section/global-section.component';
import { FooterSectionComponent } from '../footer-section/footer-section.component';

@Component({
  selector: 'app-all-component',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeroSectionComponent, OfferCardComponent, OtherServiceComponent, AppInstallComponent, PrimeSectionComponent, PartnerSectionComponent, FaqSectionComponent, GlobalSectionComponent, FooterSectionComponent],
  templateUrl: './all-component.component.html',
  styleUrl: './all-component.component.css'
})
export class AllComponentComponent {

}
