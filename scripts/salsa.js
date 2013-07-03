(function($, Salsa) {
  var parser = new Salsa.Fresca(),
    open = [];
  if (typeof $ === 'undefined') {
    return;
    // Show error message
  }
  $("<link/>", {
    rel: "stylesheet",
    type: "text/css",
    href: SERVER_NAME + "/css/scripts.css",
  }).appendTo("head");
  makeEditable();

  /*$('#salsa').after("<form id='salsa-form' class='mfp-hide white-popup-block'>" +
    "<h1>Login to Make Changes</h1>" +
    "<input id='salsa-email' name='email' type='text' placeholder='Salsa Username' />" +
    "<input id='salsa-password' name='password' type='password' placeholder='Salsa Password' />" +
    "<input type='submit' value='Log in' />" +
  "</form>");
  $('#salsa').attr('href', '#salsa-form');
  $('#salsa').addClass('open-popup-link');
  $('#salsa').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#salsa-username',
    clossBtnInside: true
  });
  $('#salsa').magnificPopup('open');
  $('#salsa-form').submit(function(ev) {
    ev.preventDefault();
    var data = {};
    data['email'] = $('#salsa-email').val();
    data['password'] = $('#salsa-password').val();
    data['organization-id'] = ORGANIZATION_ID;
  */
    /*data['salsa-changes'] = {};
    $('.salsa-dirty').each(function() {
      data['salsa-changes'][$(this).attr('id')] = $(this).find('.jqte_editor').html();
    });*/
  /*
    $.ajax({
      url: SERVER_NAME + '/signin?callback=?', 
      data: data, 
      dataType: 'jsonp',
      method: "POST",
      success: function(data, status, xhr) {
        $("#salsa").magnificPopup('close');
        console.log(data);
        if (data.status === 'OK') {
          makeEditable();
        }
      },
      error: function(data, status, xhr) {
        console.log('error', data);
      }
    });
    $.getJSON(SERVER_NAME + '/signin?callback=?', data, function(data, status, xhr) {
      alert(data); 
    });
    
  });
  */

  function makeEditable() {
    $(window).bind('mercury:ready', function() {
      console.log(Mercury);
    })
    loadMercury();
    /*var mercury = Mercury.init();
    Mercury.on('save', function() {
      console.log(arguments);
      alert("This is only a demo, you can't save this page");
    });*/
    /*var editor = new wysihtml5.Editor("salsa-wrapper", {
      toolbar: "wysihtml5-toolbar",
      parserRules: wysihtml5ParserRules
    });*/
    //parser.each(editElm);
    $('#salsa').html('Save');
  }

  function editElm(elem) {
    icon = $("<i class='icon-pencil'></i>");
    if (!$(elem).hasClass('editable')) {
      $(elem).wrap($("<span class='editable' id='" + parser.hierarchy(elem) + "'>" +
        "</span"));
      elem = $(elem).parent();
    }
    $(elem).hover(function() {
      $(elem).before(icon);
      icon.css({
        left: $(this).position().left - 10,
        top: $(this).position().top,
        position: 'absolute',
        'z-index': 10000000,
      });
    }, function() {
      icon.remove();
    });
    $(elem).click(function() {
      icon.remove();
    });
    $(elem).click(openElement);
  }

  function openElement(ev) {
    var $this = $(this);
    ev.stopPropagation();
    ev.preventDefault();
    open.forEach(hideElm);
    open.push($this);
    $this.off('click');
    $this = showElm($this);
    $this.on('click', function(ev) {
      console.log("CLICK");
      ev.stopPropagation();
      ev.preventDefault();
      ev.stopImmediatePropagation();
    });
    $("body").on('click', function(ev) {
      console.log("Hide");
      hideElm($this);
    });
  }

  function hideElm(elm) {
    open = $.grep(open, function(elm2) { return elm2 != elm; });
    $(elm).off('click');
    $(elm).html($(elm).find('.jqte_editor').html());
    console.log("Hidden", elm);
    editElm(elm);
  }
  function showElm(elm) {
    var width = $(elm).children().width() + 100,
        height = $(elm).children().height();
    $(elm).html("<textarea class='editor' type='text'>" +
        $(elm).html() +
      "</textarea>");

    $(elm).find('.editor').jqte({
      change: function(ev) {
        $(ev.currentTarget).parent().parent().addClass('salsa-dirty');
      }
    });
    $(elm).find('.jqte').css({
      height: height + Math.ceil(640 / width) * 30 + 10,
      width: width
    });
    $(elm).find('.jqte_editor').css({
      height: height + 10,
      width: width
    });
    return elm;
  }
})(jQuery, window.Salsa = window.Salsa || {} );
