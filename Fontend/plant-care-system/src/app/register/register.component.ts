import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../Services/user.service';
import { UserDto } from '../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: UserDto = { username:'', email:'', password:'' };

  busy     = false;
  message  = '';
  ok       = false;

  constructor(private userSvc: UserService) {}

  onSubmit() {
    this.busy = true;
    this.userSvc.UserAdd(this.user).subscribe({
      next: res => {
        this.ok = true;        
        this.message = res;
        alert(this.message);
        this.busy = false;
        this.user = { username:'', email:'', password:'' };
      },
      error: err => {
        this.ok = false;
        this.message = 'Server error. Check console.';
        console.error(err);
        this.busy = false;
      }
    });
  }
}
