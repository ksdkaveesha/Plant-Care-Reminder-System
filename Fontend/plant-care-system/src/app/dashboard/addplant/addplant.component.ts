import { Component, OnInit } from '@angular/core';
import { AddPlantDto } from '../../models/addplant.model';
import { PlantService } from '../../Services/plant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userId: number;
  [key: string]: any;
}

@Component({
  selector: 'app-addplant',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './addplant.component.html',
  styleUrls: ['./addplant.component.css']
})
export class AddplantComponent implements OnInit {
  username: string | null = null;
  userId: number | null = null;

  constructor(private authService: AuthService, private plantSvc: PlantService) {}

  ngOnInit() {
    this.username = this.authService.getUsername();

    const token = this.authService.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        this.userId = decoded.userId;
        console.log('User ID:', this.userId);
      } catch (e) {
        console.error('Invalid JWT token', e);
      }
    }
  }

  plant: AddPlantDto = {
    user_id: 0,
    plant_name: '',
    species: '',
    watering_frequency: 0,
    fertilizing_frequency: 0,
    care_instructions: ''
  };

  busy = false;
  message = '';
  ok = false;

  onSubmit() {
    if (this.userId === null) {
      alert('User ID not found.');
      return;
    }

    this.busy = true;
    this.plant.user_id = this.userId; // ✅ assign user_id from token

    this.plantSvc.AddPlant(this.plant).subscribe({
      next: res => {
        this.ok = true;
        this.message = res;
        alert(this.message);
        this.busy = false;
        this.plant = {
          user_id: 0,
          plant_name: '',
          species: '',
          watering_frequency: 0,
          fertilizing_frequency: 0,
          care_instructions: ''
        };
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
