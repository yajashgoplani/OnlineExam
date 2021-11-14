import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountComponent } from './count/count.component';
import { QuizComponent } from './quiz/quiz.component';
const routes: Routes = [
  { path: '', component: CountComponent },
  { path: 'start', component: QuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
