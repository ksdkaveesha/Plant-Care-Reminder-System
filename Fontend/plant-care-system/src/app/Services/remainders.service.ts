import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RemainderDto } from '../models/remainder.model';

@Injectable({ providedIn: 'root' })
export class RemainderService {
  private selectedPlant: any;

  constructor(private http: HttpClient) {}
  
  /** GET  /api/Plant/ByUser/{userId}  */
  getRemindersByUser(userId: number, date: string): Observable<RemainderDto[]> {
    return this.http.get<RemainderDto[]>(`http://localhost:5230/api/Remainder/GetRemainder/${userId}/${date}`);
  }


  updateWateredDate(plantId: number) {
    const payload = JSON.stringify(new Date().toISOString());

    return this.http.put(
      `http://localhost:5230/api/Plant/UpdateLastWateredDate/${plantId}`,
      payload, 
      { 
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }



  UpdateFertilizedDate(plantId: number) {
    const payload = JSON.stringify(new Date().toISOString());
    return this.http.put(`http://localhost:5230/api/Plant/UpdateLastFertilizedDate/${plantId}`, payload,
      { 
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
  }
}