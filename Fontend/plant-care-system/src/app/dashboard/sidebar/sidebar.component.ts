// dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: "sidebar.component.html",
  styleUrls: ["sidebar.component.css"],
})
export class SidebarComponent {}
