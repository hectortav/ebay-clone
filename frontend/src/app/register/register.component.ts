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
    let serializedForm = JSON.stringify(form.value);
    console.log(serializedForm);

    this.enrollmentService.register(form.value).subscribe((res) => {
      console.log("Signed Up!");
      this.router.navigateByUrl('/');
      console.log(res);
    });
  }

}