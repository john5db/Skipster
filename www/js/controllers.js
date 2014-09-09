angular.module('starter.controllers', ['AttendanceFactories'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,Subjects) {
  $scope.subjects = Subjects.subjects;  
  
})

.controller('PlaylistsCtrl', function($scope,Subjects) {
  $scope.subjects = Subjects.subjects;

})

.controller('UpdateController', function($scope, $stateParams,Subjects) {
  var subjects = Subjects.subjects;
  var curSubject = $stateParams.subjectId;
  var name = "";
  var action = 0;


  for(var i = 0; i < subjects.length; i++) {
    if(':' + subjects[i].id === curSubject) {
       name = subjects[i].name;
      break;
    }

  }
  $scope.subject = subjects[i];
  
  

  $scope.present = function () {
    subjects[i].total++;
    subjects[i].present++;
    subjects[i].last.push(1);
    Subjects.update(subjects);
  }

  $scope.absent = function () {
    subjects[i].total++;
    subjects[i].last.push(0);
    Subjects.update(subjects);
  }



  $scope.undo = function() {
    var last = subjects[i].last.pop();
    if(last == 1) {
    if(!(subjects[i].total == 0 || subjects[i].present == 0 || subjects[i].total-1 < subjects[i].present-1)) {
      subjects[i].total--;
      subjects[i].present--;
      Subjects.update(subjects);
    }
    }
    else if(last == 0) {
      if(!(subjects[i].total == 0 || subjects[i].present == 0 || subjects[i].total-1 < subjects[i].present)) {
      subjects[i].total--;
    Subjects.update(subjects);
  }
    }
  }

})

.controller('ApplicationController', function($scope, $ionicNavBarDelegate) {
  $scope.hideBackButton = true;

});
