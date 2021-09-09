import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertMessage } from '../shared/models/alert-message.model';
import { User } from '../shared/models/user.interface';
import { PostService } from '../shared/services/post.service';
import { SessionService } from '../shared/services/session.service';

enum LoginFormField {
  USERNAME = 'username',
  PASSWORD = 'password'
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    [LoginFormField.USERNAME]: new FormControl(null, [ Validators.required ]),
    [LoginFormField.PASSWORD]: new FormControl(null, [ Validators.required ]),
  });

  formField: typeof LoginFormField = LoginFormField;
  authorized: boolean = false;
  userId?: number;
  user?: User;
  userList: User[] = [];
  message?: AlertMessage;
  private readonly storage: Storage = sessionStorage;

  constructor(
    private readonly sessionService: SessionService,
    private readonly postService: PostService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authorized = (this.sessionService.getSession() !== null);
    this.loadUsers();
  }

  loadUsers(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.userId = params.id ? +params.id : 0;
          return this.postService.findAllUser()
        }),
        map((users: User[]) => {
          this.user = users.find((user) => user.id === this.userId);
          return users;
        })
      ).subscribe((users: User[]) => {
        this.userList = users;
      }, (error) => {
        this.message = {
          status: 'danger',
          text: error.message
        }
      })
  }

  login(): void {
    const formData = this.form.value;

    this.userList.map((user: User) => {
      if (
        this.form.valid && 
        formData[LoginFormField.USERNAME] === user.username &&
        formData[LoginFormField.PASSWORD] === user.username) {
        this.storage.setItem('user', JSON.stringify(user));
        this.sessionService.setSession(user.username);
        this.router.navigateByUrl('dashboard');
      } else {
        this.message = {
          status: 'danger',
          text: 'Invalid Username or Password!'
        }
      }
    })
  }
}
