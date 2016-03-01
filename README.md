Agile CRM Node JS API 
=================

[Agile CRM] (https://www.agilecrm.com/) is a new breed CRM software with sales and marketing automation.

Table of contents
---------------

**[Requirements](#requirements)**

**[API's details](#apis-details)**

**[1 Contact](#1-contact)**
  * [1 To get a contact by email](#11-to-get-a-contact-by-email)
  * [2 To get a contact by contact ID](#12-to-get-a-contact-by-contact-id)
  * [3 To create a contact](#13-to-create-a-contact)
  * [4 To update a contact](#14-to-update-a-contact)
  * [5 To delete a contact](#15-to-delete-a-contact)

**[2. Deal](#2-deal)**
  * [1 To get a deal by deal ID](#21-to-get-a-deal-by-deal-id)
  * [2 To get deals by contact id](#22-to-get-deals-by-contact-id)
  * [3 To create a deal](#23-to-create-a-deal)
  * [4 To update a deal](#24-to-update-a-deal)
  * [5 To delete a deal](#25-to-delete-a-deal)

**[3. Note](#3-note)**
  * [1 Create a note to a contact](#31-create-a-note-to-a-contact)
  * [2 Update a note to a contact](#32-update-a-note-to-a-contact)
  * [3 Get note by contact ID](#33-get-note-by-contact-id)
  * [4 Delete a note by contact ID and note ID](#34-delete-a-note-by-contact-id-and-note-id)

**[4. Task](#4-task)**
  * [1 Create a task to a contact](#41-create-a-task-to-a-contact)
  * [2 Create a task to a contact by email ID](#42-create-a-task-to-a-contact-by-email-id)
  * [3 Update a task to a contact](#43-update-a-task-to-a-contact)
  * [4 Get a task by task ID](#44-get-a-task-by-task-id)
  * [5 Delete a task by task ID](#45-delete-a-task-by-task-id)


Requirements
------------

1. Two files required agilecrm.js and test.js 

2. Setting Domain Name and API Key

![Finding Domain name and API Key] (https://github.com/agilecrm/c-sharp-api/blob/master/Agile_CRM_API_Key_New.jpg)

In the above image, API Key is present at the "API & Analytics" tab at `https://mycompany.agilecrm.com/#analytics-code`.

        Domain Name : mycompany
        API Key     : myagilecrmapikey

So you have to update your

        var AgileCRMManager = require("./agilecrm.js");
        var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
        var success = function (data) {
        console.log(data);
       	console.log("hello");
        };
        var error = function (data) {
        console.log(data);
	      };
	      
API's details
-------------
###1. Contact

#### 1.1 To get a contact by email

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
obj.contactAPI.getContactByEmail('sample@agilecrm.com', success, error);
``` 

#### 1.2 To get a contact by contact ID

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
obj.contactAPI.getContactById('5736096881180672', success, error);
``` 

#### 1.3 To create a contact

#### Acceptable request Representation:

```javascript
{
    "star_value": "4",
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
            "name": "last_name",
            "value": "Bruikheilmer"
        },
        {
            "type": "SYSTEM",
            "name": "company",
            "value": "steady.inc"
        },
        {
            "type": "SYSTEM",
            "name": "title",
            "value": "VP Sales"
        },
        {
            "type": "SYSTEM",
            "name": "email",
            "subtype": "work",
            "value": "clinton@walt.ltd  "
        },
        {
            "type": "SYSTEM",
            "name": "address",
            "value": "{\"address\":\"225 George Street\",\"city\":\"NSW\",\"state\":\"Sydney\",\"zip\":\"2000\",\"country\":\"Australia\"}"
        },
        {
            "type": "CUSTOM",
            "name": "My Custom Field",
            "value": "Custom value"
        }
    ]
}
```


```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
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

obj.contactAPI.add(contact, success, error);
``` 

#### 1.4 To update a contact

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
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
obj.contactAPI.update(update_contact, success, error);
``` 

#### 1.5 To delete a contact

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
  obj.contactAPI.deleteContact('5633009881448448', success, error);
``` 

###2. Deal

#### 2.1 To get a deal by deal ID

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
obj.contactAPI.getDealById('5650703586426880', success, error);
``` 

#### 2.2 To get deals by contact id

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
obj.contactAPI.getDealByContactId("5675392618725376", success, error);
``` 

#### 2.3 To create a deal

#### Acceptable request Representation:

```javascript
{
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
}
```


```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
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

obj.contactAPI.createDeal(deal, success, error);
``` 

#### 2.4 To update a deal

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
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


obj.contactAPI.updateDeal(update_deal, success, error);
``` 

#### 2.5 To delete a deal

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
  obj.contactAPI.deleteDealById('5650703586426880', success, error);
```

###3. Note

#### 3.1 Create a note to a contact

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
  var note = {
    "subject": " Note subject",
    "description": "Note description",
    "contact_ids": [
        "5688267051630592",
        "5721389839417344"
    ]
  };

  obj.contactAPI.createNote(note, success, error);
```

#### 3.2 Update a note to a contact

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
  var update_note = {
    "id": "5754615706419200",
    "subject": "Test",
    "description": "Sample test updated1",
    "contact_ids": [
        "5630286201094144"
    ]
  };

  obj.contactAPI.updateNote(update_note, success, error);
```

#### 3.3 Get note by contact ID

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
  obj.contactAPI.getNoteByContactId("5630286201094144", success, error);
```

#### 3.4 Delete a note by contact ID and note ID

- Delete a note from a contact 
- first parameter ID is contact and second one is note ID

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
  obj.contactAPI.deleteNoteById("5630286201094144","5754615706419200", success, error);
```

###4. Task

#### 4.1 Create a task to a contact

- Task type accepeted value : CALL, EMAIL, FOLLOW_UP, MEETING, MILESTONE, SEND, TWEET, OTHER
- Task priority_type accepeted value : HIGH, NORMAL, LOW
- Task due accepeted value : epoch time in miliseconds

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
  var error = function (data) {
    console.log(data);
	};
	
  var task = {
    "subject": "test",
    "contacts": [
        "5630286201094144"
    ],
    "type": "EMAIL",
    "priority_type": "HIGH",
    "due": 11545245654
  };


  obj.contactAPI.createTask(task, success, error);
```

#### 4.2 Create a task to a contact by email ID

- Task type accepeted value : CALL, EMAIL, FOLLOW_UP, MEETING, MILESTONE, SEND, TWEET, OTHER
- Task priority_type accepeted value : HIGH, NORMAL, LOW
- Task due accepeted value : epoch time in miliseconds

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
	
  var error = function (data) {
    console.log(data);
	};
	
  var task_email = {
    "subject": "test email task",
    "type": "EMAIL",
    "priority_type": "HIGH",
    "due": 11545245654
  };


  obj.contactAPI.createTaskByEmail("care@spicejet.com",task_email, success, error);
```

#### 4.3 Update a task to a contact

- Task type accepeted value : CALL, EMAIL, FOLLOW_UP, MEETING, MILESTONE, SEND, TWEET, OTHER
- Task priority_type accepeted value : HIGH, NORMAL, LOW
- Task due accepeted value : epoch time in miliseconds

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
	
  var error = function (data) {
    console.log(data);
	};
	
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


  obj.contactAPI.updateTask(update_task, success, error);
```

#### 4.4 Get a task by task ID

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
	
  var error = function (data) {
    console.log(data);
	};
	
  obj.contactAPI.getTaskById('5766696644116480', success, error);
```

#### 4.5 Delete a task by task ID

```javascript
  var AgileCRMManager = require("./agilecrm.js");
  var obj = new AgileCRMManager("DOMAIN", "KEY", "EMAIL");
  var success = function (data) {
    console.log(data);
	};
	
  var error = function (data) {
    console.log(data);
	};
	
  obj.contactAPI.deleteTaskById('5766696644116480', success, error);
```
