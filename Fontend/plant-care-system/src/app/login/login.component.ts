import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})

export class LoginComponent {
  user_name = '';
  password = '';
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.user_name, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', this.user_name);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Invalid username or password');
      }
    });
  }
}
