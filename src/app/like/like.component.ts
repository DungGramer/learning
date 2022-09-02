import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent {
  @Input('likesCount') likesCount: number = 0;
  @Input('isActive') isActive: boolean = false;

  onClick() {
    this.likesCount += this.isActive ? -1 : 1;
    this.isActive = !this.isActive;
  }
}
