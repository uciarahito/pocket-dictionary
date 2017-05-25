function checkCompatibility() {
      if (!('speechSynthesis' in window)) {
        alert('Test')
      }
    }
    checkCompatibility()
    var voiceOptions = 'Google UK English Male'
    var myText = document.getElementById('myText')
    var voiceMap = []
    function loadVoices() {
      var voices = speechSynthesis.getVoices()
      for (var i = 0; i < voices.length; i++) {
        var voice = voices[i]
        var option = document.createElement('option')
        option.value = voice.name
        option.innerHTML = voice.name
        // voiceOptions.appendChild(option)
        voiceMap[voice.name] = voice
      }
    }
    window.speechSynthesis.onvoiceschanged = function(e){
      loadVoices()
    }
    function speak() {
      var myText = document.getElementById('myText')
      var msg = new SpeechSynthesisUtterance()
      msg.voice = voiceMap[voiceOptions]
      msg.text = myText.value
      console.log(myText.value);
      window.speechSynthesis.speak(msg)
    }
