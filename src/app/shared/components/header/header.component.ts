import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authorized: boolean = false;
  username!: string;
  user!: User;
  private readonly storage: Storage = sessionStorage;

  constructor(
    private readonly sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.authorized = (this.sessionService.getSession() !== null);
    this.username = this.sessionService.getSession();
    const data = this.storage.getItem('user'); 
    this.user = JSON.parse(data as string);

    console.log('ini data user detail: ', this.user);
    
  }

}
