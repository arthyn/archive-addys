var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function(document, window) {
	const MS_DAYS = 1000 * 60 * 60 * 24;

	function formatTens(n) {
		// format integers to have at least two digits
		return (n < 10) ? '0'+n : ''+n;
	}

	var domReady = function(callback) {
	    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
	};

	function ajaxPost (elements, action, callback) {
	    var url = action,
	        xhr = new XMLHttpRequest();

	    var params = elements.map(function(el) {
	        //Map each field into a name=value string, make sure to properly escape!
	        return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
	    }).join('&'); //Then join all the strings by &

	    xhr.open("POST", url);
	    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	    //.bind ensures that this inside of the function is the XHR object.
	    xhr.onload = callback.bind(xhr); 

	    //All preperations are clear, send the request!
	    xhr.send(params);
	}

	function submitForm(e) {
		e.preventDefault();

		var body = document.querySelector('body');
		var signup = document.querySelector('#signup');
		var submit = document.querySelector('#form-submit');
		var elements = signup.querySelectorAll('input,select');


		elements = [].slice.call(elements);

		submit.className += ' loading';
		submit.innerHTML = '<div class="loader">Loading...</div>';
		ajaxPost(elements, signup.action, function(){
			if(this.status === 200) {
				signup.innerHTML = '<p>Thank you for completing the form. One of our enrollment counselors will contact you soon.</p>';
				var state = elements.filter(function (element) {
					return element.id.indexOf('state-select') > -1;
				});
				window.dataLayer = window.dataLayer || [];
				 window.dataLayer.push({
				   'event' : 'formSubmissionSuccess',
				   'formId' : 'contactForm',
				   'state' : state
				 });
				console.log(window.dataLayer);
			} else if(this.status !== 200) {
				signup.innerHTML = '<p>Your submission was unable to be submitted. Please try again later.</p>';
			}
		});

		return false;
	}

	function checkInputs() {
		var inputs = document.querySelectorAll('input:not([type=checkbox]):not([type=submit]), textarea, select');
		for(var i=0;i<inputs.length; i++) {
		    inputs[i].addEventListener('focus', isBlank, false);
		    inputs[i].addEventListener('keyup', isBlank, false);
		    inputs[i].addEventListener('change', isBlank, false);
		    inputs[i].addEventListener('blur', isBlank, false);
		    inputs[i].addEventListener('mousedown', isBlank, false);
		    
		    var evt = document.createEvent('HTMLEvents');
		    evt.initEvent('change', false, true);
		    inputs[i].dispatchEvent(evt);
		}
		function isBlank(event) {
		    var target = event.target;
		    var value = target.value;
		  
		    if(isEmpty(value)) {
		      if(!target.classList.contains('input-blank'))
		        target.classList.add('input-blank');
		    } else {
		        target.classList.remove('input-blank');
		    }
		}
		function isEmpty(str) {
		    return (!str || 0 === str.length);
		}
	}

	function attachFormSubmit() {
		var signup = document.querySelector('#signup');
		signup.addEventListener('submit', submitForm, false);
	}

	function debounce(func, wait, immediate) {
	    var timeout;
	    return function() {
	        var context = this, args = arguments;
	        var later = function() {
	            timeout = null;
	            if (!immediate) func.apply(context, args);
	        };
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) func.apply(context, args);
	    };
	};

	var clickEvent = (function() {
	  if ('ontouchstart' in document.documentElement === true)
	    return 'touchstart';
	  else
	    return 'click';
	})();

	var handleNav = debounce(function (e) {
		e.preventDefault();
		e.stopPropagation();

		var menu = document.getElementById('primary-menu');
		var toggle = document.querySelector('.menu-toggle');
		var body = document.querySelector('body');
		menu.classList.toggle('active');
		body.classList.toggle('expanded');
		if (menu.classList.contains('active')) {
			toggle.setAttribute('aria-expanded', 'true');
			menu.querySelector('ul').focus();
		} else {
			toggle.setAttribute('aria-expanded', 'false');
			toggle.focus();
		}
	}, 25, true);

	var handleEsc = debounce(function (evt) {
		e = evt || window.event;
		var isEscape = false;
		if ("key" in evt) {
		    isEscape = (evt.key == "Escape" || evt.key == "Esc");
		} else {
		    isEscape = (evt.keyCode == 27);
		}
		if (isEscape) {
			var menu = document.getElementById('primary-menu');
			var toggle = document.querySelector('.menu-toggle');
			var body = document.querySelector('body');

			menu.classList.remove('active');
			body.classList.remove('expanded');
			toggle.setAttribute('aria-expanded', 'false');
			toggle.focus();
		}
	}, 25, true);

	function attachKeyboardMenuListener() {
		document.addEventListener('keyup', handleEsc, false);
	}

	function attachNavHandler() {
		var toggle = document.querySelector('.menu-toggle');
		if(toggle) {
			toggle.addEventListener(clickEvent, handleNav, false);
		}
	}

	// ——————————————————————————————————————————————————
	// TextScramble
	// ——————————————————————————————————————————————————

	var TextScramble = function () {
	  function TextScramble(el) {
	    _classCallCheck(this, TextScramble);

	    this.el = el;
	    this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!<>\/[]{}—=+*^?#_';
	    this.update = this.update.bind(this);
	  }

	  _createClass(TextScramble, [{
	    key: 'setText',
	    value: function setText(newText) {
	      var _this = this;

	      var oldText = this.el.innerText;
	      var length = Math.max(oldText.length, newText.length);
	      var promise = new Promise(function (resolve) {
	        return _this.resolve = resolve;
	      });
	      this.queue = [];
	      for (var i = 0; i < length; i++) {
	        var from = oldText[i] || '';
	        var to = newText[i] || '';
	        var start = Math.floor(Math.random() * 40);
	        var end = start + Math.floor(Math.random() * 40);
	        this.queue.push({ from: from, to: to, start: start, end: end });
	      }
	      cancelAnimationFrame(this.frameRequest);
	      this.frame = 0;
	      this.update();
	      return promise;
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      var output = '';
	      var complete = 0;
	      for (var i = 0, n = this.queue.length; i < n; i++) {
	        var _queue$i = this.queue[i];
	        var from = _queue$i.from;
	        var to = _queue$i.to;
	        var start = _queue$i.start;
	        var end = _queue$i.end;
	        var char = _queue$i.char;

	        if (this.frame >= end) {
	          complete++;
	          output += to;
	        } else if (this.frame >= start) {
	          if (!char || Math.random() < 0.28) {
	            char = this.randomChar();
	            this.queue[i].char = char;
	          }
	          output += '<span class="dud">' + char + '</span>';
	        } else {
	          output += from;
	        }
	      }
	      this.el.innerHTML = output;
	      if (complete === this.queue.length) {
	        this.resolve();
	      } else {
	        this.frameRequest = requestAnimationFrame(this.update);
	        this.frame++;
	      }
	    }
	  }, {
	    key: 'randomChar',
	    value: function randomChar() {
	      return this.chars[Math.floor(Math.random() * this.chars.length)];
	    }
	  }]);

	  return TextScramble;
	}();

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

			if(current !== number.toString() && isNumber) {
				this[unit].textContent = number;
			}

			this[unit].setAttribute('data-text', number);
		},
		update: function update() {
		  var _this2 = this;

		  var start = new Date();
		  var diff = this.end.getTime() - start.getTime();
		  var units = ['days', 'hours', 'mins', 'secs'];

		  if (diff <= 0) {
		    diff = 0;
		    startEndSequence();
		    return;
		  }

		  units.forEach(function (element) {
		    return _this2.updateText(element, diff);
		  });

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

	function createRndTimer(duration, callback) {
		return function (items) {
			const timer = window.setTimeout(function(items) {
				callback();
			}, Math.random() * duration, items)
			return timer;
		};
	}

	function initiateRellax() {
		var elements = document.querySelectorAll('.rellax');
		if(elements.length > 0) {
			var rellax = new Rellax('.rellax');
		}
	}

	if(document.querySelector('#tarot-switcher')) {
		var app = new Vue({
		    el: '#tarot-switcher',
		    data: {
		        tarotDeck: tarotCards,
		        currentCard: 'creator'
		    },
		    computed: {
		    	revealedCards: function() {
		    	    return this.tarotDeck.filter(function(element) {
		    	        return !element.disabled;
		    	    });
		    	}
		    },
		    methods: {
		        isDiamond: function(card) {
		            return card.id % 2 === 0;
		        }
		    },
		    ready: function() {
		    	//this.$set(this, 'tarotDeck', tarotCards);
		    	/*this.currentCard = tarotCards.find(function(element) {
	                return element.name === 'creator';
	            });*/
		    }
		});

		// handle routing
		function onHashChange () {
		  var card = window.location.hash.replace(/#\/?/, '');
		  var cardInDeck = app.tarotDeck.find(function(element) {
		        return element.name === card;
		    });
		  if (cardInDeck) {
		    app.currentCard = cardInDeck;
		  } else {
		    window.location.hash = '';
		    app.currentCard = app.tarotDeck.find(function(element) {
		        return element.name === 'creator';
		    });
		  }
		}

		window.addEventListener('hashchange', onHashChange);
		onHashChange();
	}

	domReady(function() {
		const endDate = new Date(2018, 0, 22, 17);
		if(document.querySelector('.ceremony-countdown')) {
			countdown.start(endDate);
		}

		//attachTarotSwitcher();
		attachNavHandler();
		attachKeyboardMenuListener();
		initiateRellax();
	});
})(document, window)
