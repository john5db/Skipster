angular.module('AttendanceFactories',[])
	
	.factory ('Subjects', function () {
		/*var subjects = */

		var subjects = JSON.parse(window.localStorage['subject'] || '[{"name":"DLD","id":1,"total":0,"present":0},{"name":"DSC","id":2,"total":0,"present":0},{"name":"M3","id":3,"total":0,"present":0},{"name":"COA","id":4,"total":0,"present":0},{"name":"DMS","id":5,"total":0,"present":0},{"name":"EM","id":6,"total":0,"present":0}]');	



		var update = function(subjects,action) {
			window.localStorage['subject'] = JSON.stringify(subjects);
			window.localStorage['lastAction'] = JSON.stringify(action);
		}

		var retrive = function() {
			return JSON.parse(window.localStorage['lastAction'] || '{}');
		}


		return {
			subjects: subjects ,
			update: update ,
			retrive: retrive
		}
	});