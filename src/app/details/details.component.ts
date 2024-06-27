import { Component, inject } from '@angular/core';
import { IHousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if(!housingLocation){
    <p>Loading...</p>
    }@else {

    <article>
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        [alt]="housingLocation.name"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation.name }}</h2>
        <p class="listing-location">
          {{ housingLocation.city }}, {{ housingLocation.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this location</h2>
        <ul>
          <li>Units available: {{ housingLocation.availableUnits }}</li>
          <li>
            Does this location have wifi:{{
              housingLocation.wifi ? 'Yes' : 'No'
            }}
          </li>
          <li>
            Does this location have laundry:{{
              housingLocation.laundry ? 'Yes' : 'No'
            }}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here!</h2>
        <form [formGroup]="applyForm" (submit)="handleSubmit()">
          <label for="first-name">First Name</label>
          <input type="text" id="fist-name" formControlName="firstName" />
          <span class="alert" [hidden]="firstName.valid || firstName.untouched"
            >First name is required</span
          >
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName" />
          <span class="alert" [hidden]="lastName.valid || lastName.untouched"
            >Last name is required</span
          >
          <label for="email">Email</label>
          <input type="text" id="email" formControlName="email" />
          <span class="alert" [hidden]="email.valid || email.untouched">
            @if(email.errors?.['required']){Email is required} @else{Must be a
            valid email}
          </span>
          <button type="submit" class="primary" [disabled]="applyForm.invalid">
            Apply now
          </button>
        </form>
      </section>
    </article>

    }
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: IHousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
  });
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService
      .getHousingLocationById(housingLocationId)
      .then((housingLocation) => {
        this.housingLocation = housingLocation;
      });
  }
  get firstName() {
    return this.applyForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.applyForm.get('lastName') as FormControl;
  }
  get email() {
    return this.applyForm.get('email') as FormControl;
  }

  handleSubmit() {
    if (this.applyForm.invalid) return;
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
