angular.module('starter.controllers', ['AttendanceFactories'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,Subjects) {
  $scope.subjects = Subjects.subjects;  
  
})

.controller('PlaylistsCtrl', function($scope,Subjects,$ionicModal) {
  $scope.subjects = Subjects.subjects;
  console.log($scope.subjects);
  var cur_id = 0;

  if($scope.subjects !== []) {
    cur_id = $scope.subjects.length || 0;
  }

  $ionicModal.fromTemplateUrl('addSubject.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.$on('modal.removed', function() {

  });

  $scope.add = function(subject) {
    if(subject != "") {
      var newSub = {
        name: subject,
        id: cur_id + 1,
        total: 0,
        present: 0,
        last: [-1]
      };
      $scope.subjects.push(newSub);
      console.log($scope.subjects);
      Subjects.update($scope.subjects); 
      $scope.modal.hide();
    }
  };

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

})

.controller('MyController', function($scope,$ionicModal) {
  $ionicModal.fromTemplateUrl('addSubject.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.$on('modal.removed', function() {

  });
});
