import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLegacy(): boolean {
    if (this.router.url == '/') {
      return true;
    }
    return false;
  }

  isAdditional(): boolean {
    if (this.router.url == '/additional') {
      return true;
    }
    return false;
  }
}
