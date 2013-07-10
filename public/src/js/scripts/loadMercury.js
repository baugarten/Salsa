var editing = false;
function _mixpanel(event, data) {
  if (ENV === 'production') {
    mixpanel.track(event, data);
  }
}
function saveEmail() {
  var email = $.trim($("#email textarea").val());
  email = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/.exec(email);
  ga('_trackEvent', "registration", "saving", email);
  _mixpanel('saving', {
    email: (email && email[0])
  });

  if (email) {
    email = email[0];
    $.post(SERVER_NAME + "/mailing/signup", { email: email })
    .done(function(data) {
      ga('_trackEvent', "registration", "saved", email);
      _mixpanel('saved', {
        email: email
      });
      $(".warning-row,.signup").hide();
      $(".success-row").show();
      close();
    })
    .fail(function(data, resp) {
      ga('_trackEvent', "registration", "failed", email);
      _mixpanel('failed', {
        email: email,
        error: resp.responseText
      });
      $(".success-row").hide();
      $(".warning-row,.signup").show();
    });
  } else {
    ga('_trackEvent', "registration", "failed", email);
    _mixpanel('failed', {
      email: email,
      error: "invalid email: " + email
    });
    alert("That email wasn't valid, try another one")
  }
}
$(window).on('mercury:ready', function() {
  Mercury.PageEditor.prototype.save = saveEmail;
});

window.toggleMercury = function() {
  if (editing) {
    return saveEmail();
  }
  _mixpanel('editing');
  ga('_trackEvent', "registration", "editing");
  editing = !editing;
  Mercury.trigger('toggle:interface');
  $('#salsa').html('Save');
};

var close = function() {
  if (editing) {
    Mercury.trigger('toggle:interface');
  }
}

_mixpanel('loaded');
