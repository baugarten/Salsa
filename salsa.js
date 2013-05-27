(function() {
  function getScript(url, success) {
    var script = document.createElement('script');
    script.setAttribute('src', url);
    
    var head = document.getElementsByTagName('head')[0],
      done = false;

    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {

      if (!done && 
           (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {

        done = true;

        // callback function provided as param
        success();

        script.onload = script.onreadystatechange = null;
        head.removeChild(script);

      }

    };
    head.appendChild(script);
  }
  document.getElementById('salsa').addEventListener("click", function() {
    if (typeof jQuery === 'undefined') {
      var globalJSLibrary = false;
      if (typeof $ === 'function') {
        globalJSLibrary = true;
      }
      getScript('http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js', function() {
        if (typeof jQuery === 'undefined') {
          // Show error message
        } else {
          jQuery("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: "http://localhost:3000/jquery-te-1.4.0.css"
          }).appendTo("head");
          jQuery("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: "http://localhost:3000/magnific-popup.css"
          }).appendTo("head");

          jQuery.when(
            jQuery.getScript('http://localhost:3000/jquery-te-1.4.0.js'),
            jQuery.getScript('http://localhost:3000/salsa.fresca.js'),
            jQuery.getScript('http://localhost:3000/jquery.magnific-popup.min.js'),
            jQuery.Deferred(function(deferred) {
              $( deferred.resolve );
            })
          ).done(function() { 
            console.log(Salsa);
            var parser = new Salsa.Fresca();
            parser.each(function(elem) {
              $(elem).replaceWith(
                "<span class='editable' id='" + parser.hierarchy(elem) + "'>" +
                  "<textarea class='editor' type='text'>" +  
                    parser.asHTML(elem) + 
                  "</textarea>" +
                "</span>");
            });
            $('.editor').jqte({
              change: function(ev) {
                $(ev.currentTarget).parent().parent().addClass('salsa-dirty');
              }  
            });
            $('#salsa').html('Save');
            $('#salsa').after("<form id='salsa-ftp-form' class='mfp-hide white-popup-block'>" +
              "<h1>Save Changes</h1>" +
              "<input id='salsa-ftp-username' type='text' placeholder='FTP Username' />" +
              "<input id='salsa-ftp-password' type='password' placeholder='FTP Password' />" +
              "<input type='submit' value='Save' />" +
            "</form>");
            $('#salsa').attr('href', '#salsa-ftp-form');
            $('#salsa').addClass('open-popup-link');
            $('#salsa').magnificPopup({
              type: 'inline',
              preloader: false,
              focus: '#salsa-ftp-username'
            });
            $('#salsa-ftp-form').submit(function(ev) {
              ev.preventDefault();
              var data = {};
              data['salsa-ftp-username'] = $('#salsa-ftp-username').val();
              data['salsa-ftp-password'] = $('#salsa-ftp-password').val();
              data['salsa-ftp-changes'] = {};
              $('.salsa-dirty').each(function() {
                data['salsa-ftp-changes'][$(this).attr('id')] = $(this).find('.jqte_editor').html();
              });
              console.log(data);
              alert("Submitted");
              
            });
          });
        }
      });
    } 
  });
})();
