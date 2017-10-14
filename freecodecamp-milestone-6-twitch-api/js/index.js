feather.replace();

const baseUrl = 'https://wind-bow.glitch.me/twitch-api';
const streamersToDisplay = [
  'esl_sc2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
];

const getStreamers = (streamers, callback) => {
  const streamerData = [];
  const promises = [];

  for (let i = 0; i < streamers.length; i += 1) {
    const url = `${baseUrl}/streams/${streamers[i]}?callback=?`;
    const req = $.getJSON(url).done((response) => {
      console.log(url);
      console.log(response);
      if (response.hasOwnProperty('status')) {
        console.log(`Error retrieving streamer:${streamers[i]}`);
      } else if (response.stream === null) {
        streamerData.push({
          name: streamers[i],
          status: 'Offline',
          game: null,
          image: null
        });
      } else {
        streamerData.push({
          name: streamers[i],
          status: 'Online',
          game: response.stream.game,
          image: response.stream.channel.logo
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
  items.map((item) => {
    html += '<li class="list-group-item streamer">';
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
    html += '</li>';
    return html;
  });
  $('#streamers').html(html);
};

$(document).ready(() => {
  getStreamers(streamersToDisplay, (streamers) => {
    console.log(streamers);
    renderList(streamers);

    const listOptions = {
      valueNames: [ 'streamer-name', 'streamer-status' ]
    };
    
    const hackerList = new List('streamers', listOptions);
  });
});
