function getQuote() {
  $("#get-quote").attr("disabled", true);
  let url = "https://quotesondesign.com/wp-json";
  let endpoint= url + "/posts?filter[orderby]=rand&filter[posts_per_page]=1";
  $.ajax({
      url: endpoint,
      type: 'get',
      success: function(response) {
          let message = response[0].content;
          message = message.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");
          message = message.replace(/\s+$/, "");
          let author  = response[0].title;
          $("#quote").html("&quot;" + message + "&quot;");
          $("#author").html(author);
          $("#quote").animateCss('fadeIn');
          $("#author").animateCss('fadeIn');
          $("#get-quote").attr("disabled", false);
      },
      dataType: 'json',
      cache: false
  });
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

$(document).ready(() => {
  getQuote();
});

$("#get-quote").click(() => {
  getQuote();
});

$('#tweet-quote').click(() => {
  let message = $("#quote").text();
  let author  = $("#author").text();
  message = encodeURI(message + " - " + author + " #freecodecamp");
  let url = "https://twitter.com/home?status="
  let link = url + message;
  window.open(link, '_blank');
});