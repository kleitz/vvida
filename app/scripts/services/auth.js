angular.module('vvida.services')
 .factory('Auth', function(){
    var user;

    return{
      getUser : function(aUser){
          user = aUser;
      },
      isLoggedIn : function(){
          return(user)? user : false;
      }
    };
  });