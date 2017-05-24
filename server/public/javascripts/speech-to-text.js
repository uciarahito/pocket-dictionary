var r = document.getElementById('result')
function startConverting(){
  if ('webkitSpeechRecognition' in window) {
    var speechRecognizer = new webkitSpeechRecognition()
    speechRecognizer.continous = true
    speechRecognizer.interimResults = true
    speechRecognizer.lang = 'id-ID'
    speechRecognizer.start();
    var finalTranscripts = ''
    speechRecognizer.onresult = function(event){
      var interimTranscripts = ''
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript
        transcript.replace("\n", "<br>")
        if (event.results[i].isFinal) {
          finalTranscripts += transcript
        } else {
          interimTranscripts += transcript
        }
      }
      r.innerHTML = finalTranscripts + interimTranscripts
    }
    speechRecognizer.onerror = function(event) {
    }
  } else {
    r.innerHTML = "Your browser is not supported. If google chrome, please upgrade"
  }
}
