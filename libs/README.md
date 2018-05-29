CSRFProtector configuration
==========================================

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
 - `verifyGetFor`: regex rules for those urls for which csrfp validation should be enabled for `GET` requests also. (View [verifyGetFor rules](https://github.com/mebjas/CSRF-Protector-PHP/wiki/verifyGetFor-rules) for more information)


List of connection parameters for Redis
-------------------------------------

  * __scheme__ [string - default: `tcp`]

      Specifies the protocol used to communicate with an instance of Redis. Internally the client uses the
      connection class associated to the specified connection scheme. By default Predis supports `tcp`
      (TCP/IP), `unix` (UNIX domain sockets) or `http` (HTTP protocol through Webdis).

  * __host__ [string - default: `127.0.0.1`]

      IP or hostname of the target server. This is ignored when connecting to Redis using UNIX domain
      sockets.

  * __port__ [integer - default: `6379`]

      TCP/IP port of the target server. This is ignored when connecting to Redis using UNIX domain sockets.

  * __path__ [string - default: not set]

      Path of the UNIX domain socket file used when connecting to Redis using UNIX domain sockets.

  * __database__ [integer - default: not set]

      Accepts a numeric value that is used by Predis to automatically select a logical database with the
      [`SELECT`](http://redis.io/commands/select) command.

  * __password__ [string - default: not set]

      Accepts a value used to authenticate with a Redis server protected by password with the
      [`AUTH`](http://redis.io/commands/auth) command.

  * __async__ [boolean - default: `false`]

      Specifies if connections to the server is estabilished in a non-blocking way (that is, the client is
      not blocked while the underlying resource performs the actual connection).

  * __persistent__ [boolean - default: `false`]

      Specifies if the underlying connection resource should be left open when a script ends its lifecycle.

  * __timeout__ [float - default: `5.0`]

      Timeout (expressed in seconds) used to connect to a Redis server after which an exception is thrown.

  * __read_write_timeout__ [float - default: not set]

      Timeout (expressed in seconds) used when performing read or write operations on the underlying network
      resource after which an exception is thrown. The default value actually depends on the underlying platform
      but usually it is 60 seconds.

  * __alias__ [string - default: not set]

      Identifies a connection by providing a mnemonic alias. This is mostly useful with aggregated connections
      such as client-side sharding (cluster) or master/slave replication.

  * __weight__ [integer - default: not set]

      Specifies a weight used to balance the distribution of keys asymmetrically across multiple servers when using
      client-side sharding (cluster).

  * __iterable_multibulk__ [boolean - default: `false`]

      When set to `true` Predis returns multibulk from Redis as iterator instances instead of plain simple
      PHP arrays.

  * __throw_errors__ [boolean - default: `true`]

      When set to `true` server errors generated by Redis are translated to PHP exceptions, otherwise they are returned as normal PHP objects.
