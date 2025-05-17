import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-viewplants',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  
  stats = {
    totalUsers: 5422,
    totalPlants: 1893
  };

  plants = [
    {
      id: 1,
      name: 'Rosa',
      species: 'Species Going Here',
      wateringFreq: 2,
      fertilizingFreq: 4,
      lastWatered: '2025-05-15',
      lastFertilized: '2025-05-15',
      instructions: 'No Instructions'
    },
    {
      id: 2,
      name: 'Orchidaceae',
      species: 'Species Going Here',
      wateringFreq: 3,
      fertilizingFreq: 5,
      lastWatered: '2025-05-15',
      lastFertilized: '2025-05-15',
      instructions: 'No Instructions'
    }
  ];

  deletePlant(plantId: number) {
    console.log('Deleting plant:', plantId);
    // Add your delete logic here
  }
}