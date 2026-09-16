export interface Profile {
  id: number;
  name: string;
  age: number;
  school: string;
  bio: string;
  photo: string;
  interests: string[];
  match: number;
  socialPref: string;
  lookingFor: string;
}

export interface Activity {
  id: number;
  title: string;
  category: string;
  emoji: string;
  time: string;
  date: string;
  location: string;
  joined: number;
  max: number;
  description: string;
  creator: string;
  creatorPhoto: string;
  color: string;
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

export interface Message {
  id: number;
  text: string;
  from: 'me' | 'them';
  time: string;
}

export const myProfile = {
  name: 'Jordan',
  age: 22,
  school: 'Psychology @ USC',
  bio: "Love exploring new restaurants, going to concerts, and weekend hikes. Always down to meet cool people.",
  photo: 'https://i.pravatar.cc/400?img=12',
  interests: ['Music', 'Hiking', 'Food', 'Travel', 'Fitness'],
  socialPref: 'Ambivert — good in groups and one-on-one',
  lookingFor: 'Genuine friendships, activity partners',
};

export const profiles: Profile[] = [
  {
    id: 1,
    name: 'Alex',
    age: 21,
    school: 'Computer Science @ UCLA',
    bio: 'Into late-night coding sessions, pickup basketball, and finding the best tacos in the city.',
    photo: 'https://i.pravatar.cc/400?img=11',
    interests: ['Gaming', 'Fitness', 'Cars', 'Tech'],
    match: 87,
    socialPref: 'Introvert who loves small groups',
    lookingFor: 'Gaming buddies & gym partners',
  },
  {
    id: 2,
    name: 'Maya',
    age: 23,
    school: 'Film Studies @ NYU',
    bio: 'Film nerd, aspiring director, will drag you to obscure screenings and make it worth it.',
    photo: 'https://i.pravatar.cc/400?img=47',
    interests: ['Movies', 'Art', 'Photography', 'Music'],
    match: 79,
    socialPref: 'Extrovert — loves big gatherings',
    lookingFor: 'Creative partners & concert friends',
  },
  {
    id: 3,
    name: 'Darius',
    age: 24,
    school: 'Business @ Howard',
    bio: 'Car enthusiast. Weekend hiker. Amateur chef. I make a mean jerk chicken.',
    photo: 'https://i.pravatar.cc/400?img=33',
    interests: ['Cars', 'Hiking', 'Food', 'Sports'],
    match: 91,
    socialPref: 'Ambivert',
    lookingFor: 'Activity partners & car meet crew',
  },
  {
    id: 4,
    name: 'Priya',
    age: 22,
    school: 'Pre-Med @ Stanford',
    bio: 'Studying hard but always up for a coffee run or study session. Big fan of indie music.',
    photo: 'https://i.pravatar.cc/400?img=60',
    interests: ['Music', 'Reading', 'Coffee', 'Fitness'],
    match: 83,
    socialPref: 'Prefers one-on-one or small groups',
    lookingFor: 'Study buddies & friends who explore',
  },
  {
    id: 5,
    name: 'Marcus',
    age: 20,
    school: 'Architecture @ Georgia Tech',
    bio: "Skateboarder, photographer, design obsessive. Life's better when it looks good.",
    photo: 'https://i.pravatar.cc/400?img=15',
    interests: ['Photography', 'Art', 'Tech', 'Music'],
    match: 75,
    socialPref: 'Flexible — depends on the vibe',
    lookingFor: 'Creative crew & skating companions',
  },
  {
    id: 6,
    name: 'Zoe',
    age: 21,
    school: 'Communications @ Northwestern',
    bio: 'Podcast host wannabe. Loves karaoke nights, spontaneous road trips, and way too much iced coffee.',
    photo: 'https://i.pravatar.cc/400?img=57',
    interests: ['Travel', 'Music', 'Food', 'Hiking'],
    match: 88,
    socialPref: 'Extrovert who thrives in crowds',
    lookingFor: 'Adventure squad & foodie friends',
  },
];

export const activities: Activity[] = [
  {
    id: 1,
    title: 'Pickup Basketball',
    category: 'Sports',
    emoji: '🏀',
    time: '7:00 PM',
    date: 'Tonight',
    location: 'Student Recreation Center',
    joined: 4,
    max: 8,
    description: 'Just looking for people to run some 3v3 or 5v5. All skill levels welcome — we keep it fun. Bring water.',
    creator: 'Alex',
    creatorPhoto: 'https://i.pravatar.cc/400?img=11',
    color: '#E85D04',
  },
  {
    id: 2,
    title: 'Coffee & Study',
    category: 'Social',
    emoji: '☕',
    time: '2:00 PM',
    date: 'Tomorrow',
    location: 'Blue Bottle Coffee — Melrose',
    joined: 2,
    max: 5,
    description: 'Quiet study sesh with good coffee vibes. Bring whatever you\'re working on. No one will judge your screen.',
    creator: 'Priya',
    creatorPhoto: 'https://i.pravatar.cc/400?img=60',
    color: '#9333EA',
  },
  {
    id: 3,
    title: 'Car Meet',
    category: 'Cars',
    emoji: '🚗',
    time: '8:00 PM',
    date: 'Saturday',
    location: 'Rose Bowl Parking Lot',
    joined: 12,
    max: 20,
    description: 'Monthly casual meet. All makes and models welcome. Music, food trucks, good people.',
    creator: 'Darius',
    creatorPhoto: 'https://i.pravatar.cc/400?img=33',
    color: '#0EA5E9',
  },
  {
    id: 4,
    title: 'Gaming Night',
    category: 'Gaming',
    emoji: '🎮',
    time: '9:00 PM',
    date: 'Friday',
    location: 'Online — Discord',
    joined: 3,
    max: 6,
    description: 'Valorant mostly but can flex to whatever. Chill vibes, no toxic energy. Jump in voice chat and we\'ll sort teams.',
    creator: 'Marcus',
    creatorPhoto: 'https://i.pravatar.cc/400?img=15',
    color: '#6D28D9',
  },
  {
    id: 5,
    title: 'Sunrise Hike',
    category: 'Outdoors',
    emoji: '🥾',
    time: '5:30 AM',
    date: 'Sunday',
    location: 'Runyon Canyon Park',
    joined: 5,
    max: 10,
    description: 'Early rise, worth it for the view. ~4 miles, moderate difficulty. Sunrise from the top is unreal. Carpooling available.',
    creator: 'Zoe',
    creatorPhoto: 'https://i.pravatar.cc/400?img=57',
    color: '#059669',
  },
  {
    id: 6,
    title: 'Indie Concert',
    category: 'Music',
    emoji: '🎵',
    time: '8:00 PM',
    date: 'Next Friday',
    location: 'The Echoplex — Echo Park',
    joined: 3,
    max: 6,
    description: 'Beabadoobee & Soccer Mommy opening acts. Got extra tickets. Great way to meet music people and have a fun night.',
    creator: 'Maya',
    creatorPhoto: 'https://i.pravatar.cc/400?img=47',
    color: '#DB2777',
  },
];

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

export const interests = [
  { label: 'Fitness', emoji: '💪' },
  { label: 'Gaming', emoji: '🎮' },
  { label: 'Cars', emoji: '🚗' },
  { label: 'Music', emoji: '🎵' },
  { label: 'Sports', emoji: '⚽' },
  { label: 'Technology', emoji: '💻' },
  { label: 'Food', emoji: '🍜' },
  { label: 'Movies', emoji: '🎬' },
  { label: 'Hiking', emoji: '🥾' },
  { label: 'Art', emoji: '🎨' },
  { label: 'Travel', emoji: '✈️' },
  { label: 'Photography', emoji: '📷' },
  { label: 'Reading', emoji: '📚' },
  { label: 'Coffee', emoji: '☕' },
  { label: 'Concerts', emoji: '🎤' },
  { label: 'Skateboarding', emoji: '🛹' },
  { label: 'Cooking', emoji: '🧑‍🍳' },
  { label: 'Fashion', emoji: '👟' },
  { label: 'Basketball', emoji: '🏀' },
  { label: 'Anime', emoji: '⛩️' },
];
