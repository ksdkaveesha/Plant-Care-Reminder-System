import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RemainderService } from '../../Services/remainders.service';
import { RemainderDto } from '../../models/remainder.model';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../Helpers/jwt.helper';

@Component({
  selector: 'app-remainders',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './remainders.component.html',
  styleUrl: './remainders.component.css'
})
export class RemaindersComponent {
  dateTerm = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  loading = signal(true);
  errorMsg = signal('');
  reminders = signal<RemainderDto[]>([]);
  userId: number | null = null;

  constructor(private router: Router, private remainderService: RemainderService) {}

  /* ─────────────── On Component Init ─────────────── */
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        this.userId = decoded.userId;

        if (this.userId) {
          this.fetchReminders(this.userId, this.dateTerm);
        } else {
          this.errorMsg.set('User ID not found in token.');
          console.error('User ID not found in token');
        }
      } catch (err) {
        this.errorMsg.set('Invalid token.');
        console.error('Error decoding token:', err);
      }
    } else {
      this.errorMsg.set('Please log in first.');
      console.error('Token not found in localStorage');
    }
  }

  /* ─────────────── Search by Date ─────────────── */
  onSearch(): void {
    const reminderDate = this.dateTerm || new Date().toISOString().slice(0, 10);

    if (!this.userId || isNaN(this.userId)) {
      this.reminders.set([]);
      this.errorMsg.set('Invalid user ID.');
      return;
    }

    this.fetchReminders(this.userId, reminderDate);
  }

  /* ─────────────── API Call to Fetch Reminders ─────────────── */
  private fetchReminders(userId: number, date: string): void {
    this.loading.set(true);
    this.errorMsg.set('');

    this.remainderService.getRemindersByUser(userId, date).subscribe({
      next: rows => {
        this.reminders.set(rows);
        this.loading.set(false);
      },
      error: err => {
        this.loading.set(false);

        if (err.status === 404) {
          this.reminders.set([]);
          this.errorMsg.set('No reminders found for this date.');
        } else {
          this.errorMsg.set('Server error. Please try again later.');
        }

        console.error('Error fetching remainders:', err);
      }
    });
  }


  /* ─────────────── Mark Watered ─────────────── */
  markAsWatered(plantId: number): void {
    if (!plantId) return;

    this.remainderService.updateWateredDate(plantId).subscribe({
      next: () => {
        alert('Plant marked as watered!');
      },
      error: err => {
        console.error('Error updating watered date:', err);
        alert('Failed to update. Please try again.');
      },
      complete: () => {
        this.onSearch(); // Always refresh
      }
    });
  }


  /* ─────────────── Mark Fertilized ─────────────── */
  markAsFertilized(plantId: number): void {
    if (!plantId) return;

    this.remainderService.UpdateFertilizedDate(plantId).subscribe({
      next: () => {
        alert('Plant marked as fertilized!');
        this.onSearch();
      },
      error: err => {
        console.error('Error updating fertilized date:', err);
        alert('Failed to update. Please try again.');
      }
    });
  }
}
