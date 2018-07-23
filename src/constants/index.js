export const REQUEST = 'REQUEST';
export const initialState = {
  gameResults: [],
  gameData: {
    answerArtists: ['7Ln80lUS6He07XvHI8qqHH', '5a2EaR3hamoenG9rDuVn8j', '0O0lrN34wrcuBenkqlEDZe', '06HL4z0CvFAxyc27GXpf02', '08GQAI4eElDnROBrJRGE0X', '1dfeR4HaWDbWqFHLkxsg1d', '3WrFJ7ztbogyGnTHbHJFl2', '7guDJrEfX3qb6FEbdPA5qi', '6vWDO969PvNqNYHIOW5v0m', '0oSGxfWSnnOXhD2fKuz2Gy'],
    songData: [
      {
        trackName: 'Do I Wanna Know?',
        artistName: 'Arctic Monkeys',
        trackAudio: 'https://p.scdn.co/mp3-preview/73e00a0a59c897b16d0fe30df43f7aeb2997079d?cid=e0798695220f4b1296dc84f83a2c201c'
      },
      {
        trackName: 'When Doves Cry',
        artistName: 'Prince',
        trackAudio: 'https://p.scdn.co/mp3-preview/5fc1bc59898ea8d0d23cf88810828d014020ef5d?cid=e0798695220f4b1296dc84f83a2c201c'
      },
      {
        trackName: 'The Ghost In You',
        artistName: 'The Psychedelic Furs',
        trackAudio: 'https://p.scdn.co/mp3-preview/cb0c02a872e3e1329bcf998575392ad6fff3a72b?cid=e0798695220f4b1296dc84f83a2c201c'
      },
      {
        trackName: 'Shake It Off',
        artistName: 'Taylor Swift',
        trackAudio: 'https://p.scdn.co/mp3-preview/7c08a9f4d871b5cb758fb7dd95abc8b06c9ed423?cid=e0798695220f4b1296dc84f83a2c201c'
      },
      {
        trackName: 'Dreams',
        artistName: 'Fleetwood Mac',
        trackAudio: 'https://p.scdn.co/mp3-preview/40d1f6d82f16b05b62aae47e8e130de04b407fc8?cid=e0798695220f4b1296dc84f83a2c201c'
      },
      {
        trackName: 'Crazy Little Thing Called Love',
        artistName: 'Queen',
        trackAudio: 'https://p.scdn.co/mp3-preview/ef98de2b63766a0e86ce68272037971f673ae744?cid=e0798695220f4b1296dc84f83a2c201c'
      },
      {
        trackName: 'Blackbird',
        artistName: 'The Beatles',
        trackAudio: 'https://p.scdn.co/mp3-preview/9cd5790f74f29046953ef511c3737a1121785b73?cid=e0798695220f4b1296dc84f83a2c201c'
      },
      {
        trackName: 'Isn\'t She Lovely',
        artistName: 'Stevie Wonder',
        trackAudio: 'https://p.scdn.co/mp3-preview/3b98fe75e40b1138281c30d35eb0783029b11976?cid=e0798695220f4b1296dc84f83a2c201c'
      },
      {
        trackName: 'Halo',
        artistName: 'Beyoncé',
        trackAudio: 'https://p.scdn.co/mp3-preview/3c97985f3736fab6d4abcd2067f346a9b30955fa?cid=e0798695220f4b1296dc84f83a2c201c'
      },
      {
        trackName: 'Heroes',
        artistName: 'David Bowie',
        trackAudio: 'https://p.scdn.co/mp3-preview/92caa5df4a00974b3065c2db0bb284dae528f62a?cid=e0798695220f4b1296dc84f83a2c201c'
      }],
    wrongArtistNames: [
      [
        'Bloc Party',
        'Interpol',
        'Cage The Elephant'
      ],
      [
        'Rick James',
        'The Gap Band',
        'Sly & The Family Stone'
      ],
      [
        'Japan',
        'Oingo Boingo',
        'The Chameleons'
      ],
      [
        'Shawn Mendes',
        'Hailee Steinfeld',
        'Lorde'
      ],
      [
        'Heart',
        'Crosby, Stills & Nash',
        'The Cars'
      ],
      [
        'R.E.M',
        'Scorpions',
        'Toto'
      ],
      [
        'Roy Orbison',
        'Jimi Hendrix',
        'Wings'
      ],
      [
        'Sly & The Family Stone',
        'The Temptations',
        'The Supremes'
      ],
      [
        'The Pussycat Dolls',
        'Fergie',
        'Destiny\'s Child'
      ],
      [
        'Brian Eno',
        'The Velvet Underground',
        'Joy Division'
      ]
    ]
  },
  userAuthentication: {
    userToken: 'string',
    userRefreshToken: 'string'
  },
  roundStart: false,
  currentRound: 0,
  roundAnswers: [],
  timeRemaining: 0,
  gameStatus: false,
  test: 'hello this is test'
};

export const dummyAccountEmail = "kijivinih@99pubblicita.com";
export const dummyAccount = "ffdsssfeg3415fRTG";
export const dummyUserName = "wygvb8p2w72lu1sjr9ruw0k4k";
