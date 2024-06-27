import { Injectable } from '@angular/core';
import { IHousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';
  constructor() {}
  async getAllHousingLocation(): Promise<IHousingLocation[]> {
    const data = await fetch(this.url);
    const houses = (await data.json()) ?? [];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(houses);
      }, 300);
    });
  }
  async getHousingLocationById(id: Number): Promise<IHousingLocation> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  async submitApplication(firstName: string, lastName: string, email: string) {
    alert(JSON.stringify({ firstName, lastName, email }));
  }
}
