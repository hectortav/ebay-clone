import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MessagesService } from '../_services';
import { Message } from '../_models';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  loading = false;
  messages: Message[];
  currentFolder: string;

  constructor(
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.currentFolder = 'inbox';
  }

  folderChoice(choice: string) {
    this.currentFolder = choice;
  }
}
