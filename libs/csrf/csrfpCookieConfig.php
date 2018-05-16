<?php

if (!defined('__CSRF_PROTECTOR_csrfpCookieConfig__')) {
	// to avoid multiple declaration errors
	define('__CSRF_PROTECTOR_csrfpCookieConfig__', true);

	/**
	 * Cookie config class
	 */
	class csrfpCookieConfig
	{
		/**
		 * Path parameter for setcookie method
		 *
		 * @var string
		 */
		public $path = '';

		/**
		 * Domain parameter for setcookie method
		 *
		 * @var string
		 */
		public $domain = '';

		/**
		 * Secure parameter for setcookie method
		 *
		 * @var bool
		 */
		public $secure = false;

		/**
		 * Expiry parameter in seconds from now for setcookie method, default is 30 minutes
		 *
		 * @var int
		 */
		public $expire = 1800;

		/**
		 * Function: constructor
		 *
		 * @param array $cfg
		 */
		function __construct($cfg)
		{
			if ($cfg !== null) {
				if (isset($cfg['path'])) {
					$this->path = $cfg['path'];
				}
				if (isset($cfg['domain'])) {
					$this->domain = $cfg['domain'];
				}
				if (isset($cfg['secure'])) {
					$this->secure = (bool) $cfg['secure'];
				}
				if (isset($cfg['expire']) && $cfg['expire']) {
					$this->expire = (int) $cfg['expire'];
				}
			}
		}
	}
}
