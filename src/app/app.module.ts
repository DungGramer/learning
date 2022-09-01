import { SummaryPipe } from './summary.pipe';
import { AuthorsService } from './authors.service';
import { CourseService } from './course/course.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { AuthorsComponent } from './authors/authors.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CourseComponent, AuthorsComponent, SummaryPipe],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    CourseService,
    AuthorsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
