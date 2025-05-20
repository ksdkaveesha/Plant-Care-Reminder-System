import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlantDto } from '../models/plant.model';
import { AddPlantDto } from '../models/addplant.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PlantService {
  private selectedPlant: any;

  constructor(private http: HttpClient) {}
  
  AddPlant(body: AddPlantDto) {
    return this.http.post(
      'http://localhost:5230/api/Plant/AddPlant',
      body,
      { responseType: 'text' }  
    );
  }

  /** GET  /api/Plant/ByUser/{userId}  */
  GetPlantsByUser(userId: number) {
    return this.http.get<PlantDto[]>(
      `http://localhost:5230/api/Plant/GetPlantById/${userId}`
    );
  }

  updateWateredDate(plantId: number) {
    return this.http.put(`/api/Plant/updateWatereddate/${plantId}`, null);
  }

  setPlant(plant: any) {
    this.selectedPlant = plant;
  }

  getPlant() {
    return this.selectedPlant;
  }
}