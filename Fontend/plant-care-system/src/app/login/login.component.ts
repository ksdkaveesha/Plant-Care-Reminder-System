import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [],
})

export class LoginComponent {
  constructor(private router: Router) {}

  redirectToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
