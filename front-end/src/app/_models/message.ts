export class Message {
    _id?: string;
    sender: string;
    receiver: string;
    subject: string;
    time?: Date;
    text: string;
    read: Boolean;
}