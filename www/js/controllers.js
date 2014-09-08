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
    Subjects.update(subjects);
  }

  $scope.absent = function () {
    subjects[i].total++;
    Subjects.update(subjects);
  }



})

.controller('ApplicationController', function($scope, $ionicNavBarDelegate) {
  $scope.hideBackButton = true;

});
