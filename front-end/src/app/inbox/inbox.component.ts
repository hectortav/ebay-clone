import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Message } from '../_models';
import { MessagesService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  messages: Message[];
  selectedMessage: Message;
  loading: boolean = false;
  replyBox: boolean = false;
  messageForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private messagesService: MessagesService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loadAllInbox();

    this.messageForm = this.formBuilder.group({
      text: ['', Validators.required],
      subject: ['', Validators.required],
      sender: [''],
      receiver: ['']
    });
  }

  private loadAllInbox() {
    this.loading = true;
    this.messagesService.getReceived().pipe(first()).subscribe(res => {
      this.loading = false;
      let newObj: any = res;
      this.messages = newObj.messages;
    });
  }

  onSelect(message: Message): void {
    this.selectedMessage = message;
    message.read = true;
    this.messagesService.updateMessage(message).subscribe();
  }

  delete(message: Message): void {
    this.messagesService.deleteMessage(message).subscribe();
    window.location.reload();
  }

  reply() {
    this.replyBox = !this.replyBox;
  }

  // convenience getter for easy access to form fields
  get f() { return this.messageForm.controls; }

  sendMessage() {
    console.log(this.messageForm);
    this.submitted = true;

    // stop here if form is invalid
    if (this.messageForm.invalid) {
      return;
    }

    this.messageForm.value.sender = this.selectedMessage.receiver;
    this.messageForm.value.receiver = this.selectedMessage.sender;

    this.loading = true;
    this.messagesService.newMessage(this.messageForm.value)
      .pipe(first())
      .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
