import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { EnrollmentService } from '../enrollment.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private enrollmentService: EnrollmentService, private router: Router) { }

  ngOnInit() {
  }

  register(form) {
    console.log(form.value);
    this.enrollmentService.register(form.value).subscribe((res) => {
      console.log("Signed Up!");
      this.router.navigateByUrl('/home');
    });
  }

}