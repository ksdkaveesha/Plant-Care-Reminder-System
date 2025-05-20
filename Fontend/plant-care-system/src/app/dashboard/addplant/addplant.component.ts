import { Component } from '@angular/core';
import { AddPlantDto } from '../../models/addplant.model';
import { PlantService } from '../../Services/plant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-addplant',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './addplant.component.html',
  styleUrl: './addplant.component.css'
})
export class AddplantComponent {
  plant: AddPlantDto = {
    user_id: 0,
    plant_name: '',
    species: '',
    watering_frequency: 0,
    fertilizing_frequency: 0,
    care_instructions: ''
  }

  busy     = false;
  message  = '';
  ok       = false;

  constructor(private plantSvc: PlantService) {}

  onSubmit() {
    this.busy = true;
    this.plantSvc.AddPlant(this.plant).subscribe({
      next: res => {
        this.ok = true;
        this.message = res;
        alert(this.message);
        this.busy = false;
        this.plant = { user_id: 0, plant_name: '', species: '', watering_frequency: 0, fertilizing_frequency: 0, care_instructions: '' };
      },
      error: err => {
        this.ok = false;
        this.message = 'Server error. Check console.';
        console.error(err);
        this.busy = false;
      }
    });
  }
}
