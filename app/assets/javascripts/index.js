$(function() {
  
  function buildHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name" name="name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    return html;
  }

  function errorHTML(err) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${err}</p>
                </div>`
    $("#user-search-result").append(html);
  }
  
  function buildingHTML(user_name, user_id) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
                  <input name="group[user_ids][]" type="hidden" value="${user_id}">
                  <p class="chat-group-user__name">${user_name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
                </div>`
    return html;
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      url: "/users",
      type: 'GET',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          var html = buildHTML(user);
          $("#user-search-result").append(html);
        });
      }
      else {
        errorHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })

    $(document).on("click", ".user-search-add", function() {
      var user_name = $(this).attr("data-user-name");
      var user_id   = $(this).attr("data-user-id");
      $(this).parent().remove();
      var html = buildingHTML(user_name, user_id);
      $("#chat-group-users").append(html);
    });
  
    $(document).on("click", ".user-search-remove", function() {
      $(this).parent().remove();
    });
  });
});