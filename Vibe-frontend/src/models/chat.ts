export interface Message {
    id: number;
    text: string;
    from: 'me' | 'them';
    time: string;
  }
  
  export interface Chat {
    id: number;
    name: string;
    photo: string;
    lastMessage: string;
    time: string;
    unread: number;
    isGroup: boolean;
    messages: Message[];
  }