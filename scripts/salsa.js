(function($) {
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

  $('#salsa').after("<form id='salsa-form' class='mfp-hide white-popup-block'>" +
    "<h1>Save Changes</h1>" +
    "<input id='salsa-username' type='text' placeholder='Salsa Username' />" +
    "<input id='salsa-password' type='password' placeholder='Salsa Password' />" +
    "<input type='submit' value='Save' />" +
  "</form>");
  $('#salsa').attr('href', '#salsa-form');
  $('#salsa').addClass('open-popup-link');
  $('#salsa').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#salsa-username'
  });
  $('#salsa').magnificPopup('open');
  $('#salsa-form').submit(function(ev) {
    ev.preventDefault();
    var data = {};
    data['salsa-username'] = $('#salsa-username').val();
    data['salsa-password'] = $('#salsa-password').val();
    data['salsa-client-id'] = parseInt(ORGANIZATION_ID, 10);
    /*data['salsa-changes'] = {};
    $('.salsa-dirty').each(function() {
      data['salsa-changes'][$(this).attr('id')] = $(this).find('.jqte_editor').html();
    });*/
    $.post(SERVER_NAME + '/validate', data, function(data, status, xhr) {
      console.log(data); 
    }, 'json');
    
  });

  function makeEditable() {
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
  }
})(jQuery);
