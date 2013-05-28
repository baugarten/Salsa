(function($) {
  $('#salsa').click(function() {
    if (typeof $ === 'undefined') {
      return;
      // Show error message
    }
    $("<link/>", {
      rel: "stylesheet",
      type: "text/css",
      href: SERVER_NAME + "/jquery-te-1.4.0.css"
    }).appendTo("head");
    $("<link/>", {
      rel: "stylesheet",
      type: "text/css",
      href: SERVER_NAME + "/magnific-popup.css"
    }).appendTo("head");

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
      data['salsa-client-id'] = parseInt(CLIENT_ID, 10);
      data['salsa-ftp-changes'] = {};
      $('.salsa-dirty').each(function() {
        data['salsa-ftp-changes'][$(this).attr('id')] = $(this).find('.jqte_editor').html();
      });
      alert("Submitted");
      $.post(SERVER_NAME + '/put', data, function(data, status, xhr) {
        console.log(data); 
      }, 'json');
      
    });
  });
})(jQuery);
