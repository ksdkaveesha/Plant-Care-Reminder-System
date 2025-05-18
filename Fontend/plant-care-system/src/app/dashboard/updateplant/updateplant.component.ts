import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { PlantService } from '../../Services/plant.service';

@Component({
  selector: 'app-updateplant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateplant.component.html',
  styleUrl: './updateplant.component.css'
})

export class UpdateplantComponent {
  private route = inject(ActivatedRoute);
  private plantService = inject(PlantService);

  plant: any = {
    plantId: '',
    plantname: '',
    species: '',
    wateringFreq: '',
    fertilizingFreq: '',
    lastWatered: '',
    lastFertilized: '',
    careInstructions: ''
  };

  ngOnInit() {
    // 1. get the id from the URL
    const id = +this.route.snapshot.paramMap.get('id')!;

    const selected = this.plantService.getPlant();

    if (selected && selected.plantId === id) {
      this.plant = { ...selected };
    }
  }
}
