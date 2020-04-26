# Cureona - server side


server root url : https://cureona.herokuapp.com/

## simple stories:

### customer registration  :
#### url : https://cureona.herokuapp.com/Registration
#### json example :
```
{ 
  "username": "shlomo123",
  "password" :"12345",
  "type": "customer"
}
```

### customer Login :
#### url : https://cureona.herokuapp.com/Login
#### json example :
```
{
  "username": "shlomo123", 
  "password" :"12345"
 }
 ```



### Buisness registration  :
#### url : https://cureona.herokuapp.com/RegisterBusiness
#### json example :
```
{ 
  "username": "shlomo123", 
  "password" :"12345", 
  "type": "business_owner", 
  "BusinessName" : "MYBusiness", 
  "CompanyId":"123456"
 }
 ```


### updating Settings for business  :
#### url : https://cureona.herokuapp.com/businessSettings

#### please NOTICE : Not all fields are required! only company id is required. 
#### that means that you can send an update only for open_hours\open\max_capacity
#### or all together. 

#### return value : 
#### if NO changes were made:
```
{
  "changes": "No chacnges",
  "state": "success"
}
```

#### for every field that was changed the return value will be: 
```
{
  "max_capacity": "updated",
  "open": "updated",
  "open_hours": "updated"
}
```

#### json example :
```
{
   "company_id" : "1234",
   "open_hours" : {"sunday" : ["12:30-16:35", "17:00-19:30"],
					"monday" : ["12:31-16:30","20:00-21:30"],
					"tuesday" : ["12:30-16:35", "17:00-19:30"],
					"wednesday" : ["12:31-16:30","20:00-21:30"],
					"thursday" : "closed",
					"friday" : "closed" ,
					"saturday" : "closed"
			 }	,
	"open" : "False",
  "max_capacity" : 150
}
 ```




### getting  list of  businesses  :

#### url : https://cureona.herokuapp.com/getBusinesses

#### there are to options to get the list of businesses : 
> 1) sending a post request with no parameters - that will generate a JSON that contains all the current available businesses (see example below).
> 2) sending a post request with the version's number. the URL's ending should be: "/getBusinesses?version=7" (7 is just an arbitrery integer- it can be any version number)
this way , it will first check if the users own list of businesses (which is located in the users device) is updated. if it does , the following JSON will be returned :
```
{
    "success": "data is up to date"
}
```

example for a JSON to be returned : 
```
[
  {
    "address": "balfor 24/1",
    "id": "123",
    "keywords": {
      "keys": [
        "Furniture"
      ]
    },
    "name": "IKEA"
  },
  {
    "address": "pinhas hahotzev 3",
    "id": "1",
    "keywords": {
      "keys": [
        "shopping"
      ]
    },
    "name": "shufersal"
  },
  {
    "address": "BIG BEER SHEVA",
    "id": "12",
    "keywords": {
      "keys": [
        "shopping"
      ]
    },
    "name": "OSHER-AD"
  },
  {
    "address": "hasdera hashveet beer sheva",
    "id": "1234",
    "keywords": {
      "keys": [
        "food"
      ]
    },
    "name": "tiv-ta'am"
  }
]
```
