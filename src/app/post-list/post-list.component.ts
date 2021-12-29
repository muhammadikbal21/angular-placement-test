import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlertMessage } from '../shared/models/alert-message.model';
import { Post } from '../shared/models/post.interface';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  p: number = 1
  postId?: number;
  post?: Post;
  list: Post[] = [];
  message?: AlertMessage;

  constructor(
    private readonly postService: PostService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.postService.notify()
      .subscribe((reload: boolean) => {
        if (reload) {
          this.list = [];
          this.loadList();
        }
      })

    this.loadList();
  }

  loadList(): void {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.postId = params.id ? +params.id : 0;
          console.log('ini params: ', params);
          return this.postService.findAll()
          
        }),
        map((posts: Post[]) => {
          this.post = posts.find((post) => post.id === this.postId);
          return posts;
        })
      ).subscribe((posts: Post[]) => {
        this.list = posts;
      }, (error) => {
        this.message = {
          status: 'danger',
          text: error.message
        }
      })
  }
}
