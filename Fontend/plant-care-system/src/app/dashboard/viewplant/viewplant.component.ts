import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { PlantService } from '../../Services/plant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-viewplants',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './viewplant.component.html',
  styleUrls: ['./viewplant.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})

export class ViewplantComponent {
  animationState = 0;
  searchTerm: string = '';
  itemsPerPage: number | 'all' = 5;
  
  stats = {
    totalUsers: 5422,
    totalPlants: 1893
  };

  constructor(private router: Router, private plantService: PlantService) {}
  plants = [
    {
      plantId: 1,
      userId: 1,
      plantname: 'Rosa',
      species: 'Species Going Here',
      wateringFreq: 2,
      fertilizingFreq: 4,
      lastWatered: '2025-05-15',
      lastFertilized: '2025-05-15',
      careInstructions: 'No Instructions'
    },
    {
      plantId: 3,
      userId: 1,
      plantname: 'Orchidaceae',
      species: 'Species Going Here',
      wateringFreq: 3,
      fertilizingFreq: 5,
      lastWatered: '2025-05-15',
      lastFertilized: '2025-05-15',
      careInstructions: 'No Instructions'
    }
    ,
    {
      plantId: 4,
      userId: 1,
      plantname: 'Cactaceae',
      species: 'Species Going Here',
      wateringFreq: 1,
      fertilizingFreq: 2,
      lastWatered: '2025-05-15',
      lastFertilized: '2025-05-15',
      careInstructions: 'No Instructions'
    },
    {
      plantId: 5,
      userId: 1,
      plantname: 'Arecaceae',
      species: 'Species Going Here',
      wateringFreq: 2,
      fertilizingFreq: 4,
      lastWatered: '2025-05-15',
      lastFertilized: '2025-05-15',
      careInstructions: 'No Instructions'
    },
    {
      plantId: 6,
      userId: 1,
      plantname: 'Arecaceae',
      species: 'Species Going Here',
      wateringFreq: 2,
      fertilizingFreq: 4,
      lastWatered: '2025-05-15',
      lastFertilized: '2025-05-15',
      careInstructions: 'No Instructions'
    },
    {
      plantId: 7,
      userId: 1,
      plantname: 'Arecaceae',
      species: 'Species Going Here',
      wateringFreq: 2,
      fertilizingFreq: 4,
      lastWatered: '2025-05-15',
      lastFertilized: '2025-05-15',
      careInstructions: 'No Instructions'
    }
  ];

  deletePlant(plantId: number) {
    console.log('Deleting plant:', plantId);
    // Add your delete logic here
  }

  UpdatePlant(plants: any) {
    console.log('Updating plant:', plants);
    this.plantService.setPlant(plants);
    // Navigate to the update plant page
    this.router.navigate(['/dashboard/updateplant', plants.plantId]);
  }

  ngOnInit() {
    this.onItemsPerPageChange();   
  }
  
  plantList: { 
    plantId: number; 
    userId: number; 
    plantname: string; 
    species: string; 
    wateringFreq: number; 
    fertilizingFreq: number; 
    lastWatered: string; 
    lastFertilized: string; 
    careInstructions: string;
  }[] = [];  

  onItemsPerPageChange(): void {
    this.plantList =
      this.itemsPerPage === 'all'
        ? this.plants
        : this.plants.slice(0, this.itemsPerPage as number);
  }

  onSearch() {
    if (this.searchTerm) {
      this.plantList = this.plants.filter(plants => 
        plants.plantname.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.onItemsPerPageChange();
    }
  }
}