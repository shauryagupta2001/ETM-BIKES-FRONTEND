import { Component } from '@angular/core';

@Component({
  selector: 'app-tl-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './tl-dashboard.component.html',
  styleUrl: './tl-dashboard.component.css'
})
export class TlDashboardComponent {
  public isNavOpen = true;
 toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}
