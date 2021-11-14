import { animate, state, style, transition, trigger } from '@angular/animations';

import { ChangeDetectorRef, Component, OnInit, ViewRef } from '@angular/core';
import { interval } from 'rxjs';
import { Subject } from 'rxjs';

import { QuizService } from '../quiz.service';

export interface Entry{
  created:Date;
  id:string;

}
interface Quiz{
  question: string;
  answer: { option: string, correct: boolean } [];
}
export interface TimeSpan{
  hours: number;
  minntes: number;
  seconds: number;
}
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    trigger('answer', [
      transition('void => *', [style({ opacity: 0, transform: 'translateY(-3rem)' }), animate(300)])
    ])
  ]
})
export class QuizComponent implements OnInit {
  quizzes:Quiz[] = [];

  currentQuiz: number=0;
  answerSelected = false;
  correctAnswers = 0;
  incorrectAnswers = 0;
  prevAnswered:number[] = [];

  result = false;
  resultStatus = 'Show Result';

  constructor(private quizService: QuizService,private changeDetector : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();
    this.currentQuiz = this.getRandom();

    this.prevAnswered.push(this.currentQuiz);
    //timer
    this.addEntry();
    interval(1000).subscribe(()=>{
      if(!(this.changeDetector as ViewRef).destroyed){
        this.changeDetector.detectChanges();
      }
    });
    this.changeDetector.detectChanges();
  }
  onAnswer(option: boolean) {
    this.answerSelected = true;
    setTimeout(() => {
      let newQuiz = this.getRandom();
      while (this.prevAnswered.includes(newQuiz) && this.prevAnswered.length < 10) {
        newQuiz = this.getRandom();
      }
      this.currentQuiz = newQuiz;
      this.prevAnswered.push(this.currentQuiz);

      this.answerSelected = false;
    }, 300);

    if (option) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }

  }

  getRandom() {
    return Math.floor(Math.random() * this.quizzes.length);
  }

  showResult() {
    this.result = true;
    this.resultStatus = ' Start Again ';
  }
  StartAgain() {
    this.prevAnswered = [];
    this.prevAnswered.push(this.getRandom());
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
  }
  
 //timer

 public interval;
 private destroyed$ =new Subject();
 newId:string;
 entries:Entry[]=[];
 getElaspsedTime(entry:Entry):TimeSpan{
   let totalSeconds=Math.floor((new Date().getTime() - entry.created.getTime()) /1000);
   let hours=0;
   let minntes=0;
   let seconds=0;
   if(totalSeconds>=3600){
     hours=Math.floor(totalSeconds/3600);
     totalSeconds-=3600*hours;
   }
   if(totalSeconds>=60){
     minntes=Math.floor(totalSeconds/60);
     totalSeconds-=60*minntes;
   }
   seconds=totalSeconds;

   return{
     hours:hours,
     minntes:minntes,
     seconds:seconds
   }
 }

  addEntry(){
    this.entries.push({
      created:new Date(),
      id: this.newId
    });
    this.newId='';
  }
  ngOnDestroy(){
    this.destroyed$.subscribe;
    this.destroyed$.complete();
  }

}
