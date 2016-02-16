Agile CRM Node.js API
=====================

Agile CRM is a new breed CRM. You can sign up @ [AgileCRM.com](https://www.agilecrm.com).  

Requirements
------------

1. Two files required agilecrm.js and test.js 

2. Setting Domain Name and Api Key

![Finding Domain name and api key] (https://github.com/agilecrm/c-sharp-api/blob/master/Agile_CRM_API_Key_New.jpg)

In the above image, api key is present at the "Api & Analytics" tab at `https://mycompany.agilecrm.com/#analytics-code`.

        Domain Name : mycompany
        Api Key     : myagilecrmapikey

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
	      
API's Details
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

#### 1.2 To get a contact by contact id

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
