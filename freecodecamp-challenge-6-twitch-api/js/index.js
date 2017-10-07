const baseurl = 'https://wind-bow.glitch.me/';

const streamers = [
  "ESL_SC2", 
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

const getStreamerData = () => {
  endpoint = ''; 
  $.ajax({
    url: baseurl + endpoint,
    dataType: 'jsonp',
    type: 'get',
    success: res => {
      
    }
  });
}