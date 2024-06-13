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
      }, 1500);
    });
    return [];
  }
}
