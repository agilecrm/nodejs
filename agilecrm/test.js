/**
 * Created by ghanshyam on 2/7/16.
 */
var AgileCRMManager = require("./agilecrm.js");
var obj = new AgileCRMManager("your_domain", "rest_api_key", "your_email_id");
var success = function (data) {
    console.log(data);
	console.log("success");
};
var error = function (data) {
    console.log(data);
	console.log("failure");
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

//obj.contactAPI.getDealById('5650703586426880', success, error);

// Delete deal by id

//obj.contactAPI.deleteDealById('5650703586426880', success, error);

// Create Deal

var deal = {
    "name": "Deal-Tomato",
    "expected_value": "500",
    "probability": "75",
    "close_date": 1455042600,
    "milestone": "Proposal",
    "contact_ids": [
        "5758948741218304"
    ],
    "custom_data": [
        {
            "name": "Group Size",
            "value": "10"
        }
    ]
};


//obj.contactAPI.createDeal(deal, success, error);

var update_deal = {
    "id": "5122047336251392",
    "expected_value": "1000",
    "contact_ids": [
        "5675392618725376",
        "5744178885558278"
    ],
    "custom_data": [
        {
            "name": "dealTester",
            "value": "hello hello2"
        }
    ]
};


//obj.contactAPI.updateDeal(update_deal, success, error);

//obj.contactAPI.getDealByContactId("5675392618725376", success, error);

// ==================To create a note of contact========================

var note = {
    "subject": " Note subject",
    "description": "Note description",
    "contact_ids": [
        "5688267051630592",
        "5721389839417344"
    ]
};


//obj.contactAPI.createNote(note, success, error);

// ==================To update a note of contact========================

var update_note = {
    "id": "5754615706419200",
    "subject": "Test",
    "description": "Sample test updated1",
    "contact_ids": [
        "5630286201094144"
    ]
};


//obj.contactAPI.updateNote(update_note, success, error);

// ==================To get notes of a contact by contact id========================

//obj.contactAPI.getNoteByContactId("5630286201094144", success, error);

// ==================To delete a note of a contact========================
// first parameter is contact id and second one is note id

//obj.contactAPI.deleteNoteById("5630286201094144","5754615706419200", success, error);

// ==================Create task to a contact========================

var task = {
    "subject": "test",
    "contacts": [
        "5630286201094144"
    ],
    "type": "EMAIL",
    "priority_type": "HIGH",
    "due": 11545245654
};


//obj.contactAPI.createTask(task, success, error);

// ==================Create task to a contact by email========================

var task_email = {
    "subject": "test email task",
    "type": "EMAIL",
    "priority_type": "HIGH",
    "due": 11545245654
};


//obj.contactAPI.createTaskByEmail("care@spicejet.com",task_email, success, error);

// ==================Update task to a contact========================

var update_task = {
	"id": "5637588316585984",
    "subject": "test updated",
    "contacts": [
        "5630286201094144"
    ],
    "type": "EMAIL",
    "priority_type": "HIGH",
    "due": 11545245654
};


//obj.contactAPI.updateTask(update_task, success, error);

// ==================Get task by ID========================

//obj.contactAPI.getTaskById('5766696644116480', success, error);

// ==================Delete task by ID========================

//obj.contactAPI.deleteTaskById('5766696644116480', success, error);


var update_tags = {
    "id": "5671839405703168",
    "tags": [
        "test1",
        "test2"
    ]
};


//obj.contactAPI.updateTagsById(update_tags, success, error);

var delete_tags = {
    "id": "5671839405703168",
    "tags": [
        "test1"
    ]
};


//obj.contactAPI.deleteTagsById(delete_tags, success, error);

// ================== Get Deal Source ========================

//obj.contactAPI.getDealSource(success, error);


// ================== Get Contacts/ Companies by Property Filter ========================

//obj.contactAPI.getContactsByPropertyFilter('Country','United State',success, error);

// ================== Get Contacts/ Companies by Tag Filter ========================

//obj.contactAPI.getContactsByTagFilter('tester tag',success, error);

// Add or edit many tags to many contact.
var tags =  ['kabali','happy'];
var contactIds =  ['5760581046894592','5706412919357440'];
console.log(tags);
//obj.contactAPI.addTagstoContacts(tags,contactIds, success, error);
//obj.contactAPI.deleteTagstoContacts(tags,contactIds, success, error);
