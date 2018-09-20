const createAnalyser = require("web-audio-analyser");

module.exports = function analyse(audio, options = { fftSize: 64 }, callback) {
  audio.addEventListener("canplay", function() {
    let analyser = createAnalyser(audio, { stereo: false, audible: true });
    analyser.analyser.fftSize = options.fftSize;

    callback(analyser);
  });
};
