$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content}`:"";
    var image   = message.image_url   ? `${message.image_url}`:"";

    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">${message.user_name}</div>
                    <div class="upper-message__date">${message.date}</div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">${content}</p>
                    <img src="${image}" class="lower-message__image">
                  </div>
                </div>`
    return html;
  }

  function scrollBottom(){
    var target = $(".message").last();
    var position = target.offset().top + $(".messages").scrollTop();
    $(".messages").animate({
      scrollTop: position
    }, 300, "swing");
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html);
      $("#new_message")[0].reset();
      scrollBottom();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $(".form__submit").prop("disabled", false);
    })
  });
});