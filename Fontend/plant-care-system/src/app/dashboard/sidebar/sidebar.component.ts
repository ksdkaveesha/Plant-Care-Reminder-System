// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: "sidebar.component.html",
  styleUrls: ["sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  username: string | null = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  onLogout(): void {
    console.log('Logout clicked');
    this.authService.logout();
  }

}
