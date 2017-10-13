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
  'noobs2ninjas'
];

const getStreamers = (streamers) => {
  let streamerData = [];

  // for (let i = 0; i < streamers.length; i += 1) {
  streamerData = streamers.map((streamer) => {
    $.getJSON(`${baseUrl}/streams/${streamer}?callback=?`, (response) => {
      // console.log(response);
      if (response.stream === null) {
        streamerData.push({
          name: streamer,
          status: 'Offline',
          game: null,
          image: null
        });
      } else {
        streamerData.push({
          name: streamer,
          status: 'Online',
          game: response.stream.game,
          image: response.stream.channel.logo
        });
      }
    });
    return streamer;
  });
  return streamerData;
};

const renderList = (items) => {
  let html = '';
  html = items.map((item) => {
    html += '<li class="list-group-item streamer">';
    let image = 'https://via.placeholder.com/50x50';
    if (item.image !== null) {
      image = item.image;
    }
    html += `<img src="${image}" class="img-responsive rounded-circle streamer-image"></img>`;
    html += `<span class="streamer-name">${item.name}</span>`;
    if (item.status === 'Online') {
      html += '<span class="badge badge-success badge-pill status">Online</span>';
    } else {
      html += '<span class="badge badge-secondary badge-pill status">Offline</span>';
    }
    html += '<span class="badge badge-success badge-pill status">Online</span>';
    if (item.game !== null) {
      html += `<small class="text-secondary streamer-game">${item.game}</small>`;
    }
    html += '</li>';
    return html;
  });
  // for (let item of items) {
  //   html += '<li class="list-group-item streamer">';
  //   let image = 'https://via.placeholder.com/50x50';
  //   if (item.image === null) {
  //     image = item.image;
  //   }
  //   html += '<img src="' + image + '" class="img-responsive rounded-circle streamer-image"></img>';
  //   html += '<span class="streamer-name">' + item.name + '</span>';
  //   if (item.status === 'Online') {
  //     html += '<span class="badge badge-success badge-pill status">Online</span>';
  //   } else {
  //     html += '<span class="badge badge-secondary badge-pill status">Offline</span>';
  //   }
  //   html += '<span class="badge badge-success badge-pill status">Online</span>';
  //   if (item.game !== null) {
  //     html += '<small class="text-secondary streamer-game">' + item.game + '</small>';
  //   }
  //   html += '</li>';
  // }
  $('#streamers').html(html);
};

$(document).ready(() => {
  const streamers = getStreamers(streamersToDisplay);
  console.log(streamers);
  renderList(streamers);
});
