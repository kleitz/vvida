angular.module('vvida.filters')
  .filter('ngClipText', function() {
    return function(input, arg) {
      if (input.length > arg) {
        var str = input.substring(arg, 1);
        if (str === ' ') {
          return input.substring(0, arg) + '...';
        }
        var end = input.indexOf(' ', arg - 1);
        if (end === -1) {
          end = input.length;
        }
        return input.substring(0, end) + '...';
      } else {
        return input;
      }
    };
  });
