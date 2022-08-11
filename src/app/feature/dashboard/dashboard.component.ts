import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userName: any = '';
  constructor(public authService: AuthService) {
    this.userName = localStorage.getItem('user');
  }

  ngOnInit(): void {}
}
