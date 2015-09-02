

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopup) {

  var ref = new Firebase('https://radiant-heat-1148.firebaseio.com');
  // var auth = new FirebaseSimpleLogin(ref, function (error, user) {
  //     if (!error) {
  //         if (user) {
  //             $scope.login();
  //         }
  //     }
  // });

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  var authData = ref.getAuth();
  if (authData) {
    console.log("Authenticated user with uid:", authData.uid);
    $scope.user = authData.password.email;
    $scope.azione = "Log out";
  }else{
    console.log("No user logged");
    $scope.user = "no user logged";
    $scope.tipoAzione = "Log in";
  }



  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Create the signup modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });



  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Triggered in the login modal to close it
  $scope.closeSignup = function() {
    $scope.modal2.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };


  // Open the signup modal
  $scope.signup = function() {
    $scope.modal2.show();
  };

  $scope.showConfirm = function(){
    var confirmPopup = $ionicPopup.confirm({
               title: 'Validation Error',
               template: 'Please enter username and password.',
               okText: 'Try Again',
               cancelText: 'Cancel'
             });
   confirmPopup.then(function(tryAgain) {
               if (tryAgain) {
                  $scope.dologin();
               }else {
                  $scope.closeLogin();
               }
           });
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
                var email = $scope.loginData.username;
                var password = $scope.loginData.password;
    	    if(email && password){
                ref.authWithPassword({
                  "email": email,
                  "password": password
                }, function(error, authData) {
                  if (error) {
                    console.log("Login Failed!", error);
                  } else {
                    console.log("Authenticated successfully with payload:", authData);
                    $scope.user = authData.password.email;
                    $scope.closeLogin();
                  }
                });
    	    }
    	     else{
             $scope.showConfirm();
         };
       }

       $scope.doLogout = function() {
           ref.unauth();
           $scope.user = "no user logged"
         }

$scope.azione = function () {
  authData = ref.getAuth();
  if (authData) {
    $scope.doLogout();
  }else{
    $scope.login();
  }
}

$scope.doSignup = function() {
  console.log('Doing signup', $scope.loginData);
              var email = $scope.loginData.username;
              var password = $scope.loginData.password;
        if(email && password){
              ref.createUser({
                email: email,
                password: password
              }, function(error, userData) {
                if (error) {
                  switch (error.code) {
                    case "EMAIL_TAKEN":
                      console.log("The new user account cannot be created because the email is already in use.");
                      break;
                    case "INVALID_EMAIL":
                      console.log("The specified email is not a valid email.");
                      break;
                    default:
                      console.log("Error creating user:", error);
                  }
                } else {
                  console.log("Successfully created user account with uid:", userData.uid);
                  $scope.closeSignup();
                }
              });
              }
         else{
           $scope.showConfirm();
       };
     }

     //Create a callback which logs the current auth state
     function authDataCallback(authData) {
       if (authData) {
         $scope.tipoAzione = "Log out";
       } else {
         $scope.tipoAzione = "Log in";
       }
     }
     ref.onAuth(authDataCallback);

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
