(function($, Salsa) {
  if (typeof $ === 'undefined') {
    return;
    // Show error message
  }
  $("<link/>", {
    rel: "stylesheet",
    type: "text/css",
    href: SERVER_NAME + "/css/scripts.css",
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
    data['salsa-email'] = $('#salsa-email').val();
    data['salsa-password'] = $('#salsa-password').val();
    data['salsa-organization-id'] = ORGANIZATION_ID;
    /*data['salsa-changes'] = {};
    $('.salsa-dirty').each(function() {
      data['salsa-changes'][$(this).attr('id')] = $(this).find('.jqte_editor').html();
    });*/
    $.getJSON(SERVER_NAME + '/signin?callback=?', data, function(data, status, xhr) {
      alert(data); 
    });
    
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
})(jQuery, window.Salsa = window.Salsa || {} );
