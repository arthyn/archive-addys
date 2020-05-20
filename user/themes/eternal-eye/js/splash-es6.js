(function(document, window) {
  const MS_DAYS = 1000 * 60 * 60 * 24;
  const MS_HOURS = 1000 * 60 * 60;
  const MS_MINS = 1000 * 60;
  const MS_SECS = 1000;

  function formatTens(n) {
  	// format integers to have at least two digits
  	return (n < 10) ? '0'+n : ''+n;
  }

  function addMinutes(date, minutes) {
      return new Date(date.getTime() + minutes*60000);
  }

  var domReady = function(callback) {
      document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
  };

  // ——————————————————————————————————————————————————
  // TextScramble
  // ——————————————————————————————————————————————————

  class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!<>\/[]{}—=+*^?#_'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }

  var countdown = {
    end: '',
    getTime: function(diff, units) {
      return Math.abs(Math.floor((diff) / units));
    },
    getRemainder: function(diff, units) {
      return diff - (this.getTime(diff, units) * units);
    }, 
    getDays: function(diff) {
      return this.getTime(diff, MS_DAYS);
    },
    getHours: function(diff) {
      const remainder = this.getRemainder(diff, MS_DAYS);
      return this.getTime(remainder, MS_HOURS);
    },
    getMins: function(diff) {
      const hourRemainder = this.getRemainder(diff, MS_DAYS);
      const minsRemainder = this.getRemainder(hourRemainder, MS_HOURS);
      return this.getTime(minsRemainder, MS_MINS);
    },
    getSecs: function(diff) {
      const hourRemainder = this.getRemainder(diff, MS_DAYS);
      const minsRemainder = this.getRemainder(hourRemainder, MS_HOURS);
      const secsRemainder = this.getRemainder(minsRemainder, MS_MINS);
      return this.getTime(secsRemainder, MS_SECS);
    },
    updateText: function (unit, diff) {
      var unitFunction = 'get' + unit.substr(0,1).toUpperCase() + unit.substr(1);
      var current = this[unit].textContent;
      var isNumber = !isNaN(current);
      var number = formatTens(this[unitFunction](diff));
      var rand = Math.random();

      if(current !== number.toString() && isNumber) {
        this[unit].textContent = number;
      }

      if(rand > .9998) {
        this['ts_' + unit].setText(number);
      }
      this[unit].setAttribute('data-text', number);
    },
    update: function() {
      const start = new Date();
      var diff = this.end.getTime() - start.getTime();
      const units = ['days', 'hours', 'mins', 'secs'];

      if (diff <= 0 ) {
        diff = 0;
        startEndSequence();
        return;
      }

      units.forEach(element => this.updateText(element, diff));

      requestAnimationFrame(this.update.bind(this));
    },
    start: function(date) {
      this.end = date;

      this.days = document.querySelector('.day-number');
      this.ts_days = new TextScramble(this.days);

      this.hours = document.querySelector('.hours');
      this.ts_hours = new TextScramble(this.hours);

      this.mins = document.querySelector('.minutes');
      this.ts_mins = new TextScramble(this.mins);

      this.secs = document.querySelector('.seconds');
      this.ts_secs = new TextScramble(this.secs);

      requestAnimationFrame(this.update.bind(this));
    }
  }

  function createGlitchTimer(items) {
    const timer = createRndTimer(1000, function() {
      items.forEach(item => item.classList.remove('glitch'));
    })(items);

    return timer;
  }

  function createGlitchDelay(items) {
    const timer = createRndTimer(5000, function() {
      items.forEach(item => item.classList.add('glitch'));
      createGlitchTimer(items);
      createGlitchDelay(items);
    })(items);

    return timer;
  }

  /*function startScramble(items) {
    const timer = createRndTimer(3000, function() {
      items.forEach(item => )
    })(items)

    return timer;
  }*/

  function createRndTimer(duration, callback) {
    return function (items) {
      var timer = window.setTimeout(function(items) {
        callback();
      }, (Math.random() * duration) + 2000, items)
      return timer;
    };
  }

  function glitch() {
    var spans = document.querySelectorAll('.clock span');
    createGlitchDelay(spans);
  }

  function playVideo() {
    if(vids.introLoaded && animationFinished && vids.introVideo.currentTime === 0) {
      var loader = document.querySelector('.loader');
      loader.classList.remove('active');
      vids.introVideo.play();
    } else {
      window.setTimeout(function() {
        playVideo();
      }, 100);
    }
  }

  function startEndSequence() {
    var body = document.querySelector('body');
    var lastNumber = document.querySelector('.clock span:last-child');
    var logo = document.querySelector('.order-logo');

    body.classList.add('end-sequence');
    
    lastNumber.addEventListener('animationend', function() {
      var loader = document.querySelector('.loader');
      loader.classList.add('active');
      animationFinished = true;
      playVideo();
    });

    vids.introVideo.addEventListener('canplaythrough', function() {
      playVideo();
    });
    
    vids.introVideo.addEventListener('timeupdate', function() {
      let animatingLogo = false;

      return function () {
        if(this.currentTime >= 10) {
          body.classList.add('load-brand');
          vids.smokeVideo.play();
  
          if (!animatingLogo) {
            animatingLogo = true;
            new Vivus(
              'order-logo',
            {
              duration: 200,
              start: 'autostart'
            }, function(){});
          }        
        }
      }
    }());
  }
  var animationFinished = false;
  var vids = {
    introURL: '',
    smokeURL: '',
    introLoaded: false,
    loadVid: function(src, store, callback) {
      var req = new XMLHttpRequest();
      req.open('GET', src, true);
      req.responseType = 'blob';

      req.onload = function() {
         // Onload is triggered even on 404
         // so we need to check the status code
         if (req.status === 200) {
            var videoBlob = req.response;
            var vid = URL.createObjectURL(videoBlob); // IE10+
            // Video is now downloaded
            // and we can set it as source on the video element
            this[store] = vid;
            callback.apply(this);
         }
      }.bind(this);

      req.onerror = function() {
         // Error
      }

      req.send();
    },
    loadIntroVideo: function() {
      this.introVideo.src = this.introURL;
    },
    loadSmokeVideo: function() {
      this.smokeVideo.src = this.smokeURL;
    },
    init: function() {
      this.smokeVideo = document.querySelector('.smoke-video');
      this.introVideo = document.querySelector('.intro-video');

      this.loadVid('/user/themes/eternal-eye/media/EternalEyeReveal-edited.mp4', 'introURL', this.loadIntroVideo);

      this.introVideo.addEventListener('loadeddata', function() {
        this.introLoaded = true;
        this.loadVid('/user/themes/eternal-eye/media/smoke-edited.mp4', 'smokeURL', this.loadSmokeVideo);
      }.bind(this));
    }
  }

  vids.init();

  domReady(function() {

    var endDate = new Date(2017, 11, 7, 12, 45); //new Date(2017, 11, 7, 12, 45)
    var today = new Date();
    var diff = endDate.getTime() - today.getTime();
    var endButton = document.querySelector('.end-button');

    if(document.querySelector('.clock')) {
      countdown.start(diff <= 0 ? new Date(today.getTime() + (30 * 1000)) : endDate);
      glitch();
    }

    // if(diff <= 0) {
    //   startEndSequence();
    // }

    if(endButton) {
      endButton.addEventListener('click', startEndSequence, false);
    }
  });
})(document, window)