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
					console.log("Status Code = " + resp.statusCode);
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
						console.log("Status Code = " + resp.statusCode);
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
					console.log("Status Code = " + resp.statusCode);
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
					console.log("Status Code = " + resp.statusCode);
                    var statusCode = resp.statusCode;
                    if (statusCode != 200){
                        console.log("Error message = " + body);
                    }
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
					console.log("Status Code = " + resp.statusCode);
                    var statusCode = resp.statusCode;
                    if (statusCode != 200){
                        console.log("Error message = " + body);
                    }
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
					console.log("Status Code = " + resp.statusCode);
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

ContactAPI.prototype.updateTagsById = function update(contact, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts/edit/tags';
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
					console.log("Status Code = " + resp.statusCode);
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

ContactAPI.prototype.deleteTagsById = function update(contact, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts/delete/tags';
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
					console.log("Status Code = " + resp.statusCode);
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
					console.log("Status Code = " + resp.statusCode);
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
					console.log("Status Code = " + resp.statusCode);
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
						console.log("Status Code = " + resp.statusCode);
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
						console.log("Status Code = " + resp.statusCode);
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
                    console.log("Status Code = " + resp.statusCode);
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

ContactAPI.prototype.createNote = function createNote(note, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/notes';
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
					console.log("Status Code = " + resp.statusCode);
                    var note = JSON.parse(body);
                    success(note);
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
        var data = JSON.stringify(note);
        post.write(data);
        post.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.updateNote = function updateNote(note, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/notes';
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
					console.log("Status Code = " + resp.statusCode);
                    var note = JSON.parse(body);
                    success(note);
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
        var data = JSON.stringify(note);
        put.write(data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};


ContactAPI.prototype.getNoteByContactId = function getNoteByContactId(contactId, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts/' + contactId + '/notes';

    https.get(options, function (resp) {
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                if (body) {
                    try {
                        
                        success(body);
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

ContactAPI.prototype.deleteNoteById = function deleteNoteById(contactId,noteId, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/contacts/' + contactId + '/notes/'+noteId;
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

ContactAPI.prototype.createTask = function createTask(task, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/tasks';
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
					console.log("Status Code = " + resp.statusCode);
                    var task = JSON.parse(body);
                    success(task);
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
        var data = JSON.stringify(task);
        post.write(data);
        post.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.createTaskByEmail = function createTaskByEmail(email,task, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/tasks/email/'+email;
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
                    var task = JSON.parse(body);
                    success(task);
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
        var data = JSON.stringify(task);
        post.write(data);
        post.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.updateTask = function updateTask(task, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/tasks/partial-update';
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
                    var task = JSON.parse(body);
                    success(task);
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
        var data = JSON.stringify(task);
        put.write(data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.getTaskById = function getTaskById(taskId, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/tasks/' + taskId;

    https.get(options, function (resp) {
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                if (body) {
                    try {
                        var task = JSON.parse(body);
                        success(task);
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

ContactAPI.prototype.deleteTaskById = function deleteTaskById(taskId, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/tasks/' + taskId;
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


// Change contact owner by contact ID and Owner ID

ContactAPI.prototype.changeContactOwner = function update(email, contactId, success, failure) {

	var qs = require("querystring");
	// Build the post string from an object
	  var post_data = qs.stringify({
		  'owner_email' : email,
		  'contact_id': contactId
	  });
 
    var options = this.getOptions();
    options.path = '/dev/api/contacts/change-owner';

    options.method = 'POST';
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	options.headers['Content-Length'] = Buffer.byteLength(post_data);

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
        put.write(post_data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

// Get Deal Source IDs

ContactAPI.prototype.getDealSource = function getDealSource(success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/categories?entity_type=DEAL_SOURCE';

    https.get(options, function (resp) {
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    var dealSource = JSON.parse(body);
                    success(dealSource);
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


ContactAPI.prototype.getContactsByPropertyFilter = function getContactsByPropertyFilter(property,value,success, failure) {

	var qs = require("querystring");
	// Build the post string from an object
	  var post_data = qs.stringify({
		  'page_size' : 25,
		  'global_sort_key': '-created_time',
		  'filterJson': '{"rules":[{"LHS":"'+property+'","CONDITION":"EQUALS","RHS":"'+value+'"}],"contact_type":"PERSON"}'
	  });
 
    var options = this.getOptions();
    options.path = '/dev/api/filters/filter/dynamic-filter';

    options.method = 'POST';
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	options.headers['Content-Length'] = Buffer.byteLength(post_data);

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
        put.write(post_data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.getContactsByTagFilter = function getContactsByTagFilter(value,success, failure) {

	var qs = require("querystring");
	// Build the post string from an object
	  var post_data = qs.stringify({
		  'page_size' : 25,
		  'global_sort_key': '-created_time',
		  'filterJson': '{"rules":[{"LHS":"tags","CONDITION":"EQUALS","RHS":"'+value+'"}],"contact_type":"PERSON"}'
	  });
 
    var options = this.getOptions();
    options.path = '/dev/api/filters/filter/dynamic-filter';

    options.method = 'POST';
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	options.headers['Content-Length'] = Buffer.byteLength(post_data);

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
        put.write(post_data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.getContactCustomField = function getContactCustomField(success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/custom-fields/scope/position?scope=CONTACT';

    https.get(options, function (resp) {
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    console.log("Status Code = " + resp.statusCode);
                    var customDatas = JSON.parse(body);
                    success(customDatas);
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


ContactAPI.prototype.createCustomField = function createCustomField(customJson, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/custom-fields';
    options.method = 'POST';
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
                    console.log("Status Code = " + resp.statusCode);
                    var statusCode = resp.statusCode;
                    if (statusCode != 200){
                        console.log("Error message = " + body);
                    }
                    var customJson = JSON.parse(body);
                    success(customJson);
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
        var data = JSON.stringify(customJson);
        put.write(data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.updateCustomField = function updateCustomField(customJson, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/custom-fields';
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
                    console.log("Status Code = " + resp.statusCode);
                    var statusCode = resp.statusCode;
                    if (statusCode != 200){
                        console.log("Error message = " + body);
                    }
                    var customJson = JSON.parse(body);
                    success(customJson);
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
        var data = JSON.stringify(customJson);
        put.write(data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.createEvent = function createEvent(customJson, success, failure) {
    var options = this.getOptions();
    options.path = '/dev/api/events';
    options.method = 'POST';
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
                    console.log(resp.statusCode);
                    var statusCode = resp.statusCode;
                    if (statusCode != 200){
                        console.log(body)
                    }
                    var customJson = JSON.parse(body);
                    success(customJson);
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
        var data = JSON.stringify(customJson);
        put.write(data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.addTagstoContacts = function addTagstoContacts(tags,contactIds,success, failure) {
	var qs = require("querystring");
	// Build the post string from an object
	  var post_data = qs.stringify({
		  'data' : JSON.stringify(tags),
		  'contact_ids': JSON.stringify(contactIds)
	  });
    var options = this.getOptions();
    options.path = '/dev/api/bulk/update?action_type=ADD_TAG';

    options.method = 'POST';
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	options.headers['Accept'] = '*/*';
	options.headers['Content-Length'] = Buffer.byteLength(post_data);
    var put = https.request(options, function(resp) {
        resp.setEncoding('utf8');
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    console.log("Status Code = " + resp.statusCode);
                    var statusCode = resp.statusCode;
                    if (statusCode != 204){
                        console.log("Error message = " + body);
                    }
                    success("Tags updated");
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
        put.write(post_data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

ContactAPI.prototype.deleteTagstoContacts = function deleteTagstoContacts(tags,contactIds,success, failure) {
	var qs = require("querystring");
	// Build the post string from an object
	  var post_data = qs.stringify({
		  'data' : JSON.stringify(tags),
		  'contact_ids': JSON.stringify(contactIds)
	  });
    var options = this.getOptions();
    options.path = '/dev/api/bulk/update?action_type=REMOVE_TAG';

    options.method = 'POST';
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	options.headers['Accept'] = '*/*';
	options.headers['Content-Length'] = Buffer.byteLength(post_data);
    var put = https.request(options, function(resp) {
        resp.setEncoding('utf8');
        var body = "";
        resp.on('data', function(data) {
            body += data;
        });
        resp.on('end', function() {
            if (success) {
                try {
                    console.log("Status Code = " + resp.statusCode);
                    var statusCode = resp.statusCode;
                    if (statusCode != 204){
                        console.log("Error message = " + body);
                    }
                    success("Tags deleted");
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
        put.write(post_data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

// Get Companies by custom field.

ContactAPI.prototype.getCompaniesByPropertyFilter = function getCompaniesByPropertyFilter(property,value,success, failure) {

	var qs = require("querystring");
	// Build the post string from an object
	  var post_data = qs.stringify({
		  'page_size' : 25,
		  'global_sort_key': '-created_time',
		  'filterJson': '{"rules":[{"LHS":"'+property+'","CONDITION":"EQUALS","RHS":"'+value+'"}],"contact_type":"COMPANY"}'
	  });
 
    var options = this.getOptions();
    options.path = '/dev/api/filters/filter/dynamic-filter';

    options.method = 'POST';
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	options.headers['Content-Length'] = Buffer.byteLength(post_data);

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
        put.write(post_data);
        put.end();
    } catch (ex) {
        failure(ex);
    }
};

module.exports = AgileCRMManager;
