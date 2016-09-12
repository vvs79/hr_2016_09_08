'use strict';

angular.module("appResume", ['ngResource', 'ui.bootstrap', 'templates', 'ngRoute', 'ngLoad'])
.factory("Resume", function($resource) {
  return $resource("/resumes/:id/:action.json", {id: "@id"});
})
.factory("ResumePut", function($resource) {
  return $resource("/resumes/:id/:action.json", null, { 'update': {method: 'PATCH'} } );
})
.factory("Education", function($resource) {
  return $resource("/educations/:id.json", {id: "@id"});
})
.factory("Experience", function($resource) {
  return $resource("/experiences/:id.json", {id: "@id"});
})
.factory("Communication", function($resource) {
  return $resource("/communications/:id.json", {id: "@id"});
})
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "resumes/index.html",
      controller: 'ResumeCtrl'
    })
    .when('/new', {
      templateUrl: "resumes/new.html",
      controller: 'newResumeCtrl'
    })
    .when('/:id/edit', {
        templateUrl: "resumes/edit.html",
        controller: 'editResumeCtrl'
    })
    .when('/:id', {
        templateUrl: "resumes/show.html",
        controller: 'showResumeCtrl'
    })
   .otherwise({
      template : "<h1>None</h1><p>Nothing has been selected</p>"
    });
})
// .factory("AlertService", function($window) {
//   var message = false;

//   var getAlert = function() {
//     return message;
//   };

//   var setAlert = function(type, text) {
//     message = {};
//     message.type = type;
//     message.text = text;
//     setTimeout ( function() { message = false } , 1000 );
//     return message;
//   };

//   return { setAlert: setAlert, getAlert: getAlert };

// })



.controller('ResumeCtrl', function($scope, Resume, $window, Communication) {
  var i, arr, arr_status, arr_proff;
  $scope.top = true;
  $scope.count_new = 0; $scope.count_reserve = 0; $scope.count_refused = 0; $scope.count_yes = 0; $scope.count_no = 0;
  $scope.count_consider = 0; $scope.count_front = 0; $scope.count_back = 0;
  $scope.resumes = Resume.query(function(){ $scope.counter = $scope.resumes.length;
                                            for (i=0;i<$scope.counter;++i) {
                                              if ($scope.resumes[i].status) { arr = $scope.resumes[i].status.split(',');
                                                if ( arr.indexOf('New')      >= 0) $scope.count_new      += 1;
                                                if ( arr.indexOf('Reserve')  >= 0) $scope.count_reserve  += 1;
                                                if ( arr.indexOf('Refused')  >= 0) $scope.count_refused  += 1;
                                                if ( arr.indexOf('Yes')      >= 0) $scope.count_yes      += 1;
                                                if ( arr.indexOf('No')       >= 0) $scope.count_no       += 1;
                                                if ( arr.indexOf('Consider') >= 0) $scope.count_consider += 1;
                                              }
                                              if ($scope.resumes[i].proffession) { arr = $scope.resumes[i].proffession.split(',');
                                                  if ( arr.indexOf('Back-end') >= 0 ) $scope.count_back  += 1;
                                                  if ( arr.indexOf('Front-end') >= 0) $scope.count_front += 1;
                                                 //alert('arr - ' + arr);
                                              } 
                                            };
                                            //alert('$scope.resumes - ' + JSON.stringify($scope.resumes[13]));
                                          });

  $scope.queryPerson = "";
  $scope.searchAllow = false;
  $scope.searchVal = "Search";
  $scope.searchFunc = function() {
    $scope.searchAllow = !($scope.searchAllow);
    $scope.searchVal = ($scope.searchAllow) ? "Hide Search" : "Search";
    $scope.queryPerson = "";
  };

  $scope.settings = function(col) {
    $scope.queryPerson = "";
    document.getElementsByClassName("dv")[0].className = 'dv text-center ' + col;
  };
  
  $scope.removeResume = function(res) {
    if (confirm("Are You Sure (delete " + res.name + ")?")) {
      res.$remove();
      $scope.resumes.splice($scope.resumes.indexOf(res), 1);
      $scope.counter = $scope.resumes.length;
    }
  };

  $scope.extSelect = function() {
    $scope.queryPerson = "";
    $scope.top = false;
    var proff = document.getElementById("proff").value,
        status = document.getElementById("status").value,
        i;
    //$scope.selPersons = Object.create($scope.resumes);
    //for (i=0;i<$scope.selPersons.length;i++) {
     // if ( ($scope.selPersons[i].proffession).indexOf(proff) < 0 || ($scope.selPersons[i].status).indexOf(status) < 0 )
      //  { $scope.selPersons.splice(i, 1); --i; }
    //}
    for (i=0;i<$scope.counter;i++) {  if ($scope.resumes[i]) {
      if ( ($scope.resumes[i].status) && ($scope.resumes[i].proffession) ) {
        arr_status = $scope.resumes[i].status.split(',');
        arr_proff = $scope.resumes[i].proffession.split(','); //alert('arr st proff');
        if ( arr_proff.indexOf(proff) < 0 || arr_status.indexOf(status) < 0 )
          { $scope.resumes.splice(i, 1); --i;  //alert('id - ' + $scope.resumes[i].id);
        }
      }
      else { $scope.resumes.splice(i, 1); --i; }
     }
    }
  }
})




