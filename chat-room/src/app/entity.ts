export class User {
  _id: string;
  username: string;
  email: string;
  password: string;
  channelList: string[];
  adminChannelList: string[];
  adminGroupList: string[];
  groupAdmin: boolean;
  groupAssist: boolean;
}

export class Group {
  _id: string;
  name: string;
}

export class Channel {
  _id: string;
  name: string;
  group_id: string;
}

export class Message {
  _id: string;
  messagetext: string;
  messagetime: string;
  user: User;

  constructor(_messagetext: string, _date: string, _user: User) {
    this.messagetext = _messagetext;
    this.messagetime = _date;
    this.user = _user;
  }
}
