import finalBirthdayImg from '../assets/images/final_birthday.png';

import finaleMp3 from '../assets/audio/finale.mp3';

import introMp3 from '../assets/audio/intro.mp3';

import childhoodMp3 from '../assets/audio/childhood.mp3';

import familyMp3 from '../assets/audio/family.mp3';

import fatherMp3 from '../assets/audio/father.mp3';

// ============================================================================

// CENTRAL CONFIGURATION — CINEMATIC PERSONALIZED BIRTHDAY EXPERIENCE

// ============================================================================

// Privacy Notice: Original reference photographs are NOT included or referenced.

// Only the cartoon images and provided family/father photographs are used.

// ============================================================================

export const birthdayData = {

  name: "Himmu",

  // Section 1: Cinematic Intro Lines

  intro: {

    line1: "Today is not just another day...",

    line2: "Today is the day a beautiful soul came into this world.",

    line3: "So before we celebrate...",

    line4: "Let's take a little moment to celebrate you.",

    buttonText: "BEGIN ❤️"

  },

  // Section 2 & 3: Childhood Cartoon Images

  childhood: [

    {

      id: "childhood-1",

      image: "/assets/images/childhood-01-cartoon.png",

      title: "Look at this little girl...",

      caption: "So innocent, so cute, and already so special."

    },

    {

      id: "childhood-2",

      image: "/assets/images/childhood-02-cartoon.png",

      title: "And look how she grew...",

      caption: "From those little moments to the wonderful person she is today."

    }

  ],

  // Section 4: Present Cartoon Image

  present: {

    image: "/assets/images/present-cartoon.png",

    line1: "And here she is...",

    line2: "The little girl grew into this beautiful woman.",

    line3: "Someone who makes life brighter just by being herself.",

    wish: "Happy Birthday, Himmu ❤️"

  },

  wish: {

    image: finalBirthdayImg || "/assets/images/final_birthday.png",

  },

  // Section 5: Family Photographs

  familyHeader: {

    title: "Behind every beautiful person is a beautiful family.",

    caption: "The people who gave you love, memories, strength, and a place to call home."

  },

  family: [

    {

      id: "fam-1",

      image: "/assets/images/family-01.jpg",

      caption: "A lifetime of love in one beautiful moment."

    },

    {

      id: "fam-2",

      image: "/assets/images/family-02.jpg",

      caption: "The people who will always stand beside you."

    },

    {

      id: "fam-3",

      image: "/assets/images/family-03.jpg",

      caption: "The little moments that become the most precious memories."

    }

  ],

  // Section 6: Father + Daughter Photograph

  fatherDaughter: {

    image: "/assets/images/father-daughter.jpg",

    line1: "Some love is too deep for words...",

    line2: "And some bonds never really end.",

    line3: "Years may pass, and life may change...",

    line4: "But the love between a father and his daughter stays forever.",

    line5: "A father's love always has a special place in his daughter's heart."

  },

  // Section 7: Father's Birthday Video

  fatherBirthdayVideo: "/assets/videos/father-birthday-wish.mp4",

  fatherVideoHeader: {

    title: "A special birthday message...",

    subtitle: "With all the love of a father for his Himmu ❤️"

  },

  // Section 8: My Birthday Video

  myBirthdayVideo: "/assets/videos/my-birthday-wish.mp4",

  myVideoHeader: {

    intro1: "And now...",

    intro2: "A little birthday wish from me, just for you."

  },

  // Section 9: Celebration & Montage

  celebrationHeader: {

    line1: "Enough emotions...",

    line2: "Now it's time to celebrate",

    line3: "YOU, Himmu ❤️"

  },

  // Section 10: Birthday Cake

  birthdayCake: {

    instruction: "Close your eyes, make a wish, and blow the candles.",

    wishGrantedText: "May your wish find its way to you ✨"

  },

  // Section 11: Final Message

  finalMessage: {

    heading: "HAPPY BIRTHDAY",

    name: "Himmu ❤️",

    lines: [

      "You deserve a life full of happiness, love, and beautiful moments.",

      "Keep that beautiful smile forever.",

      "Never stop being the wonderful person you are.",

      "May this new year of your life bring you everything your heart wishes for.",

      "Happy Birthday, Himmu ❤️"

    ]

  },

  // Audio Music Tracks

  music: {

    intro: introMp3 || "/assets/audio/intro.mp3",

    childhood: childhoodMp3 || "/assets/audio/childhood.mp3",

    present: "/assets/audio/present.wav",

    family: familyMp3 || "/assets/audio/family.mp3",

    father: fatherMp3 || "/assets/audio/father.mp3",

    finale: finaleMp3 || "/assets/audio/finale.mp3"

  }

};