.controller('newResumeCtrl', function($scope, Resume, $window, Education, Experience, Communication) {
  var counter_skill = 1, counter_proff = 1, counter_lang = 1, counter_comm = 1, counter_educ = 1, counter_job = 1;

  $scope.addSkill = function(){
    if (counter_skill < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<input type="text" class="form-control" name="personSkill" placeholder="Скіли"/>';
      ++counter_skill;
      document.getElementById('allSkills').appendChild(newspan);
    }
  };

  $scope.addProff = function(){
    if (counter_proff < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<input type="text" class="form-control" name="personProff" placeholder="Професійні навички"/>';
      ++counter_proff;
      document.getElementById('allProffs').appendChild(newspan);
    }
  };

  $scope.addLang = function(){
    if (counter_lang < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<div class="langDiv"><hr/><select class="form-control" name="lang"><option>Language</option><option>Англійська</option><option>Російська</option><option>Німецька</option><option>Французька</option><option>Італійська</option><option>Польська</option><option>Іспанська</option><option>Португальська</option></select><select class="form-control" name="langLevel"><option>Level</option><option>Високий</option><option>Вище середнього</option><option>Середній</option><option>Нище середнього</option><option>Низький</option></select></div>'
      ++counter_lang;
      document.getElementById('allLangs').appendChild(newspan);
    }
  };

  $scope.addCommun = function(){
    if (counter_comm < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<div class="commDiv"><hr/><input type="date" class="form-control" name="communDate" placeholder="Дата"/><input type="text" class="form-control" name="communValue" placeholder="Кількість балів"/></div>'
      ++counter_comm;
      document.getElementById('allCommuns').appendChild(newspan);
    }
  };

  $scope.addEduc = function(){
    if (counter_educ < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<div class="educDiv"><hr/><h4 for="">Education</h4><input type="text" class="form-control" name="education" placeholder="Спеціальність"/><label for="">From</label><input type="date" class="form-control" name="educationFrom" placeholder="Навчався З"/><label for="">To</label><input type="date" class="form-control" name="educationTo" placeholder="Навчався До"/><br/><input type="text" class="form-control" name="educationPlace" placeholder="Навчальний заклад"/></div>'
      ++counter_educ;
      document.getElementById('allEduc').appendChild(newspan);
    }
  };

  $scope.addJob = function(){
    if (counter_job < 3)  {
      var newspan = document.createElement('span');
      newspan.innerHTML = '<div class="jobDiv"><hr/><h4 for="">Experience</h4><input type="text" class="form-control" name="job" placeholder="Спеціальність"/><label for="">From</label><input type="date" class="form-control" name="jobFrom" placeholder="Працював З"/><label for="">To</label><input type="date" class="form-control" name="jobTo" placeholder="Працював До"/><br/><input type="text" class="form-control" name="jobPlace" placeholder="Місце роботи"/></div>'
      ++counter_job;
      document.getElementById('allJobs').appendChild(newspan);
    }
  };

  $scope.addResume = function() {
    var proffessions = document.getElementsByName("proffession"), str_proffessions = "", i;
    for (i in proffessions) { if (proffessions[i].checked) str_proffessions += (proffessions[i].value + ',');  }
    $scope.newPerson.proffession = (str_proffessions) ? str_proffessions.slice(0, -1) : "";

    var status = document.getElementsByName("status"), str_status = "";
    for (i in status) { if (status[i].checked)  str_status += (status[i].value + ','); }
    $scope.newPerson.status = (str_status) ? str_status.slice(0, -1) : "";

    var skills = document.getElementsByName("personSkill"), str_skills = "";
    for (i=0; i<skills.length; i++) { if (skills[i].value) { str_skills += (skills[i].value + ','); skills[i].value = ""; } }
    for (i=0; i<=(skills.length-2); i++) { skills[i].parentNode.removeChild(skills[i]); }
    $scope.newPerson.skill= (str_skills) ? str_skills.slice(0, -1) : "";

    var proffs = document.getElementsByName("personProff"), str_proffs = "";
    for (i=0; i<proffs.length; i++) { if (proffs[i].value) { str_proffs += (proffs[i].value + ','); proffs[i].value = ""; } }
    for (i=0; i<=(proffs.length-2); i++) { proffs[i].parentNode.removeChild(proffs[i]); }
    $scope.newPerson.proff= (str_proffs) ? str_proffs.slice(0, -1) : "";

    var works = document.getElementsByName("personWork"), str_works = "";
    for (i in works) { if (works[i].checked)  str_works += (works[i].value + ','); }
    $scope.newPerson.work = (str_works) ? str_works.slice(0, -1) : "";

    var str_lang = '', str_level = '', lang = document.getElementsByName("lang"), level =  document.getElementsByName("langLevel");
    for (i=0;i<lang.length;++i) {
      if (lang[i].value) { 
        str_lang += (lang[i].value + ',');
        str_level += (level[i].value + ',');
        lang[i].value = level[i].value = "";
      }
    }
    $scope.newPerson.language = (str_lang) ? str_lang.slice(0, -1) : "";
    $scope.newPerson.level = (str_level) ? str_level.slice(0, -1) : "";

    if (lang.length > 1) {
      var lang_div = document.getElementsByClassName("langDiv");
      for (i=0;i<=(lang.length-2);++i) { lang_div[0].parentNode.removeChild(lang_div[0]);}
    }


    Resume.save($scope.newPerson)
      .$promise
        .then(
          function (success) {
            //alert(JSON.stringify(success));
            var i, specialty = document.getElementsByName("education"), from_educ =  document.getElementsByName("educationFrom"),
                to_educ =  document.getElementsByName("educationTo"), place_educ = document.getElementsByName("educationPlace");
            for (i=0;i<specialty.length;++i) {
              Education.save({specialty: specialty[i].value, from: from_educ[i].value, to: to_educ[i].value, place: place_educ[i].value, resume_id: success.id}); 
            }
            for (i=0;i<specialty.length;++i) { specialty[i].value = from_educ[i].value = to_educ[i].value = place_educ[i].value = ""; }
            if (specialty.length > 1) {
              var educ_div = document.getElementsByClassName("educDiv");
              for (i=0;i<=(counter_educ-2);++i) { educ_div[0].parentNode.removeChild(educ_div[0]);}
            }

            var specialty = document.getElementsByName("job"), from_job =  document.getElementsByName("jobFrom"),
            to_job =  document.getElementsByName("jobTo"), place_job = document.getElementsByName("jobPlace");
            for (i=0;i<specialty.length;++i) {
              Experience.save({specialty: specialty[i].value, from: from_job[i].value, to: to_job[i].value, place: place_job[i].value, resume_id: success.id}); 
            }
            for (i=0;i<specialty.length;++i) { specialty[i].value = from_job[i].value = to_job[i].value = place_job[i].value = ""; }
            if (specialty.length > 1) {
              var job_div = document.getElementsByClassName("jobDiv");
              for (i=0;i<=(counter_job-2);++i) { job_div[0].parentNode.removeChild(job_div[0]);}
            }

            var date = document.getElementsByName("communDate"), mark =  document.getElementsByName("communValue");
            for (i=0;i<date.length;++i) {
              Communication.save({date: date[i].value, mark: mark[i].value, resume_id: success.id}); 
            }
            for (i=0;i<date.length;++i) { date[i].value = mark[i].value = ""; }
            if (date.length > 1) {
              var comm_div = document.getElementsByClassName("commDiv");
              for (i=0;i<=(counter_comm-2);++i) { comm_div[0].parentNode.removeChild(comm_div[0]);}
            }

            $scope.newResume = {};
            $window.location.href = '/#/'+success.id;
          },
          function(unsuccess) {
          }
        );
  }

})




