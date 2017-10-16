feather.replace();

const baseUrl = 'https://wind-bow.glitch.me/twitch-api';
const streamersToDisplay = [
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
  'esl_sc2'
];

const getStreamers = (streamers, callback) => {
  const streamerData = [];
  const promises = [];

  for (let i = 0; i < streamers.length; i += 1) {
    const url = `${baseUrl}/streams/${streamers[i]}?callback=?`;
    const req = $.getJSON(url).done((response) => {
      if (response.hasOwnProperty('status')) {
        console.error(`Error retrieving streamer:${streamers[i]}`);
      } else if (response.stream === null) {
        streamerData.push({
          name: streamers[i],
          status: 'Offline',
          game: null,
          image: null,
        });
      } else {
        streamerData.push({
          name: streamers[i],
          status: 'Online',
          game: response.stream.game,
          image: response.stream.channel.logo,
        });
      }
    });
    promises.push(req);
  }
  $.when.apply(null, promises).done(() => {
    callback(streamerData);
  });
};

const renderList = (items) => {
  let html = '';
  if (items.length > 0) {
    items.map((item) => {
      html += '<li class="list-group-item streamer">';
      html += `<a href="https://go.twitch.tv/${item.name}" class="streamer-link" alt="${item.name} stream" target="_blank">`;
      let image = 'https://via.placeholder.com/50x50';
      if (item.image !== null) {
        image = item.image;
      }
      html += `<img src="${image}" class="img-responsive rounded-circle streamer-image"></img>`;
      html += `<span class="streamer-name">${item.name}</span>`;
      if (item.status === 'Online') {
        html += '&nbsp;<span class="badge badge-success badge-pill streamer-status">Online</span>';
      } else {
        html += '&nbsp;<span class="badge badge-secondary badge-pill streamer-status">Offline</span>';
      }
      if (item.game !== null) {
        html += `&nbsp;<small class="text-secondary streamer-game">${item.game}</small>`;
      }
      html += '</a></li>';
      return html;
    });
  } else {
    html += '<p class="lead">Error loading streamers</p>';
  }
  $('#streamers').html(html);
};

$(document).ready(() => {
  getStreamers(streamersToDisplay, (streamers) => {
    renderList(streamers);

    const listOptions = {
      valueNames: ['streamer-name', 'streamer-status'],
    };

    const list = new List('streamer-list', listOptions);
    list.sort('streamer-status', {order: 'desc'});

    // $('.filter-online').click(() => {
    //   list.filter((item) => {
    //     console.log(item);
    //     if (item.streamer-status === 'Online') {
    //       return true;
    //     }
    //     return false;
    //   });
    // });
  });
});
