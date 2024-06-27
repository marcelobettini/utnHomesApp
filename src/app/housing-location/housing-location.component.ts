import { Component, Input } from '@angular/core';
import { IHousingLocation } from '../housing-location';
// Necesitamos el Router para ir a la pag de detalle y agregarlos a los imports
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="listing" [routerLink]="['/details', housingLocation.id]">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">
        {{ housingLocation.city }} {{ housingLocation.state }}
      </p>
    </section>
  `,
  styleUrl: './housing-location.component.css',
})
export class HousingLocationComponent {
  @Input() housingLocation!: IHousingLocation;
}
