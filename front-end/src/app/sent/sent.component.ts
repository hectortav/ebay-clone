import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Message } from '../_models';
import { MessagesService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {
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
    this.loadAllSent();

    this.messageForm = this.formBuilder.group({
      text: ['', Validators.required],
      subject: ['', Validators.required],
      sender: [''],
      receiver: [''],
      time: []
    });
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
    console.log(message);
    this.selectedMessage = message;
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

    this.messageForm.value.sender = this.selectedMessage.sender;
    this.messageForm.value.receiver = this.selectedMessage.receiver;
    this.messageForm.value.time = new Date();

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
