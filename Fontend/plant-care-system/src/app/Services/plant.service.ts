import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class PlantService {
  private selectedPlant: any;
  private apiUrl = 'http://localhost:5080/api/Customers';

  setPlant(plant: any) {
    this.selectedPlant = plant;
  }

  getPlant() {
    return this.selectedPlant;
  }
}