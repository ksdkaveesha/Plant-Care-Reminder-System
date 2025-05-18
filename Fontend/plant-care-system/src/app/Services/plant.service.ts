import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class PlantService {
  private selectedPlant: any;

  setPlant(plant: any) {
    this.selectedPlant = plant;
  }

  getPlant() {
    return this.selectedPlant;
  }
}