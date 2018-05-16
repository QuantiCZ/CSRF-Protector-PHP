CSRF Protector
==============================
<br>CSRF protector php, a standalone php library for csrf mitigation in web applications. Easy to integrate in any php web app. 

Add to your project using packagist
==============================
 Add a `composer.json` file to your project directory
 ```json
 {
    "require": {
        "owasp/csrf-protector-php": "dev-master"
    }
}
```

Configuration
==============================
For composer installations: Copy the config.sample.php file into your root folder at config/csrf_config.php
For non-composer installations: Copy the libs/csrf/config.sample.php file into libs/csrc/config.php
Edit config accordingly. See Detailed Information link below.

How to use
==============================
```php
<?php
include_once __DIR__ .'/vendor/owasp/csrf-protector-php/libs/csrf/csrfprotector.php';

//Initialise CSRFGuard library
csrfProtector::init();
```

```html
<script type="text/javascript" src="path-to-jquery"></script>
<script type="text/javascript" src="path-to-js-from-this-repo/csrfprotector.js"></script>
```

simply include the library and call the `init()` function at `index.php` on your app!


Configuration
==============================

 - `CSRFP_TOKEN`: name of the csrf nonce, used for cookie or posting as argument. default: `csrfp_token` (if left blank)
 - `logDirectory`: location of the directory at which log files will be saved, either **relative** to the default `config.php` file location or an **absolute** path. This is required for file based logging (default), Not needed, in case you override logging function to implement your logging logic. (View [Overriding logging function](https://github.com/mebjas/CSRF-Protector-PHP/wiki/Overriding-logging-function))
 <br>**Default value:** `../log/`
 - `failedAuthAction`: Action code (integer) for action to be taken in case of failed validation. Has two different values for bot `GET` and `POST`. Different action codes are specified as follows, (<br>**Default:** `0` for both `GET` & `POST`):
    *  `0` Send **403, Forbidden** Header
    *  `1` **Strip the POST/GET query** and forward the request! unset($_POST)
    *  `2` **Redirect to custom error page** mentioned in `errorRedirectionPage`
    *  `3` **Show custom error message** to user, mentioned in `customErrorMessage`
    *  `4` Send **500, Internal Server Error** header

 - `errorRedirectionPage`: **Absolute url** of the file to which user should be redirected. <br>**Default: null**
 - `customErrorMessage`: **Error Message** to be shown to user. Only this text will be shown!<br>**Default: null**
 - `jsUrl`: **Absolute url** of the js file or `FALSE` if the js file will be added to the page manually. (See [Setting up](https://github.com/mebjas/CSRF-Protector-PHP/wiki/Setting-up-CSRF-Protector-PHP-in-your-web-application) for more information)
 - `tokenLength`: length of csrfp token, Default `10`
 - `cookieConfig`: Array of parameter values for set cookie method.  supports three properties: `path`, `domain`, `secure` and `expire`. They have same meaning as respective parameters of `setcookie` method: [learn more - php.net]
 - `disabledJavascriptMessage`: messaged to be shown if js is disabled (string)
 - `verifyGetForPost`: regex rules for those urls for which csrfp validation should be enabled for `POST` requests also.
 - `verifyGetFor`: regex rules for those urls for which csrfp validation should be enabled for `GET` requests also.
 - `referers`: Array of referes which csrf validation is disabled
 - `agentURIs`: Array of pair `agent => requestURI` which csrf validation is disabled



Compatiblity with different browsers
==============================
**OS: `windows`**<br>


 Cases               | IE (Win)   | Opera | Chrome | Mozilla | Safari
 ------------------  | ------- | ----- | ------ | ------- | ------
 XHR wrapping        | ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)     | ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)      |     ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)   |    ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)     | ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)
 HTML dom-0 wrapping |   ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)   |    ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)   |    ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)    |     ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)    | ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)
 HTML dom-2 wrapping |   ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)    |    ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)   |   ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)     |      ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)   | ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)
 URL rewriting       |   ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)   |   ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)    |     ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)   |    ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)     |![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)

**OS: `macos`**<br>


 Cases               | Chrome |
 ------------------  | ------- |
 XHR wrapping        | ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)     |
 HTML dom-0 wrapping |   ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)   |
 HTML dom-2 wrapping |   ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)    |
 URL rewriting       |   ![yes](https://cdn3.iconfinder.com/data/icons/fatcow/32/accept.png)   |

<pre>Note: Missing tick means, this has not yet been implemented or tested</pre>
