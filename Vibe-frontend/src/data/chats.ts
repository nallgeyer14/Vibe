import type { Chat } from '../models/chat';

export const chats: Chat[] = [
    {
      id: 1,
      name: 'Alex',
      photo: 'https://i.pravatar.cc/400?img=11',
      lastMessage: 'You going tonight?',
      time: '9:41 AM',
      unread: 2,
      isGroup: false,
      messages: [
        { id: 1, text: "Hey! Saw we matched on Vibe 👋", from: 'them', time: '9:30 AM' },
        { id: 2, text: "Hey! Yeah what a coincidence lol", from: 'me', time: '9:32 AM' },
        { id: 3, text: "Are you going to the rec center pickup basketball tonight?", from: 'them', time: '9:38 AM' },
        { id: 4, text: "You going tonight?", from: 'them', time: '9:41 AM' },
      ],
    },
    {
      id: 2,
      name: 'Pickup Basketball 🏀',
      photo: '',
      lastMessage: 'Anyone bringing a ball?',
      time: '8:15 AM',
      unread: 5,
      isGroup: true,
      messages: [
        { id: 1, text: "Welcome to the Pickup Basketball group! 🏀", from: 'them', time: '7:00 AM' },
        { id: 2, text: "I'll be there at 7, anyone need a ride?", from: 'them', time: '7:45 AM' },
        { id: 3, text: "On my way!", from: 'me', time: '8:00 AM' },
        { id: 4, text: "Anyone bringing a ball?", from: 'them', time: '8:15 AM' },
      ],
    },
    {
      id: 3,
      name: 'Zoe',
      photo: 'https://i.pravatar.cc/400?img=57',
      lastMessage: 'The view was incredible 😍',
      time: 'Yesterday',
      unread: 0,
      isGroup: false,
      messages: [
        { id: 1, text: "That hike was AMAZING", from: 'them', time: 'Yesterday 8:45 AM' },
        { id: 2, text: "Right?? We need to do it again", from: 'me', time: 'Yesterday 8:47 AM' },
        { id: 3, text: "The view was incredible 😍", from: 'them', time: 'Yesterday 8:48 AM' },
      ],
    },
    {
      id: 4,
      name: 'Coffee & Study ☕',
      photo: '',
      lastMessage: 'See you all tomorrow!',
      time: 'Yesterday',
      unread: 0,
      isGroup: true,
      messages: [
        { id: 1, text: "Coffee & Study group created!", from: 'them', time: 'Yesterday 10:00 AM' },
        { id: 2, text: "I'll grab a spot around 1:45", from: 'them', time: 'Yesterday 1:30 PM' },
        { id: 3, text: "Perfect, I'll bring my laptop and snacks", from: 'me', time: 'Yesterday 1:35 PM' },
        { id: 4, text: "See you all tomorrow!", from: 'them', time: 'Yesterday 4:00 PM' },
      ],
    },
    {
      id: 5,
      name: 'Darius',
      photo: 'https://i.pravatar.cc/400?img=33',
      lastMessage: 'Bro the car meet was wild',
      time: 'Monday',
      unread: 0,
      isGroup: false,
      messages: [
        { id: 1, text: "Bro the car meet was wild", from: 'them', time: 'Monday 11:00 PM' },
        { id: 2, text: "So fun!! That blue Evo was insane", from: 'me', time: 'Monday 11:05 PM' },
      ],
    },
  ];
  