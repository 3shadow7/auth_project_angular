import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'auth-project';
  currentRoute: string = '';
  constructor(private router: Router) {

  this.router.events.subscribe(() => {
    this.currentRoute = this.router.url; //* Get the current route URL
  });
  }

}
