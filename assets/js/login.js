app.controller("mycontroller",function($scope,$http)
{   
    $scope.login=function(){
    
        $http.post("/login",   {"uname":$scope.username,"pwd":$scope.password})
            .then(
				function(resp)
				{
					alert("logged in");
				}
			
			,
				function(err)
				{
					alert(err);
				}
			);
        
        /*document.getElementById("form1").reset();
        alert("Record inserted");*/
   }
    

    
});