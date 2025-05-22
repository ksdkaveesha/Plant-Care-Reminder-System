import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { PlantService } from '../../Services/plant.service';
import { PlantDto }   from '../../models/plant.model';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../Helpers/jwt.helper';
import { StatsDto } from '../../models/stats.model';
import { UserService } from '../../Services/user.service';


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
  stats = signal<StatsDto>({ totalUsers: 0, totalPlants: 0 });
  errorMsg = signal('');

  /* ────────────────────────── UI state ────────────────────────── */
  searchTerm   = '';
  itemsPerPage: number | 'all' = 5;

  loading   = signal(true);
  plants    = signal<PlantDto[]>([]);
  plantList = signal<PlantDto[]>([]);     // list that the table actually shows


  visibleCount: number = 0;

  constructor(private router: Router, private plantService: PlantService, private userService: UserService) { }

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
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.userId;

      if (userId) {
        this.fetchByUser(userId);
      } else {
        console.error('User ID not found in token');
      }
    } else {
      console.error('Token not found in localStorage');
    }

    this.userService.getStats().subscribe({
      next: data => this.stats.set(data),
      error: err => {
        console.error('Failed to load stats', err);
        this.errorMsg.set('Could not load statistics.');
      },
    });
  }  

  /* ─────────── centralised fetch (uses same code) ────── */
  private fetchByUser(userId: number): void {
    this.plantService.GetPlantsByUser(userId).subscribe({
      next: rows => {
        this.plants.set(rows);      // Set the fetched data
        this.refreshTable();        // Update the visible table
      },
      error: err => {
        console.error('Error fetching plants:', err);
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
