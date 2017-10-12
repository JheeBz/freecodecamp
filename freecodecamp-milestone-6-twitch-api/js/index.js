feather.replace();

// axios.defaults.baseUrl = 'https://wind-bow.glitch.me/twitch-api';
baseUrl = 'https://wind-bow.glitch.me/twitch-api';
const streamersToDisplay = [
  "esl_sc2", 
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

const getStreamers = (streamers) => {
  let streamerData = [];
  for (let i = 0; i < streamers.length; i++) {
    $.getJSON(`${baseUrl}/streams/${streamers[i]}?callback=?`, (response) => {
      // console.log(response);
      if (response["stream"] === null) {
        streamerData.push({
          name: streamers[i],
          status: 'Offline',
          game: null,
          image: null
        });
        console.log(streamerData);
      } else {
        streamerData.push({
          name: streamers[i],
          status: 'Online',
          game: response.stream.game,
          image: response.stream.channel.logo
        });
      }
    });
  }
  return streamerData;
}

const renderList = (items) => {
  //console.log('Inside function, outside loop');
  // console.log(items.length);
  let html = '';
  for(item in items) {
    // console.log('Inside loop');
    html += '<li class="list-group-item streamer">';
    let image = 'https://via.placeholder.com/50x50';
    if (item.image === null) {
      image = item.image;
    }
    html += '<img src="' + image + '" class="img-responsive rounded-circle streamer-image"></img>';
    html += '<span class="streamer-name">' + item.name + '</span>';
    if (item.status = 'Online') {
      html += '<span class="badge badge-success badge-pill status">Online</span>';
    } else {
      html += '<span class="badge badge-secondary badge-pill status">Offline</span>';
    }
    if (item.game !== null) {
      html += '<small class="text-secondary streamer-game">' + item.game + '</small>';
    }
    html += '</li>';
  };
  $('#streamers').html(html);
}
  
const streamerData = getStreamers(streamersToDisplay);
console.log(JSON.stringify(streamerData));
renderList(streamerData);