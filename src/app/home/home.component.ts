import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { IHousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="search" placeholder="Filter by city" #filter />
        <button
          type="button"
          class="primary"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      @if(!housingLocationList.length){
      <span>Loading...</span>
      } @for(house of filteredLocationList; track house.id ){

      <app-housing-location [housingLocation]="house" />
      }
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingLocationList: IHousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: IHousingLocation[] = [];
  constructor() {
    this.housingService
      .getAllHousingLocation()
      .then((housingLocationList: IHousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
    this.filteredLocationList = this.housingLocationList.filter((house) =>
      house?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
