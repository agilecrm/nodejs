var https = require('https');

function AgileCRMManager(domain, key, email) {
    this.domain = domain + ".agilecrm.com";
    this.key = key;
    this.email = email;

    var authStr = email + ":" + key;

    this.contactAPI = new ContactAPI(this.domain, this.key, this.email);
}

AgileCRMManager.prototype.domain = null;

AgileCRMManager.prototype.key = null;

AgileCRMManager.prototype.email = null;

AgileCRMManager.prototype.contactAPI = null;

function ContactAPI(domain, key, email) {
    this.domain = domain;
    this.key = key;
    this.email = email;
}

ContactAPI.prototype.domain = null;

ContactAPI.prototype.key = null;

ContactAPI.prototype.email = null;

ContactAPI.prototype._options = null;

ContactAPI.prototype.getOptions = function getOptions() {
    this._options = {
        host: this.domain,
        headers: {
            'Authorization': 'Basic ' + new Buffer(this.email + ':' + this.key).toString('base64'),
            'Accept': 'application/json'
        }
    };

    return this._options;
};

ContactAPI.prototype.getListContacts = function getListContacts(success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts?page_size=20';

    https.get(options, function (resp) {
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    var contacts = JSON.parse(body);
                    success(contacts);
                } catch (ex) {
                    failure(ex);
                }
            }
        })
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    }).on("error", function(e){
        if (failure) {
            failure(e);
        }
    });
};

ContactAPI.prototype.getContactById = function getContactById(contactId, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts/' + contactId;

    https.get(options, function (resp) {
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                if (body) {
                    try {
                        var contacts = JSON.parse(body);
                        success(contacts);
                    } catch (ex) {
                        failure(ex);
                    }
                }
            } else {
                success({});
            }
        })
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    }).on("error", function(e){
        if (failure) {
            failure(e);
        }
    });
};

ContactAPI.prototype.getContactByEmail = function getContactByEmail(email, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts/search/email/' + email;

    https.get(options, function (resp) {
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    var contacts = JSON.parse(body);
                    success(contacts);
                } catch (ex) {
                    failure(ex);
                }
            }
        });
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    }).on("error", function(e) {
        if (failure) {
            failure(e);
        }
    });
};

ContactAPI.prototype.add = function add(contact, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts';
    options.method = 'POST';
    options.headers['Content-Type'] = 'application/json';

    var post = https.request(options, function(resp) {
        resp.setEncoding('utf8');
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    var contacts = JSON.parse(body);
                    success(contacts);
                } catch (ex) {
                    failure(ex);
                }
            }
        });
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    });

    try {
        var data = JSON.stringify(contact);
        post.write(data);
        post.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.update = function update(contact, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts/edit-properties';
    options.method = 'PUT';
    options.headers['Content-Type'] = 'application/json';

    var put = https.request(options, function(resp) {
        resp.setEncoding('utf8');
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    var contacts = JSON.parse(body);
                    success(contacts);
                } catch (ex) {
                    failure(ex);
                }
            }
        });
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    });

    try {
        var data = JSON.stringify(contact);
        put.write(data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.deleteContact = function deleteContact(contactId, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts/' + contactId;
    options.method = 'DELETE';
	options.headers['Content-Type'] = 'application/json';

    var del = https.request(options, function(resp) {
        resp.setEncoding('utf8');
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    var contacts = JSON.parse(body);
                    success(contacts);
                } catch (ex) {
                    failure(ex);
                }
            }
        });
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    });

    try {
        del.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.createDeal = function createDeal(opportunity, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/opportunity';
    options.method = 'POST';
    options.headers['Content-Type'] = 'application/json';

    var post = https.request(options, function(resp) {
        resp.setEncoding('utf8');
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    var opportunity = JSON.parse(body);
                    success(opportunity);
                } catch (ex) {
                    failure(ex);
                }
            }
        });
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    });

    try {
        var data = JSON.stringify(opportunity);
        post.write(data);
        post.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.updateDeal = function updateDeal(opportunity, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/opportunity/partial-update';
    options.method = 'PUT';
    options.headers['Content-Type'] = 'application/json';

    var put = https.request(options, function(resp) {
        resp.setEncoding('utf8');
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    var opportunity = JSON.parse(body);
                    success(opportunity);
                } catch (ex) {
                    failure(ex);
                }
            }
        });
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    });

    try {
        var data = JSON.stringify(opportunity);
        put.write(data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.getDealById = function getDealById(dealId, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/opportunity/' + dealId;

    https.get(options, function (resp) {
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                if (body) {
                    try {
                        var opportunity = JSON.parse(body);
                        success(opportunity);
                    } catch (ex) {
                        failure(ex);
                    }
                }
            } else {
                success({});
            }
        })
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    }).on("error", function(e){
        if (failure) {
            failure(e);
        }
    });
};

ContactAPI.prototype.getDealByContactId = function getDealByContactId(contactId, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts/' + contactId + 'deals';

    https.get(options, function (resp) {
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                if (body) {
                    try {
                        var opportunity = JSON.parse(body);
                        success(opportunity);
                    } catch (ex) {
                        failure(ex);
                    }
                }
            } else {
                success({});
            }
        })
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    }).on("error", function(e){
        if (failure) {
            failure(e);
        }
    });
};


ContactAPI.prototype.deleteDealById = function deleteDealById(dealId, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/opportunity/' + dealId;
    options.method = 'DELETE';
	options.headers['Content-Type'] = 'application/json';

    var del = https.request(options, function(resp) {
        resp.setEncoding('utf8');
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    
                    success(body);
                } catch (ex) {
                    failure(ex);
                }
            }
        });
        resp.on('error', function(e) {
            if (failure) {
                failure(e);
            }
        });
    });

    try {
        del.end();
    } catch (ex) {
        failure(ex);
    }
};

module.exports = AgileCRMManager;
