/**
 * Created by phelipemaia on 2/7/16.
 */
var AgileCRMManager = require("./agilecrm.js");
var obj = new AgileCRMManager("ghanshyam", "123456", "ghanshyam.raut@agilecrm.com");
var success = function (data) {
    console.log(data);
	console.log("hello");
};
var error = function (data) {
    console.log(data);
	console.log("Hii");
};
 //obj.contactAPI.getListContacts(success, error);

//obj.contactAPI.getContactByEmail('support+id18200@agilecrm.zendesk.com', success, error);

//obj.contactAPI.getContactById('5736096881180672', success, error);

var contact = {
	"id": "5764169861169152",
    'tags': ['tag1', 'tag3'],
    'lead_score': 20,
    'star_value': 40,
    'properties': [{
        'name': 'first_name',
        'value': 'Test',
        'type': 'SYSTEM'
    }]
};

//obj.contactAPI.add(contact, success, error);
var systemField = [{
    'name': 'first_name',
    'value': 'ttt'
}];

var customField = [{
    'name': 'test',
    'value': 'ABC'
}];

//obj.contactAPI.update(contact, success, error);

obj.contactAPI.deleteContact('5633009881448448', success, error);