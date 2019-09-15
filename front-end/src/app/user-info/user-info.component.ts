import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user: User;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.userService.getById(this.id).pipe(first()).subscribe(newObj => {
      console.log(newObj);
      this.user = newObj.user;
    });
  }

}
