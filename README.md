# firebaseStorage2

### Updated 1/26/2017 to support latest version of Ionic2

```console
Cordova CLI: 6.4.0
Ionic Framework Version: 2.0.0-rc.5
Ionic CLI Version: 2.2.1
Ionic App Lib Version: 2.1.7
Ionic App Scripts Version: 1.0.0
ios-deploy version: 1.8.6
ios-sim version: 5.0.6
OS: macOS Sierra
Node Version: v5.0.0
Xcode version: Xcode 8.2.1 Build version 8C1002
```

### Please set your firebase configuration in `firebaseConfig.ts`
```javascript
// Initialize Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyC7XBxxxxxxxxxxxxxxxxxZP3fkkzU",
    authDomain: "your-new-web-project.firebaseapp.com",
    databaseURL: "https://your-new-web-project.firebaseio.com",
    storageBucket: "your-new-web-project.appspot.com",
    messagingSenderId: "8000000000003"
};
```
### User authentication
The sample application used email authentication so make sure you configure it in the firebase console.

To simplify this solution, I have hardcoded the user that is used for authentication; you will need to add that user or create your own and modify the code.

https://github.com/aaronksaunders/firebaseStorage2/blob/master/src/pages/home/home.ts#L36

```javascript
firebase.auth().signInWithEmailAndPassword('newuser@mail.com', 'password')
```

### Plugins are required
The application requires specific plugins to work so please be sure to run `ionic state restore` before trying to run the sample. This should reload the necessary plugins.

**[Video not Updated Yet]** source code for youtube video on Ionic2 &amp; Firebase Image Upload

- [https://www.youtube.com/watch?v=6yGrLWq-oIo](https://www.youtube.com/watch?v=6yGrLWq-oIo)
- [![Alt text](https://img.youtube.com/vi/6yGrLWq-oIo/0.jpg)](https://www.youtube.com/watch?v=6yGrLWq-oIo)

