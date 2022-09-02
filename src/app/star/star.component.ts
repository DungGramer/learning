import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  isFilled = false;
  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.isFilled = !this.isFilled;
  }
}