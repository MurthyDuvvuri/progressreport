var app=angular.module("myapp",['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl:'home.html',
        controller:'mycontrol'
    })
    .when('/', {
        templateUrl:'login.html',
        controller:'mycontrol'
    })
     .when('/logout', {
        templateUrl:'login.html',
        controller:'mycontrol'
    })
    .when('/monitor', {
        templateUrl:'monitor.html',
        controller:'mycontrol'
    })
    .when('/signup', {
        templateUrl:'signup.html',
        controller:'mycontrol'
    })
    .when('/student', {
        templateUrl:'student.html',
        controller:'mycontrol'
    })
   
   
    .when('/error/', {
        template:'Invalid page acess. Please try again later.'
    })
    .otherwise({
        redirectTo:'/error'
    });
    
   
    
});

app.factory('signupService',function($http){
   
    return{
		'register':function(frname,ltname,uname,pwd){
            
			$http.post('/signup',{'frname':frname,'ltname':ltname,'uname':uname,'pwd':pwd})
			.then(
				function(resp)
				{
					alert(resp);
				}
			
			,
				function(err)
				{
					//alert(err);
				}
                
			)
           
		}
	}
    
});
app.factory('addstudent',function($http){
   
    return{
        'register':function(batchname,sname,ssub1,ssub2,ssub3){
            
            $http.post('/addstud',{'batch':batchname,'name':sname,'sub1':ssub1,'sub2':ssub2,'sub3':ssub3})
            .then(
                function(resp)
                {
                    alert(resp);
                }
            
            ,
                function(err)
                {
                    //alert(err);
                }
                
            )
           
        }
    }
    
});

app.factory('loginService',function($http,$location,$window){
   
    return{
        'login':function(uname,pwd){
            
            $http.post('/login',{'uname':uname,'pwd':pwd})
			.then(
				function(resp)
				{
					if(resp.data){
                    $location.path("/home");
                    }
				}
			
			,
				function(err)
				{
					//alert(err);
				}
                
			)
            
        }
    }
});
app.factory('monitorstud',function($http){
   var obj={};
    
        obj.classselection=function(batchsel){
            
            return $http.post('/monitor',{'batch':batchsel})
            
            
        }
        return obj;
    
});
    


app.controller("mycontrol",function($scope,$http,loginService,signupService,$window,$location,addstudent,monitorstud,$rootScope)
{   
    
    $scope.register=function()
	{
			signupService.register($scope.fname,$scope.lname,$scope.username,$scope.password);
			        $location.path("/");


	}
    
    $scope.login=function()
    {
        loginService.login($scope.username,$scope.password);
        //document.getElementById("form1").reset();
        
    }
    
    $scope.redirectReg=function()
    {   
        $location.path("/signup");
        
    }
    
    $scope.logout=function()
    {
        $http.post('/');
    }
    $scope.stud = function()
    {

        $location.path('/student');
    }
    $scope.addstud = function()
    {
            addstudent.register($scope.batch,$scope.name,$scope.sub1,$scope.sub2,$scope.sub3);


    }
    $scope.monitor=function()

    {
        var studentchoice= monitorstud.classselection($scope.batch);

      studentchoice.then(
                function(resp)
                {
                    $scope.studentoption = resp.data;
                    
                }
            
            ,
                function(err)
                {
                    return "error";
                }
                
            )
    }
    $scope.monitorstu=function()

    {

       console.log("hello user");
        
    }
    $scope.studselect=function()
    {
       for (sel in $scope.studentoption)
       {
                    console.log("wtf"+$scope.batchs);

        if ($scope.batchs == $scope.studentoption[sel].stname)
        {
            $scope.indstudent = $scope.studentoption[sel];
            console.log("individual"+$scope.indstudent.stname);
            $scope.indstudent.avg = ((1*$scope.indstudent.stsub1+1*$scope.indstudent.stsub2+1*$scope.indstudent.stsub3)/3);
            console.log($scope.indstudent.avg);

        }
       }

    }
     
});
/*.run(function(){

    $rootScope.$on("$locationChangeStart", function(event, next, current,$http) {
        if(next.requireLogin) {
        // Auth/session check here
        event.preventDefault();
    }
    });

});*/

