var db = {
    username : "iet",
    password : "ietnitk2018",
	uri : "mongodb://iet:ietnitk2018@ds227185.mlab.com:27185/photoshop2020"  
	//"mongodb://iet:ietnitk2018@ds119445.mlab.com:19445/photoshop"
}

var email = {
    username : "dev.ietnitk@gmail.com",
    password : "ietnitk2018"
}

var logs = {
    dbsuccess : "SUCCESSFULLY CONNECTED TO DATABASE",
    dberr : "ERROR IN CONNECTING TO DATABASE",
}

module.exports = {
    db,
    email,
    logs
}