(function (root, extend) {
    if (typeof define === "function" && define.amd) {
		// XXX figure out how to do it
    } else if (typeof exports === "object") {
		extend(require("asteroid"));
    } else {
        extend(root.Asteroid);
    }
}(this, function (Asteroid) {

	"use strict";

	var getGithubOauthOptions = function (scope) {
		var credentialToken = Asteroid.utils.guid();
		var query = {
			client_id:		this._getOauthClientId("github"),
			redirect_uri:	this._host + "/_oauth/github?close",
			state:			credentialToken,
			scope:			scope || "email"
		};
		var loginUrl = "https://github.com/login/oauth/authorize?" + Asteroid.utils.formQs(query);
		return this._initOauthLogin("github", credentialToken, loginUrl);
	};

	Asteroid.prototype.loginWithGithub = function (scope) {
		var options = getGithubOauthOptions.call(this, scope);
		return this._openOauthPopup(
			"twitter",
			options.credentialToken,
			options.loginUrl,
			this._loginAfterCredentialSecretReceived
		);
	};

	Asteroid.prototype.connectWithGithub = function (scope) {
		var options = getGithubOauthOptions.call(this, scope);
		return this._openOauthPopup(
			"twitter",
			options.credentialToken,
			options.loginUrl,
			this._connectAfterCredentialSecretReceived
		);
	};

}));
