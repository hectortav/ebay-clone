import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EnrollmentService } from '../enrollment.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private enrollmentService: EnrollmentService, private router: Router) { }

  ngOnInit() {
  }

  login(form) {
    console.log(form.value);
    this.enrollmentService.singIn(form.value).subscribe((res)=>{
      console.log("Logged in!");
      this.router.navigateByUrl('home');
    });
  }

}