.controller('editResumeCtrl', function ($scope, ResumePut, $routeParams, $window, Education, Experience, Communication) {
  $scope.checkboxProff = [
    { name: 'Front-end', selected: false },
    { name: 'Back-end',  selected: false }
  ];

  $scope.checkboxStatus = [
    { name: 'Нове',               id: 'New',      selected: false },
    { name: 'В розгляді',         id: 'Consider', selected: false },
    { name: 'Пройшов співбесіду', id: 'Yes',      selected: false },
    { name: 'Резерв',             id: 'Reserve',  selected: false },
    { name: 'Відмовився',         id: 'Refused',  selected: false },
    { name: 'Не підходить',       id: 'No',       selected: false }
  ];

  $scope.checkboxWork = [
    { name: 'Повна зайнятість',   id: 'full',     selected: false },
    { name: 'Неповна зайнятість', id: 'no_full',  selected: false },
    { name: 'Дистанційна робота', id: 'distance', selected: false }
  ];

  $scope.person = ResumePut.get({ id: $routeParams.id })
    .$promise
      .then(
        function (success) {
          $scope.person = success.resume;
          $scope.educ = success.education;
          $scope.exp = success.experience;
          $scope.comm = success.communication;

          if ($scope.person.skill) { $scope.skills = $scope.person.skill.split(','); }
          if ($scope.person.proff) { $scope.proffs = $scope.person.proff.split(','); }
          //$scope.works = $scope.person.work.split(',');

          var i, j, arr_proffessions = [], arr_status = [], arr_works = [], arr_lang = [], arr_level = [];
          $scope.arr_ll = [];

          if ($scope.person.proffession) { 
            arr_proffessions = $scope.person.proffession.split(',');
            for (i in arr_proffessions) {
              for (j in $scope.checkboxProff) { 
                if (arr_proffessions[i] == $scope.checkboxProff[j].name) {
                  $scope.checkboxProff[j].selected = true;
                }
              }
            };
          };

          if ($scope.person.status) {
            arr_status = $scope.person.status.split(',');
            for (i in arr_status) {
              for (j in $scope.checkboxStatus) {
                if (arr_status[i] == $scope.checkboxStatus[j].id) {
                  $scope.checkboxStatus[j].selected = true;
                }
              }
            };
          };

          if ($scope.person.work) { 
            arr_works = $scope.person.work.split(',');
            for (i in arr_works) {
              for (j in $scope.checkboxWork) { 
                if (arr_works[i] == $scope.checkboxWork[j].id) {
                  $scope.checkboxWork[j].selected = true;
                }
              }
            };
          };

          if ($scope.person.language && $scope.person.level) { 
            arr_lang = $scope.person.language.split(',');
            arr_level = $scope.person.level.split(',');
            for (i in arr_lang) { $scope.arr_ll.push( {lang: arr_lang[i], level: arr_level[i] });  };
          };

        },
        function(error) {
          alert('ERROR EDIT');
        }
      );


 
  $scope.editResume = function (updatedResume) {
    var proffessions = document.getElementsByName("proffession"), str_proffessions = "", i;
    for (i in proffessions) { if (proffessions[i].checked) str_proffessions += (proffessions[i].value + ',');  }
    $scope.person.proffession = (str_proffessions) ? str_proffessions.slice(0, -1) : "";

    var status = document.getElementsByName("status"), str_status = "";
    for (i in status) { if (status[i].checked)  str_status += (status[i].value + ','); }
    $scope.person.status = (str_status) ? str_status.slice(0, -1) : "";

    var skills = document.getElementsByName("personSkill"), str_skills = "";
    for (i=0; i<skills.length; i++) { if (skills[i].value) { str_skills += (skills[i].value + ','); skills[i].value = ""; } }
    for (i=0; i<=(skills.length-2); i++) { skills[i].parentNode.removeChild(skills[i]); }
    $scope.person.skill= (str_skills) ? str_skills.slice(0, -1) : "";

    var proffs = document.getElementsByName("personProff"), str_proffs = "";
    for (i=0; i<proffs.length; i++) { if (proffs[i].value) { str_proffs += (proffs[i].value + ','); proffs[i].value = ""; } }
    for (i=0; i<=(proffs.length-2); i++) { proffs[i].parentNode.removeChild(proffs[i]); }
    $scope.person.proff= (str_proffs) ? str_proffs.slice(0, -1) : "";

    var works = document.getElementsByName("personWork"), str_works = "";
    for (i in works) { if (works[i].checked)  str_works += (works[i].value + ','); }
    $scope.person.work = (str_works) ? str_works.slice(0, -1) : "";

    var str_lang = '', str_level = '', lang = document.getElementsByName("lang"), level =  document.getElementsByName("langLevel");
    for (i=0;i<lang.length;++i) {
      if (lang[i].value != 'language') { 
        str_lang += (lang[i].value + ',');
        str_level += (level[i].value + ',');
        //lang[i].value = level[i].value = "";
      }
    }
    $scope.person.language = (str_lang) ? str_lang.slice(0, -1) : "";
    $scope.person.level = (str_level) ? str_level.slice(0, -1) : "";


    ResumePut.update({id: $scope.person.id}, updatedResume).$promise
      .then(
        function (success) {
          var i, specialty = document.getElementsByName("education"), from_educ =  document.getElementsByName("educationFrom"),
              to_educ =  document.getElementsByName("educationTo"), place_educ = document.getElementsByName("educationPlace");
          
          for (i=0;i<$scope.educ.length;++i) { 
            Education.delete({ id: $scope.educ[i].id }, function() { console.log('Deleted from server'); });
          };

          for (i=0;i<$scope.comm.length;++i) { 
            Communication.delete({ id: $scope.comm[i].id }, function() { console.log('Deleted from server'); });
          };

          for (i=0;i<$scope.exp.length;++i) { 
            Experience.delete({ id: $scope.exp[i].id }, function() { console.log('Deleted from server'); });
          };

          for (i=0;i<specialty.length;++i) { if (specialty[i].value) {
            Education.save({specialty: specialty[i].value, from: from_educ[i].value, to: to_educ[i].value, place: place_educ[i].value, resume_id: $scope.person.id}); }
          };
 
          var specialty = document.getElementsByName("job"), from_job =  document.getElementsByName("jobFrom"),
              to_job =  document.getElementsByName("jobTo"), place_job = document.getElementsByName("jobPlace");
          for (i=0;i<specialty.length;++i) { if (specialty[i].value) {
            Experience.save({specialty: specialty[i].value, from: from_job[i].value, to: to_job[i].value, place: place_job[i].value, resume_id: $scope.person.id}); }
          };

          var date = document.getElementsByName("communDate"), mark =  document.getElementsByName("communValue");
          for (i=0;i<date.length;++i) { if (mark[i].value) {
            Communication.save({date: date[i].value, mark: mark[i].value, resume_id: $scope.person.id});  }
          };

          $window.location.href = '/#/' + $scope.person.id;
        },
        function(error) {
          alert('ERROR');
          //$window.location.href = '/#';
        }
      )
  }
      
})





