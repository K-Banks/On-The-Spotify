# _On The Spot-ify_

#### By: _**Kayl Eubanks**_
* Live Deployment available at: https://k-banks.github.io/On-The-Spotify/#/

## Description
_This app is a music quiz using the Spotify API and user data to create a personalized experience. The app will only request permission to user's top artists. After randomly selecting 10 artists, the app will play a 30 second clip of a random song and ask the user to identify the artists from 4 choices. This application is built with React via the create-react-app._

## Flow of app
* User will be prompted to log in using their Spotify account
  * OAuth 2.0 token request will prompt user for permission to access their data
* User will press button to begin a game
* A game consists of:
  * 10 questions - each prompts user to identify the audio clip being played
  * 4 potential answers per questions (1 correct and 3 incorrect)
  * 30 seconds of audio for each question
  * 30 seconds to submit guess
  * a decreasing points score based on amount of time passed since clip began
  * user will be allowed a single guess per question
  * At end of game user will be shown total number of points scored and number of questions answered correctly
* Game data flow:
  * initial request for user top artists/user's saved tracks
  * store 10 random artistId/trackId values for answers (assuming every track has 30 sec preview)
  * for each answer artistId:
    * request related artists and store 3 random artist names for each question (30 total)
    * request top tracks:
      * pick random song, store track name, artist name, and preview url


## Setup/Installation Requirement for Developers:

* Clone repository on your local computer from https://github.com/K-Banks/On-The-Spotify.
* Navigate into project directory in command line.
* Install node package manager if not already installed on local machine.
* Run '$ npm install' to download all needed dependencies.
* Run '$ npm run start' to serve the app on localhost:3000.

## Component Tree
![Component Tree](./src/assets/On-The-Spot-ify.jpg) // 10.05.18 Needs update.

## Known Issues
* _Firefox Browser compatibility issue. May not load audio clips._
* _Formatting is not consistent on medium and small screens._
* _Same artist may occasionally show twice in answers._

## Future Implementations:
* High score board recording best scores for set period of time.
* Button to save a song that played during the quiz directly to your library.
* Multiplayer mode that will use common artists between players.

## Technologies Used
 * React.js
 * JSX
 * Redux.js
 * React-Audio-Player
 * This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
 * This project was deployed using [React GH Pages](https://github.com/gitname/react-gh-pages).

### License

This software is licensed under the MIT license.

Copyright (c) 2018 ****_Kayl Eubanks_****
