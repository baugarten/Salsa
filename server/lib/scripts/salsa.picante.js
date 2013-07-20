(function() {
  window.onload = function() {
    var loadSalsa, salsa;
    salsa = document.getElementById('salsa');
    loadSalsa = function() {
      var script;
      script = document.createElement('script');
      script.setAttribute('src', SERVER_NAME + '/edit?organization_id=' + ORGANIZATION_ID);
      document.getElementsByTagName('head')[0].appendChild(script);
      return salsa.removeEventListener('click', loadSalsa, false);
    };
    return salsa.addEventListener('click', loadSalsa, false);
  };

}).call(this);
