import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

import {Camera} from 'ionic-native';

import * as firebase from 'firebase';

import 'whatwg-fetch';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
 
  assetCollection: any;

  constructor(public navCtrl: NavController) {

    // initialize firebase
    var config = {

    };
    firebase.initializeApp(config);
  }

  /**
   * here we will initialize the component
   */
  ngOnInit() {
    // we will use anonymous auth for this example
    firebase.auth().signInAnonymously()
      .then((_auth) => {
        // when authenticated... alert the user
        console.log('login success');

        // when we have data, load the data for the UI
        this.loadData();
      })
      .catch((error: firebase.auth.Error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(errorMessage);

      });
  }

  /** 
   * called after the user has logged in to load up the data
   */
  loadData() {
    // load data from firebase...
    firebase.database().ref('assets').on('value', (_snapshot: any) => {
      var result = [];

      _snapshot.forEach((_childSnapshot) => {
        // get the key/id and the data for display
        var element = _childSnapshot.val();
        element.id = _childSnapshot.key;

        result.push(element);
      });

      // set the component property
      this.assetCollection = result;
    });
  }

  makeFileIntoBlob(_imagePath) {
    return fetch(_imagePath).then((_response) => {
      return _response.blob();
    }).then((_blob) => {
      return _blob;
    });
  }

  uploadToFirebase(_imageBlob) {
    var fileName = 'sample-' + new Date().getTime() + '.jpg';

    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('images/' + fileName);

      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed', (_snapshot) => {
        console.log('snapshot progess ' + _snapshot);
      }, (_error) => {
        reject(_error);
      }, () => {
        // completion...
        resolve(uploadTask.snapshot);
      });
    });
  }

  saveToDatabaseAssetList(_uploadSnapshot) {
    var ref = firebase.database().ref('assets');

    return new Promise((resolve, reject) => {

      // we will save meta data of image in database
      var dataToSave = {
        'URL': _uploadSnapshot.downloadURL, // url to access file
        'name': _uploadSnapshot.metadata.name, // name of the file
        'owner': firebase.auth().currentUser.uid,
        'email': firebase.auth().currentUser.email,
        'lastUpdated': new Date().getTime(),
      };

      ref.push(dataToSave, (_response) => {
        resolve(_response);
      }).catch((_error) => {
        reject(_error);
      });
    });

  }


  doGetPicture() {
    // TODO:
    // get picture from camera
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetHeight: 640,
      correctOrientation: true
    }).then((_imagePath) => {
      alert('got image path ' + _imagePath);
      // convert picture to blob
      return this.makeFileIntoBlob(_imagePath);
    }).then((_imageBlob) => {
      alert('got image blob ' + _imageBlob);

      // upload the blob
      return this.uploadToFirebase(_imageBlob);
    }).then((_uploadSnapshot: any) => {
      alert('file uploaded successfully  ' + _uploadSnapshot.downloadURL);

      // store reference to storage in database
      return this.saveToDatabaseAssetList(_uploadSnapshot);

    }).then((_uploadSnapshot: any) => {
      alert('file saved to asset catalog successfully  ');
    }, (_error) => {
      alert('Error ' + _error.message);
    });



  }
}
