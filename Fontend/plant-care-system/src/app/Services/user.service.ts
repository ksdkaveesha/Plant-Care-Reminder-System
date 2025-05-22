import { Injectable } from '@angular/core';
import { HttpClient }           from '@angular/common/http';
import { UserDto }              from '../models/user.model';
import { StatsDto }             from '../models/stats.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  /** POST /api/User/UserAdd */
  UserAdd(body: UserDto) {
    return this.http.post(
      'http://localhost:5230/api/User/UserAdd',
      body,
      { responseType: 'text' }  
    );
  }

  getStats() {
    return this.http.get<StatsDto>('http://localhost:5230/api/User/GetStats');
  }
  
}
