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
 //obj.contactAPI.getContactByEmail('support+id18200@agilecrm.zendesk.com', success, error);

//obj.contactAPI.getContactById('5736096881180672', success, error);

var contact = {
    "lead_score": "92",
    "tags": [
        "Lead",
        "Likely Buyer"
    ],
    "properties": [
        {
            "type": "SYSTEM",
            "name": "first_name",
            "value": "Los "
        },
        {
            "type": "SYSTEM",
            "name": "email",
            "subtype": "work",
            "value": "sila@tester.com"
        },
        {
            "type": "SYSTEM",
            "name": "address",
            "value": "{\"address\":\"225 George Street\",\"city\":\"NSW\",\"state\":\"Sydney\",\"zip\":\"2000\",\"country\":\"Australia\"}"
        }
    ]
};

//obj.contactAPI.add(contact, success, error);

var update_contact = {
    "id": "5698936018829312",
    "properties": [
        {
            "type": "SYSTEM",
            "name": "first_name",
            "value": "Losalitest"
        },
        {
            "type": "SYSTEM",
            "name": "last_name",
            "value": "Lee"
        }
    ]
};

//obj.contactAPI.update(update_contact, success, error);

//obj.contactAPI.deleteContact('5633009881448448', success, error);
