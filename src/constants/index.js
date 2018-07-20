export const REQUEST = 'REQUEST';
export const initialState = {
  game results: {
    answerResults: [],
    answerPoints: []
  },
  game data: {
    answerArtists: ['string', 'string', ..., 'string'],
    songData: [{
        trackName: 'string',
        artistName: 'string',
        trackAudio: 'string'
      }, {...}, ..., {...}],
    wrongArtistNames: [['string', 'string', ..., 'string'], [...], ..., [...]]
  },
  user authentication: {
    userToken: 'string',
    userRefreshToken: 'string'
  },
};

export const dummyAccountEmail = "kijivinih@99pubblicita.com";
export const dummyAccount = "ffdsssfeg3415fRTG";
export const dummyUserName = "wygvb8p2w72lu1sjr9ruw0k4k";
