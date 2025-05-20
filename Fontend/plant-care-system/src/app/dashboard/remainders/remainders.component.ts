import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RemainderService } from '../../Services/remainders.service';
import { RemainderDto } from '../../models/remainder.model';

@Component({
  selector: 'app-remainders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './remainders.component.html',
  styleUrl: './remainders.component.css'
})
export class RemaindersComponent {
  userIdTerm = '1'; // default user ID
  dateTerm = new Date().toISOString().slice(0, 10); // today
  loading = signal(true);
  errorMsg = signal('');
  reminders = signal<RemainderDto[]>([]);

  constructor(private router: Router, private remainderService: RemainderService) {}

  /* ────────────────── Initial Load ─────────────────── */
  ngOnInit() {
    this.fetchByUser(+this.userIdTerm, this.dateTerm);
  }

  /* ────────────────── Search Handler ───────────────── */
  onSearch(): void {
    const userId = +this.userIdTerm.trim();
    const reminderDate = this.dateTerm || new Date().toISOString().slice(0, 10);

    if (isNaN(userId)) {
      this.reminders.set([]);
      this.errorMsg.set('Invalid user ID.');
      return;
    }

    this.fetchByUser(userId, reminderDate);
  }

  /* ────────── Centralised Fetch with Error Handling ───── */
  private fetchByUser(userId: number, date: string): void {
    this.loading.set(true);
    this.errorMsg.set(''); // clear previous error

    this.remainderService.GetPlantsByUser(userId, date).subscribe({
      next: (rows) => {
        this.reminders.set(rows);
        this.loading.set(false);
      },
      error: (err) => {
        this.reminders.set([]); // clear previous data

        if (err.status === 404) {
          this.errorMsg.set(err.error || 'No reminders found for this date.');
        } else if (err.status === 0) {
          this.errorMsg.set('Unable to connect to the server. Please check your network or backend status.');
        } else {
          this.errorMsg.set('Unexpected server error. Check browser console for details.');
          console.error('Server error:', err);
        }

        this.loading.set(false);
      }
    });
  }

  markAsWatered(plantId: number): void {
    if (!plantId) return;

    this.remainderService.updateWateredDate(plantId).subscribe({
      next: () => {
        alert('Plant marked as watered!');
        this.onSearch(); // Refresh list after update
      },
      error: err => {
        console.error('Error updating watered date:', err);
        alert('Failed to update. Please try again.');
      }
    });
  }


  markAsFertilized(plantId: number): void {
    if (!plantId) return;

    this.remainderService.UpdateFertilizedDate(plantId).subscribe({
      next: () => {
        alert('Plant marked as fertilized!');
        // Optionally refresh reminders
        this.onSearch(); 
      },
      error: err => {
        console.error('Error updating fertilized date:', err);
        alert('Failed to update. Please try again.');
      }
    });
  }

}
