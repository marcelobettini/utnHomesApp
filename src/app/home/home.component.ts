import { Component } from '@angular/core';
import { locations } from '../data/db';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    @for(house of houses; track house.id ){

    <app-housing-location [housingLocation]="house" />
    }
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  houses = locations;
}
