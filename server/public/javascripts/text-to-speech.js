function checkCompatibility() {
      if (!('speechSynthesis' in window)) {
        alert('Test')
      }
    }
    checkCompatibility()
    var voiceOptions = document.getElementById('voiceOptions')
    var myText = document.getElementById('myText')
    var voiceMap = []
    function loadVoices() {
      var voices = speechSynthesis.getVoices()
      for (var i = 0; i < voices.length; i++) {
        var voice = voices[i]
        var option = document.createElement('option')
        option.value = voice.name
        option.innerHTML = voice.name
        voiceOptions.appendChild(option)
        voiceMap[voice.name] = voice
      }
    }
    window.speechSynthesis.onvoiceschanged = function(e){
      loadVoices()
    }
    function speak() {
      var msg = new SpeechSynthesisUtterance()
      msg.voice = voiceMap[voiceOptions.value]
      msg.text = myText.value
      window.speechSynthesis.speak(msg)
    }
