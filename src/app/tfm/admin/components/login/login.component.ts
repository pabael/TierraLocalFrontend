import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const isAuthenticated = this.authService.login(this.username, this.password);
    if (isAuthenticated) {
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
    }
  }
}
