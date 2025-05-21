import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent {
  username: string | null = null;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    console.log('Dashboard username:', this.username); // ✅ Debug log
  }
}
