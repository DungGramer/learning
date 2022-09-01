import { AuthorsService } from './../authors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors;
  isActive;
  email = 'example@domain.com';
  lorem = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus at neque ab saepe numquam facilis exercitationem molestias minima accusantium illum possimus consequatur iure, ea praesentium suscipit. Est cumque necessitatibus ut provident iusto ipsam itaque possimus unde et nam blanditiis ea, harum quasi in fugit animi perferendis. Dolore recusandae nobis in aperiam eum consectetur ut. Similique at optio et molestias omnis.';
  constructor(service: AuthorsService) {
    this.authors = service.getAuthors();
    this.isActive = true;
  }

  onSave($event: MouseEvent) {
    $event.stopPropagation();

    console.log('Clicked', $event);
  }

  onKeyUp() {
    console.log(this.email);
  }

  ngOnInit(): void {
  }

}
