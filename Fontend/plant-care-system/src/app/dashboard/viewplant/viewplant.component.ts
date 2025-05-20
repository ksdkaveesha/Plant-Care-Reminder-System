import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

import { PlantService } from '../../Services/plant.service';
import { PlantDto }   from '../../models/plant.model';

@Component({
  selector   : 'app-viewplants',
  standalone : true,
  imports    : [CommonModule, RouterModule, FormsModule],
  templateUrl: './viewplant.component.html',
  styleUrls  : ['./viewplant.component.css'],
  animations : [
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

  /* ────────────────────────── UI state ────────────────────────── */
  searchTerm   = '';
  itemsPerPage: number | 'all' = 5;

  loading   = signal(true);
  errorMsg  = signal('');
  plants    = signal<PlantDto[]>([]);
  plantList = signal<PlantDto[]>([]);     // list that the table actually shows

  /* ───────────────────────── dashboard stats (mock) ───────────── */
  stats = { totalUsers: 5422, totalPlants: 1893 };

  visibleCount: number = 0;

  constructor(private router: Router, private plantService: PlantService) { }

    /* ────────────────────────── table helpers ───────────────────── */
  updatePlantList(): void {
    const src = this.plants();          // ← read the signal value
    if (this.itemsPerPage === 'all') {
      this.plantList.set(src);
    } else {
      this.plantList.set(src.slice(0, this.itemsPerPage));
    }
  }

  /* ─────────── call this whenever either
        – plants signal changes  OR
        – itemsPerPage control changes                           */
  private refreshTable(): void {
    const src   = this.plants();                   // latest rows
    const count = this.itemsPerPage === 'all'
                    ? src.length
                    : Math.min(src.length, this.itemsPerPage);

    /* slice for paging */
    this.plantList.set(this.itemsPerPage === 'all'
                        ? src
                        : src.slice(0, this.itemsPerPage));

    /* if you show “X items” somewhere, expose the count */
    this.visibleCount = count;
  }

  /* ────────────────── dropdown change ────────────────── */
  onItemsPerPageChange(): void {
    this.refreshTable();
  }

  /* ────────────────── initial load ───────────────────── */
  ngOnInit() {
    this.fetchByUser(1);                   // default user
  }

  /* ────────────────── search handler ─────────────────── */
  onSearch(): void {
    const term = this.searchTerm.trim();
    if (!term) {                    // blank → revert to user-1
      this.fetchByUser(1);
      return;
    }

    const id = +term;
    if (isNaN(id)) {
      this.plantList.set([]);
      this.visibleCount = 0;
      return;
    }
    this.fetchByUser(id);
  }

  /* ─────────── centralised fetch (uses same code) ────── */
  private fetchByUser(userId: number): void {
    this.loading.set(true);
    this.plantService.GetPlantsByUser(userId).subscribe({
      next : rows => {
        this.plants.set(rows);
        this.refreshTable();
        this.loading.set(false);
      },
      error: err => {
        this.errorMsg.set('Server error – check console.');
        console.error(err);
        this.loading.set(false);
      }
    });
  }




  /* ───────────────────────── row actions ──────────────────────── */
  deletePlant(id: number) {
    console.log('Deleting plant', id);
    // TODO: call delete API, then refresh list
  }

  updatePlant(p: PlantDto) {
    this.plantService.setPlant(p);
    this.router.navigate(['/dashboard/updateplant', p.plantId]);
  }
}
