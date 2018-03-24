

export default class Ws {

  
  constructor() {
  	this.token = null;

  	this.post = this.post.bind(this);
  	this.get = this.get.bind(this);
  	this.login = this.login.bind(this);

  }

  get(path) {
  	  return fetch("http://poulailler.olexa.fr/" + path, {
		  method: 'GET',
		  headers: {
		    'X-Thermo-Token': this.token,
		  },
	  })
	  .then((response) => response.json())
      .then((responseJson) => {
      	console.log(responseJson);
        return responseJson.data;
      });
  }

  post(path, postData) {
  	  return fetch("http://poulailler.olexa.fr/" + path, {
		  method: 'POST',
		  body: JSON.stringify(postData),
      headers: {
        'X-Thermo-Token': this.token,
      },
	  }).then((response) => response.json())
      .then((responseJson) => {
        return responseJson.data;
      });
  }

  login() {
  	let self = this;
  	if(this.token) {
	  return new Promise(function(resolve, reject) {
	    resolve(self.token);
	  });
  	}
  	else {
	  return new Promise(function(resolve, reject) {
	    let data = {
	        "name": "myName",
	        "password": "myPasswd"
	    };

	    self.post("login/", data)
	    	.then((response) => {
        	self.token = response.token;
        	resolve(response.token);
	    })
	    .catch((error) => reject(error));        	
	  });  		
  	
  	}
  }

  getInfo() {
  	var self = this;
  	return new Promise(function(resolve, reject) {
  	  self.login().then((token) => {
	    self.get("info/")
	    .then((response) => {
            resolve(response);
	    })
	    .catch((error) => reject(error));
	  });      	
  	});
  }

  getGraph(probe, period, width, height) {
  	var self = this;
  	return new Promise(function(resolve, reject) {
  	  self.login().then((token) => {
	    self.get("graph/" + probe + "/" + period + "/?width=" + width + "&height=" + height)
	    .then((response) => {
            resolve('data:' + response.mediatype + ';base64,' + response.data);
	    });
	  });      	
  	});
  }

  getConfig() {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.login().then((token) => {
      self.get("configuration/")
      .then((response) => {
            resolve(response);
      });
    });       
    });
  }

  configurer(data) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.login().then((token) => {
      self.post("configurer/", data)
      .then((response) => {
            resolve(response);
      });
    });       
    });
  }

  ouvrir(data) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.login().then((token) => {
      self.post("ouvrir/", {})
      .then((response) => {
            resolve(response);
      });
    });       
    });
  }

  fermer(data) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.login().then((token) => {
      self.post("fermer/", {})
      .then((response) => {
            resolve(response);
      });
    });       
    });
  }


}
