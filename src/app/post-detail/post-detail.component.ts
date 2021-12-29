import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Post } from '../shared/models/post.interface';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  @Input() post!: Post;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly postService: PostService
  ) { }

  ngOnInit(): void {
    // this.activatedRoute.params.pipe(
    //   map((params: Params) => {
    //     return params.id ? +params.id : null
    //   }),
    //   switchMap((id: number | null) => {
    //     if (!id) return EMPTY
    //     else return this.postService.findById(id as number);
    //   })
    // ).subscribe((post: Post) => {
    //   this.post = post;
    // }, (error) => {
    //   console.error(error);
    // })
    this.activatedRoute.params.subscribe(() => {
      map((params: Params) => {
        return params.id ? +params.id : null
      }),
      switchMap((id: number | null) => {
        if (!id) return EMPTY
        else return this.postService.findById(id as number)
      })
    })
    console.log('ini post: ', this.post);
  }
  
}
