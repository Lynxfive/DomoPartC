var requiresLogin = function(req, res, next) {
	
	if(!req.session.account){
		return res.redirect('/');
	}
	next();
};

var requiresLogout = function(req, res, next) {
	
	if(!req.session.account){
		return res.redirect('/maker');
	}
	next();
};

var requiresSecure = function(req, res, next){
	if(req.headers['x-forwarded-proto'] != 'https'){
		return res.redirect('https://' + req.hostname + req.url);
	}
	next();
};

var bypassSecure = function(req, res, next){
	next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if(process.env.port.NODE_ENV === "production"){
	console.log(process.env.port.NODE_ENV)
	module.exports.requiresSecure = requiresSecure;
}
else{
	console.log(process.env.port.NODE_ENV)
	module.exports.requiresSecure = bypassSecure;
}