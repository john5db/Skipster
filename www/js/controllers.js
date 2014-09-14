angular.module('starter.controllers', ['AttendanceFactories','ngCordova.plugins.localNotification'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,Subjects) {
  $scope.subjects = Subjects.subjects;  
  
  
  
})

.controller('PlaylistsCtrl', function($scope,Subjects,$ionicModal,$state,$cordovaLocalNotification) {  

  $scope.Attend = {
    level:0
  }

  if(window.localStorage['level'] == undefined) {
    window.localStorage['level'] = 75;
  }

  $scope.Attend.level = window.localStorage['level'];

  $scope.$watch('Attend.level', function() {
    window.localStorage['level'] = $scope.Attend.level;
    console.log('Changed');
  });

  $scope.lev = parseInt($scope.Attend.level);

  $scope.empty = false;
  $scope.subjects = Subjects.subjects;
  console.log($scope.subjects);
  var check = function () {
    if($scope.subjects == "") {
      $scope.empty = true;
    } else {
      $scope.empty = false;
    }
  };
  check();


  var cur_id = 0;

  if($scope.subjects !== []) {
    cur_id = $scope.subjects.length || 0;
  }

  $ionicModal.fromTemplateUrl('templates/addSubject.html',{
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
    if($scope.subjects !== []) {
    cur_id = $scope.subjects.length || 0;
  }
    //console.log(subject);
    if(subject == undefined) {
      $scope.modal.hide();
    }
    else if(subject != "") {
      var newSub = {
        name: subject.title,
        id: cur_id + 1,
        total: 0,
        present: 0,
        last: [-1]
      };
      $scope.subjects.push(newSub);
      //console.log($scope.subjects);
      Subjects.update($scope.subjects); 
    }
    $scope.modal.hide();
    subject.title="";
    check();
  };

  $scope.remove = function(subjectId) {
    $scope.subjects.splice(subjectId,1);
    Subjects.update($scope.subjects);
    check();
  }
  $scope.reset = function() {
    /*var new1 = [];
    //$scope.subjects = [];
    Subjects.update(new1);*/

    while($scope.subjects.length != 0)
    $scope.subjects.pop();

    Subjects.update($scope.subjects);
    check();
  };
})

.controller('UpdateController', function($scope, $stateParams,Subjects,$cordovaLocalNotification) {
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
    if(subjects[i].last.length >= 6) {
      subjects[i].last.shift();
    }
    subjects[i].last.push(1);
    Subjects.update(subjects);
    notify(subjects[i]);
  }

  $scope.absent = function () {
    subjects[i].total++;
    if(subjects[i].last.length >= 6) {
      subjects[i].last.shift(subjects[i]);
    }
    subjects[i].last.push(0);
    Subjects.update(subjects);
    notify(subjects[i]);
  }

  var notify = function (sub) {
    var d = new Date();


    if(d.getHours() >= 20) {
      d.setDate(d.getDate() + 1);
    } 
    d.setHours(20);
    d.setMinutes(00);

    var percent = sub.present/sub.total * 100;

    var tempPresent  = sub.present;
    var tempTotal = sub.total;
    var per= 0;

    var lev = window.localStorage['level'];

    while(per <= lev) {
      per = (++(tempPresent)/++(tempTotal))*100;
    }

    var req = tempPresent - sub.present;

    var not = {
      id: '1665' + sub.id,
      date: d,
      repeat: 'daily',
      title: 'Shortage in ' + sub.name,
      message: 'Current - ' + (sub.present/sub.total * 100).toFixed(2) + '% : ' + req  + 'needed for ' + lev + '%'
    }

    //console.log(sub.name);

    if(percent < lev && sub.total > 0) {
     $cordovaLocalNotification.add(not);
    } else {
      $cordovaLocalNotification.cancel(not.id);
    }


      var d = new Date();
      d.setHours(20);
      d.setMinutes(00);
      var curDay = d.getDate();
     d.setDate(curDay+1);

    $cordovaLocalNotification.add({
    id:'noti',
    title:'ATTENTION',
    repeat:'daily',
    date: d,
    message:"You have not updated today's class"
    });


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
})

.controller('SetController', function($scope,Subjects) {
  

})
;
