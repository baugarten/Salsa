var editing = false;
function saveEmail() {
  var email = $.trim($("#email textarea").val());
  email = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/.exec(email);

  if (email) {
    email = email[0];
    $.post(SERVER_NAME + "/mailing/signup", { email: email })
    .done(function(data) {
      $(".warning-row,.signup").hide();
      $(".success-row").show();
    })
    .fail(function(data) {
      $(".success-row").hide();
      $(".warning-row,.signup").show();
    });
  } else {
    alert("That email wasn't valid, try another one")
  }
}
$(window).on('mercury:ready', function() {
  Mercury.PageEditor.prototype.save = saveEmail;
});

toggleMercury = function() {
  if (editing) {
    return saveEmail();
  }
  editing = !editing;
  Mercury.trigger('toggle:interface')
  $('#salsa').html('Save');
}
