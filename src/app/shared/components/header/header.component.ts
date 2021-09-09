import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authorized: boolean = false;
  username!: string;

  constructor(
    private readonly sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.authorized = (this.sessionService.getSession() !== null);
    this.username = this.sessionService.getSession()
  }

}
