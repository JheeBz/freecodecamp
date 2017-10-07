const baseurl = 'https://en.wikipedia.org/w/api.php?';
const randurl = 'https://en.wikipedia.org/wiki/Special:Random';
const noResultsMessage = 'No results for this search. Re-enter your search or click the "Random" button to get a random article.';

feather.replace();

$('#random').click(() => {
  window.open(randurl, '_blank');
});

$('#search-button').click(() => {
  search($('#search-field').val());
});

$('#search-field').keypress((e) => {
  if (e.which == 13) {
    e.preventDefault();
    search($('#search-field').val());
  }
});

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

function search(term) {
  const filtered_term = encodeURI(term);
  // console.log(filtered_term);
  const endpoint = `format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${filtered_term}&gsrlimit=10&pilimit=max&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max`;
  let html = '';
  $.ajax({
    url: baseurl + endpoint,
    dataType: 'jsonp',
    type: 'get',
    success: res => {
      if (res.hasOwnProperty('error')) {
        html += '<div class="row">';
        html += '<div class="col-md-12">';
        html += '<div class="no-results">';
        html += `<p class="lead description">${noResultsMessage}</p>`;
        html += '</div></div></div>';
      } else {
        const pages = $.map(res.query.pages, (el) => {
        return el;
        });
        pages.forEach(page => {
          html += '<div class="row">';
          html += '<div class="col-md-12">';
          html += '<div class="result-item">';
          html += `<a href="https://en.wikipedia.org/?curid=${page.pageid}" target="_blank">`;
          html += '<div class="wiki-text">';
          html += `<h5>${page.title}</h5>`;
          html += `<p class="lead description">${page.extract}</p>`;
          html += '</div></div></div></div>';
        });
      }
      $('#results').html(html);
      $('#results').animateCss('fadeIn');
    }
  });
}