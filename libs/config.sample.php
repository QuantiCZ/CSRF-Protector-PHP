<?php

return array(
	"CSRFP_TOKEN" => "csrfToken",
	"logDirectory" => __DIR__ . "/../log",
	"failedAuthAction" => array(
		"GET" => 0,
		"POST" => 0
	),
	"errorRedirectionPage" => "",
	"customErrorMessage" => "",
	"jsUrl" => "/csrf/csrfprotector.js",
	"tokenLength" => 30,
	"cookieConfig" => array(
		"path" => '',
		"domain" => '',
		"secure" => false,
		"expire" => 90*60,
	),
	"disabledJavascriptMessage" => "This site attempts to protect users against Cross-Site Request Forgeries attacks.",
	"verifyGetForPost" => array(),
	"verifyGetFor" => array(),
	"referers" => array(),
	"agentURIs" => array(),
	"redis" => array(
		"allow" => false,
		"host" => "localhost",
		"port" => 6379,
		"expire" => 90*60,
	),
);
