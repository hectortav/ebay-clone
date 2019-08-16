import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thanks-signup',
  templateUrl: `./thanks-signup.component.html`,
  styleUrls: [`./thanks-signup.component.css`]
})
export class ThanksSignupComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 6000);
  }

}
