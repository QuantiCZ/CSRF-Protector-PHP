<?php

if (!defined('__CSRF_PROTECTOR_csrfpAction__')) {
	// to avoid multiple declaration errors
	define('__CSRF_PROTECTOR_csrfpAction__', true);

	/**
	 * Enumerator for actions
	 */
	abstract class csrfpAction
	{
		/**
		 * Action of sending back 403 response code
		 *
		 * @var int
		 */
		const ForbiddenResponseAction = 0;

		/**
		 * Action of clearning all request parameters
		 *
		 * @var int
		 */
		const ClearParametersAction = 1;

		/**
		 * Action of redirecting users to another location
		 *
		 * @var int
		 */
		const RedirectAction = 2;

		/**
		 * Action of sending back a custom message
		 *
		 * @var int
		 */
		const CustomErrorMessageAction = 3;

		/**
		 * Action of sending back 5XX response code
		 *
		 * @var int
		 */
		const InternalServerErrorResponseAction = 4;
	}
}
