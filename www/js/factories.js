angular.module('AttendanceFactories',[])
	
	.factory ('Subjects', function () {
		/*var subjects = */

		var subjects = JSON.parse(window.localStorage['subjects'] || '[{"name":"DLD","id":1,"total":0,"present":0},{"name":"DSC","id":2,"total":0,"present":0},{"name":"M3","id":3,"total":0,"present":0},{"name":"COA","id":4,"total":0,"present":0},{"name":"DMS","id":5,"total":0,"present":0},{"name":"EM","id":6,"total":0,"present":0}]');	



		var update = function(subjects) {
			window.localStorage['subjects'] = JSON.stringify(subjects);
		}
		return {
			subjects: subjects ,
			update: update
		}
	});