.controller('showResumeCtrl', function ($scope, Resume, $routeParams, Education, $window, Experience, Communication) {
  $scope.checkboxProff = [
    { name: 'Front-end', selected: false },
    { name: 'Back-end',  selected: false }
  ];

  $scope.checkboxStatus = [
    { name: 'Нове',               id: 'New',      selected: false },
    { name: 'В розгляді',         id: 'Consider', selected: false },
    { name: 'Пройшов співбесіду', id: 'Yes',      selected: false },
    { name: 'Резерв',             id: 'Reserve',  selected: false },
    { name: 'Відмовився',         id: 'Refused',  selected: false },
    { name: 'Не підходить',       id: 'No',       selected: false }
  ];

  $scope.checkboxWork = [
    { name: 'Повна зайнятість',   id: 'full',     selected: false },
    { name: 'Неповна зайнятість', id: 'no_full',  selected: false },
    { name: 'Дистанційна робота', id: 'distance', selected: false }
  ];

  Resume.get({id: $routeParams.id}).$promise
      .then(
        function (success) {
          $scope.person = success.resume;
          $scope.educ = success.education;
          $scope.exp = success.experience;
          $scope.comm = success.communication;

          if ($scope.person.skill) { $scope.skills = $scope.person.skill.split(','); }
          if ($scope.person.proff) { $scope.proffs = $scope.person.proff.split(','); }
          //if ($scope.person.work) { $scope.works = $scope.person.work.split(','); }

          var i, j, arr_proffessions = [], arr_status = [], arr_works = [], arr_lang = [], arr_level = [];
          $scope.arr_ll = [];

          if ($scope.person.proffession) { 
            arr_proffessions = $scope.person.proffession.split(',');
            for (i in arr_proffessions) {
              for (j in $scope.checkboxProff) { 
                if (arr_proffessions[i] == $scope.checkboxProff[j].name) {
                  $scope.checkboxProff[j].selected = true;
                }
              }
            };
          };

          if ($scope.person.status) {
            arr_status = $scope.person.status.split(',');
            for (i in arr_status) {
              for (j in $scope.checkboxStatus) {
                if (arr_status[i] == $scope.checkboxStatus[j].id) {
                  $scope.checkboxStatus[j].selected = true;
                }
              }
            };
          };

          if ($scope.person.work) { 
            arr_works = $scope.person.work.split(',');
            for (i in arr_works) {
              for (j in $scope.checkboxWork) { 
                if (arr_works[i] == $scope.checkboxWork[j].id) {
                  $scope.checkboxWork[j].selected = true;
                }
              }
            };
          };

          if ($scope.person.language && $scope.person.level) { 
            arr_lang = $scope.person.language.split(',');
            arr_level = $scope.person.level.split(',');
            for (i in arr_lang) { $scope.arr_ll.push( {lang: arr_lang[i], level: arr_level[i] });  };
          };

        },
        function(error) {
          alert('ERROR SHOW');
        }
      );
  //.$promise
    // .then(
    //   function(success) {
    //     $scope.person = resume;
    //   },
    //   function(error) {
    //     // errors
    //   });
  // $scope.educ = Education.query(function(){
  //   for (var i=0;i<$scope.educ.length;i++) {if ($scope.educ[i].resume_id != $routeParams.id) { $scope.educ.splice(i, 1); --i; }}
  // });
  // $scope.exp = Experience.query(function(){
  //   for (var i=0;i<$scope.exp.length;i++) {if ($scope.exp[i].resume_id != $routeParams.id) { $scope.exp.splice(i, 1); --i; }}
  // });
  //$scope.comm = Communication.query(function(){
    //for (var i=0;i<$scope.comm.length;i++) {if ($scope.comm[i].resume_id != $routeParams.id) { $scope.comm.splice(i, 1); --i; }}
  //});
  $scope.removeResume = function(res) {
    if (confirm("Are You Sure (delete " + res.name + ")?")) {
      res.$remove();
      $window.location.href = '/#';
    }
  }
  

});
