angular.module('AttendanceFactories',[])
	
	.factory ('Subjects', function () {
		var subjects = [
		    { name: 'DLD' } ,
		    { name: 'DSC'}  ,
		    { name: 'M3'} ,
		    { name: 'COA'} ,
		    { name: 'DMS'} ,
		    { name: 'EM'}
		];

		return {
			subjects: subjects
		}
	});