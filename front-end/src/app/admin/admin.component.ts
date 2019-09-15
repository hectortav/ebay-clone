import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { User } from '../_models';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading = false;
  users: User[] = [];
  count: number;
  current: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(x => this.loadPage(x));
  }

  private loadPage(params: any) {
    if (params.load === "unverified") {
      this.current = "Unverified Users";
      this.loading = true;
      this.userService.getUnverified().pipe(first()).subscribe(newObj => {
        this.loading = false;
        this.users = newObj.users;
        this.count = newObj.count;
      });

      return;
    }

    this.current = "All Users";
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(res => {
      this.loading = false;
      let newObj: any = res;
      this.users = newObj.users;
      this.count = newObj.count;
    });
  }

  deleteUser(user: User, i: any) {
    this.userService.deleteUser(user).subscribe();
    this.users.splice(i, 1);
    this.count--;
  }

  unverifyUser(user: User) {
    this.userService.unverifyUser(user._id)
      .pipe(first())
      .subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
        });
  }

  verifyUser(user: User, i: any) {
    this.userService.verifyUser(user._id)
      .pipe(first())
      .subscribe(
        data => {
        },
        error => {
          this.alertService.error(error);
        });
    if (this.current === "Unverified Users") {
      this.users.splice(i, 1);
      this.count--;
    }
  }

}
