<?php

include __DIR__ . "/LoggerInterface.php";

if (!defined('__CSRF_PROTECTOR_csrfpDefaultLogger_')) {
	// to avoid multiple declaration errors
	define('__CSRF_PROTECTOR_csrfpDefaultLogger_', true);

	class logDirectoryNotFoundException extends \exception {}
	class logFileWriteError extends \exception {}

	/**
	 * Default logger class for CSRF Protector
	 */
	class csrfpDefaultLogger implements LoggerInterface
	{
		/**
		 * Directory for file based logging
		 *
		 * @var string
		 */
		private $logDirectory;

		/**
		 * Constructor
		 *
		 * @param string $path - the path for logs to be stored (relative or absolute)
		 * @throws logDirectoryNotFoundException
		 */
		function __construct($path)
		{
			//// Check for relative path
			$this->logDirectory = __DIR__ . "/../" . $path;

			//// If the relative log directory path does not
			//// exist try as an absolute path
			if (!is_dir($this->logDirectory)) {
				$this->logDirectory = $path;
			}

			if (!is_dir($this->logDirectory)) {
				throw new logDirectoryNotFoundException("OWASP CSRFProtector: Log Directory Not Found!");
			}
		}

		/**
		 * Logging method
		 *
		 * @param string $message
		 * @param array $context
		 * @throws logFileWriteError
		 */
		public function log($message, $context = [])
		{
			// Append to the log file, or create it if it does not exist create
			$logFile = fopen($this->logDirectory . "/" . date("m-20y") . ".log", "a+");

			//throw exception if above fopen fails
			if (!$logFile) {
				throw new logFileWriteError("OWASP CSRFProtector: Unable to write to the log file");
			}

			$context['timestamp'] = time();
			$context['message'] = $message;

			//convert log array to JSON format to be logged
			$context = json_encode($context) . PHP_EOL;

			//append log to the file
			fwrite($logFile, $context);

			//close the file handler
			fclose($logFile);
		}
	}
}
