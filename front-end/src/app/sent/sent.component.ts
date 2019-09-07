import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Message } from '../_models';
import { MessagesService } from '../_services';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
  messages: Message[];
  selectedMessage: Message;
  loading: boolean = false;

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.loadAllSent();
  }

  private loadAllSent() {
    this.loading = true;
    this.messagesService.getSent().pipe(first()).subscribe(res => {
      this.loading = false;
      let newObj: any = res;
      this.messages = newObj.messages;
    });
  }

  onSelect(message: Message): void {
    this.selectedMessage = message;
    this.messagesService.updateMessage(message).subscribe();
    console.log(message);
  }

}
