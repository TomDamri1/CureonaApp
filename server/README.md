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


### updateding Settings for business  :
#### url : https://cureona.herokuapp.com/businessSettings
#### please NOTICE : not all the fields are mendatory! that means that you can send an update only for open_hours\open\max_capacity
#### or all together. 

#### return value : {'state': 'success', "changes"} of NO changes were made. 
#### for every field that was changed the return value will be: { "max_capacity": "updated", "open": "updated",open_hours": "updated"}

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
