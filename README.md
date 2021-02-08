#  ✈️ ERLIJN

**[Live link](https://jochemvogel.github.io/web-app-from-scratch-2021/)**

ERLIJN is a search engine for (cheap) flights where you can search and book flights.
  ### Table of Contents
<table>
    <tr>
        <td align="center"><a href="#nerd_face-usage">🤓 Usage<a></td>
        <td align="center"><a href="#gear-installation">⚙️ Installation<a></td>
        <td align="center"><a href="#open_file_folder-folder-structure">🗂 Folder Structure<a></td>
        <td align="center"><a href="#package-api-endpoints-structure">📦 API Structure<a></td>
        <td align="center"><a href="#memo-todo-list">📝 Todo list<a></td>
    </tr> 
</table>


##  :nerd_face: Usage

Search for a location and click on search. Thereafter a few cards with quotes will appear. On this cards you can find a **`Details`** button. Click on this and a modal with details about the flight/quote will appear.

*Future: a **book** button on the details modal that will bring you to a checkout page/route.*

### Screenshot

![Frontend ](https://i.ibb.co/D539yLd/Screenshot-2021-02-08-at-12-02-52.png)

<a href="installation"></a>
##  :gear: Installation

### Get it local
This app is made with Vanilla JS and has no package, yet. Just clone the repository and you're good to go. I advise you to use a webserver. There are two options:

1. Just install a live server plugin for you IDE and run it ([extension VSCode](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).
2. Run `python -m SimpleHTTPServer 8000` in your terminal.

### Skyscanner API

Go to [RapidApi.com](https://rapidapi.com/skyscanner/api/skyscanner-flight-search) and click on **Sign Up** in the top right corner. When you've done this, return back to the previous URL and you can use the API. The API has no rate limit.

For now this is not necessary, because the API key is stored inside the `constants/api.js` file. I added it, anyways. In the future I'll improve the installation documentation (if needed).
 
 ## :open_file_folder: Folder Structure
 
 This projects uses **modules**. Honestly I don't have to say a lot about it, so maybe in the future I'll add some more details about the usage of the project.

##  :package: API Endpoints Structure


What's inside the API (structure/objects). 

The documentation and all the (interactive) endpoints kan be found [here](https://rapidapi.com/skyscanner/api/skyscanner-flight-search).

Examples of the two used endpoints will be listed below:

### Places
This endpoint is used to fetch user friendly locations like ***Amsterdam*** to locations the Quotes endpoint understands like ***AMS-sky***

#### Parameters
*query*: **Nederland**
*country*: **Nederland**
*currency*: **EUR**
*locale*: **nl-NL**

#### Output

  ```json
"Places":[
"0":{
      "PlaceId":"NL-sky",
      "PlaceName":"Nederland",
      "CountryId":"NL-sky",
      "RegionId":"",
      "CityId":"-sky",
      "CountryName":"Nederland"
   }
 "1":{
      "PlaceId":"AMS-sky",
      "PlaceName":"Amsterdam Schiphol",
      "CountryId":"NL-sky""RegionId":"",
      "CityId":"AMST-sky",
      "CountryName":"Nederland"
   }
   "2":{
      "PlaceId":"EIN-sky",
      "PlaceName":"Eindhoven",
      "CountryId":"NL-sky",
      "RegionId":"",
      "CityId":"EIND-sky",
      "CountryName":"Nederland"
   }
 "3, 4, 5, 6, 7, 8, 9":{
 Same for: Rotterdam, Maastricht & Groningen 
   }
```

Small side note: It will list all the location that has the query in his name. For example: all the airports in `Caribisch Nederland` will also be included in the query `Nederland`. Be aware of that. 

### Browse Flight Prices (Browse Quotes)

#### Parameters
*country*: **US**
*currency*: **USD**
*locale*: **en-US**
*originplace*: **SFO-sky** (San Fransisco)
*destinationplace*: **JFK-sky** (New York)
*outboundpartialdate*: **2021-02-10**


 #### Output
```json
{
   "Quotes":[
		0":{
         "QuoteId":1,
         "MinPrice":220,
         "Direct":true",
         "OutboundLeg":{
            "CarrierIds":[
				0:851
            ],
            "OriginId":81727,
            "DestinationId":60987,
            "DepartureDate":"2021-02-10T00:00:00"
         }
         "QuoteDateTime":"2021-02-08T08:21:00"
      }
   ]
   "Carriers":[
		0:{
         "CarrierId":851,
         "Name":"Alaska Airlines"
      }
   ],
   "Places":[
	   0:{
	        "Name":"New York John F. Kennedy",
	        "Type":"Station",
	        "PlaceId":60987,
	        "IataCode":"JFK",
	        "SkyscannerCode":"JFK",
	        "CityName":"New York",
	        "CityId":"NYCA",
	        "CountryName":"United States"
	        },
      1:{
         "Name":"San Francisco International",
         "Type":"Station",
         "PlaceId":81727,
         "IataCode":"SFO",
         "SkyscannerCode":"SFO",
         "CityName":"San Francisco",
         "CityId":"SFOA",
         "CountryName":"United States"
      }
   ],
   "Currencies":[
	   0: { 
	   "Code":"USD",
	   "Symbol":"$",
	   "ThousandsSeparator":",",
	   "DecimalSeparator":".",
	   "SymbolOnLeft":true,
	   "SpaceBetweenAmountAndSymbol":false,
	   "RoundingCoefficient":0,
	   "DecimalDigits":2
      }
   ]
}
```

##  :memo: Todo list

-  [x]  **Add modules**. Make it more readable.

-  [x]  **Let users fill in the location instead of the Airport Code**. More common that you search for `Amsterdam` instead of `AMS`. Make that happen.

-  [ ] **Error handling for users.** Give them feedback: are there no flights? Did they miss something? Did they fill in the wrong airport. Maybe the API-key is not working correctly (anymore), and they get an 401. Besides that: JS stops running when there is an error. When that happens, the app stops working (until you reload). Not a good UX imo.

-  [ ] **Make the detail modal dynamic**. It's already dynamic now, but JS is creating a modal for every card, while one modal (that updates based on the data) is enough.

-  [ ] **Let the user choose their currency**. It's standard EUR now, but why not make it dynamic.

-  [ ] **Let the user choose between only direct flights**. Maybe a checkbox and it can also be displayed on the details modal.

-  [ ] **Improve the details modal**. It's boring right now. Add extra (useful) information and redesign it.

-  [ ] **Come up with new ideas and add those in the README**. Ongoing 🙃
	