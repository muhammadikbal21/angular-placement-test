import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionService } from './shared/services/session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientService } from './shared/services/http-client.service';
import { PostService } from './shared/services/post.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    PostDetailComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    SessionService,
    HttpClientService,
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
