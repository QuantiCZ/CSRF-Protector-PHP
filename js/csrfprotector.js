/**
 * =================================================================
 * Javascript code for OWASP CSRF Protector
 * Task it does: Fetch csrftoken from cookie, and attach it to every
 * 		POST request
 *		Allowed GET url
 *			-- XHR
 *			-- Static Forms
 *			-- URLS (GET only)
 *			-- dynamic forms
 * =================================================================
 */

var CSRFP_FIELD_TOKEN_NAME = 'csrfp_hidden_data_token';
var CSRFP_FIELD_URLS = 'csrfp_hidden_data_urls';

var CSRFP = {
	CSRFP_TOKEN: 'csrfp_token',
	/**
	 * Array of patterns of url, for which csrftoken need to be added
	 * In case of GET request also, provided from server
	 *
	 * @var {Array}
	 */
	checkForUrls: [],
	/**
	 * Function to check if a certain url is allowed to perform the request
	 * With or without csrf token
	 *
	 * @param {string} url
	 *
	 * @return {Boolean} 	true if csrftoken is not needed
	 * 						false if csrftoken is needed
	 */
	_isValidGetRequest: function(url) {
		for (var i = 0; i < CSRFP.checkForUrls.length; i++) {
			var match = CSRFP.checkForUrls[i].exec(url);
			if (match !== null && match.length > 0) {
				return false;
			}
		}
		return true;
	},
	/**
	 * Function to get Auth key from cookie and return it to requesting function
	 *
	 * @param: void
	 *
	 * @return {string|Boolean} csrftoken retrieved from cookie
	 */
	_getAuthKey: function() {
		var re = new RegExp(CSRFP.CSRFP_TOKEN +"=([^;]+)(;|$)");
		var RegExpArray = re.exec(document.cookie);

		if (RegExpArray === null) {
			return false;
		}
		return RegExpArray[1];
	},
	/**
	 * Function to get domain of any url
	 *
	 * @param {string} url
	 *
	 * @return {string} domain of url
	 */
	_getDomain: function(url) {
		if (url.indexOf("http://") !== 0
			&& url.indexOf("https://") !== 0)
			return document.domain;
		return /http(s)?:\/\/([^\/]+)/.exec(url)[2];
	},
	/**
	 * Function to create and return a hidden input element
	 * For storing the CSRFP_TOKEN
	 *
	 * @param: void
	 *
	 * @return {HTMLInputElement} input element
	 */
	_getInputElt: function() {
		var hiddenObj = document.createElement("input");
		hiddenObj.setAttribute('name', CSRFP.CSRFP_TOKEN);
		hiddenObj.setAttribute('class', CSRFP.CSRFP_TOKEN);
		hiddenObj.type = 'hidden';
		hiddenObj.value = CSRFP._getAuthKey();
		return hiddenObj;
	},
	/**
	 * Returns absolute path for relative path
	 *
	 * @param {string} base base url
	 * @param {string} relative relative url
	 *
	 * @return {string} absolute path
	 */
	_getAbsolutePath: function(base, relative) {
		var stack = base.split("/");
		var parts = relative.split("/");
		// remove current file name (or empty string)
		// (omit if "base" is the current folder without trailing slash)
		stack.pop();

		for (var i = 0; i < parts.length; i++) {
			if (parts[i] === ".")
				continue;
			if (parts[i] === "..")
				stack.pop();
			else
				stack.push(parts[i]);
		}
		return stack.join("/");
	},
	/**
	 * Remove jcsrfp-token run fun and then put them back
	 *
	 * @param {function} fun
	 * @param {object} obj reference form obj
	 *
	 * @return function
	 */
	_csrfpWrap: function(fun, obj) {
		return function(event) {
			// Remove CSRf token if exists
			if (typeof obj[CSRFP.CSRFP_TOKEN] !== 'undefined') {
				var target = obj[CSRFP.CSRFP_TOKEN];
				target.parentNode.removeChild(target);
			}

			// Trigger the functions
			var result = fun.apply(this, [event]);

			// Now append the csrfp_token back
			obj.appendChild(CSRFP._getInputElt());

			return result;
		};
	},
	/**
	 * Initialises the CSRFProtector js script
	 *
	 * @param: void
	 *
	 * @return void
	 */
	_init: function() {
		CSRFP.CSRFP_TOKEN = document.getElementById(CSRFP_FIELD_TOKEN_NAME).value;
		try {
			CSRFP.checkForUrls = JSON.parse(document.getElementById(CSRFP_FIELD_URLS).value);
		} catch (err) {
			console.error(err);
			console.error('[ERROR] [CSRF Protector] unable to parse blacklisted url fields.');
		}

		//convert these rules received from php lib to regex objects
		for (var i = 0; i < CSRFP.checkForUrls.length; i++) {
			CSRFP.checkForUrls[i] = CSRFP.checkForUrls[i].replace(/\*/g, '(.*)')
				.replace(/\//g, "\\/");
			CSRFP.checkForUrls[i] = new RegExp(CSRFP.checkForUrls[i]);
		}

	}

};

//==========================================================
// Adding tokens, wrappers on window onload
//==========================================================

function csrfprotector_init() {

	// Call the init function
	CSRFP._init();

	$(document).on('submit', 'form', function () {
		var form = $(this);
		var csrfInput = form.find("input[name=" + CSRFP.CSRFP_TOKEN + "]");
		if (csrfInput.length > 0) {
			csrfInput.val(CSRFP._getAuthKey());
		} else {
			form.append(CSRFP._getInputElt());
		}
	});

	$.ajaxSetup({
		beforeSend: function(xhr, settings) {
			xhr.setRequestHeader('HTTP_' + CSRFP.CSRFP_TOKEN, CSRFP._getAuthKey());
		}
	});

	$.ajaxPrefilter(function (options, originalOptions, jqXHR){
		var url = options.url;
		if (url.match(/csrfToken/) === null) {
			var start = (url.match(/\?/) ? '&' : '?');
			options.url = options.url + start + 'csrfToken=' + CSRFP._getAuthKey();
		}
	});

	for (var i = 0; i < document.links.length; i++) {
		document.links[i].addEventListener("mousedown", function(event) {
			var href = event.target.href;
			if(typeof href === "string")
			{
				var urlParts = href.split('#');
				var url = urlParts[0];
				var hash = urlParts[1];

				if(CSRFP._getDomain(url).indexOf(document.domain) === -1
					|| CSRFP._isValidGetRequest(url)) {
					//cross origin or not to be protected by rules -- ignore
					return;
				}

				if (url.indexOf('?') !== -1) {
					if(url.indexOf(CSRFP.CSRFP_TOKEN) === -1) {
						url += "&" +CSRFP.CSRFP_TOKEN +"=" +CSRFP._getAuthKey();
					} else {
						url = url.replace(new RegExp(CSRFP.CSRFP_TOKEN +"=.*?(&|$)", 'g'),
							CSRFP.CSRFP_TOKEN +"=" +CSRFP._getAuthKey() + "$1");
					}
				} else {
					url += "?" +CSRFP.CSRFP_TOKEN +"=" +CSRFP._getAuthKey();
				}

				event.target.href = url;
				if (typeof hash !== 'undefined') {
					event.target.href += '#' +hash;
				}
			}
		});
	}

}

window.addEventListener("DOMContentLoaded", function() {
	csrfprotector_init();
}, false);
