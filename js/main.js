//Scott Caruso
//VFW 1205
//Project 2

window.addEventListener("DOMContentLoaded", function(){	   	   			   
    //Variables
    var manaCosts = ["0","1","2","3","4","5","6","7","8","9","10+"];
    var typeValue;
    makeManaCosts();
	
	//The below function gets the name of elements from the form.
    function elementName(x){
         var elementName = document.getElementById(x);
         return elementName;              
    };
    
   	//Function to create Mana Cost Drop-Down
   	function makeManaCosts(){
   		var findFormTag = document.getElementsByTagName("form");
   		var whereToPut = elementName("manacost");
   		var makeManaDropdown = document.createElement("select");
   		makeManaDropdown.setAttribute("id", "manacosts");
   		for(var i=0, y=manaCosts.length; i<y; i++){
   			var makeOption = document.createElement("option");
   			var optionText = manaCosts[i];
   			makeOption.setAttribute("value", optionText);
   			makeOption.innerHTML = optionText;
   			makeManaDropdown.appendChild(makeOption);
   		}; 
   		whereToPut.appendChild(makeManaDropdown);		
   	};
   	
   	//To get value from card type
   	function getCardType(){
   		var buttons = document.forms[0].type;
   		for(var i=0; i<buttons.length; i++){
   			if(buttons[i].checked){
   				typeValue = buttons[i].value;
   				//console.log(typeValue);
   			};
   		};
   	};
   	
   	//To get colors
   	function getCardColors(){
   		var colors = [];
		if(elementName("white").checked){
			colors.push("white");
		};
		if(elementName("black").checked){
			colors.push("black");
		};
		if(elementName("blue").checked){
			colors.push("blue");
		};
		if(elementName("red").checked){
			colors.push("red");
		};
		if(elementName("green").checked){
			colors.push("green");
		};		
		if(elementName("colorless").checked){
			colors.push("colorless");
		};	
		return colors	
   	};
   	
   	function toggleControls(dataDisplayed){
		switch(dataDisplayed){
			case "on":
				elementName("form").style.display = "none";
				elementName("eraseData").style.display = "inline";
				elementName("displayData").style.display = "none";
				elementName("addCard").style.display = "inline";			
				break;
			case "off":
				elementName("form").style.display = "block";
				elementName("eraseData").style.display = "inline";
				elementName("displayData").style.display = "inline";
				elementName("addNew").style.display = "none";
				elementName("cards").style.display = "none";		
				break;
			default:
				elementName("addCard").style.display = "none";
				return false;
		};
	};
   	
   	//To store the data
   	function saveCard() {
   		var id = Math.floor(Math.random()*3253533);
   		var cardColors = getCardColors();
   		getCardType();
   		var card = {};
   			card.name = ["Card Name:", elementName("cardname").value];
   			card.mana = ["Mana Cost:", elementName("manacosts").value];
   			card.colors = ["Colors:", cardColors];
   			card.type = ["Card Type:", typeValue];
   			card.usage = ["Currently In Use?", elementName("currentuse").value];
   			card.notes = ["Notes:", elementName("comments").value];
   			card.date = ["Date Acquired:", elementName("dateacquired").value];
   			card.love = ["Amount of Love:", elementName("preference").value];
   		localStorage.setItem(id, JSON.stringify(card));
   		alert(elementName("cardname").value + " has been added!");
   		window.location.reload();
   	};
   	
   	function displayCards(){
   		toggleControls("on");
   		var makeDiv = document.createElement("div");
   		makeDiv.setAttribute("id", "cards");
   		var listCardsDL = document.createElement("dl");
   		makeDiv.appendChild(listCardsDL);
   		document.body.appendChild(makeDiv);
   		elementName("cards").style.display = "block";
   		elementName("addCard").style.display = "inline";
   		for(var i=0, y=localStorage.length; i<y; i++){
   			var makedt = document.createElement("dt");
   			listCardsDL.appendChild(makedt);
   			var key = localStorage.key(i);
   			var value = localStorage.getItem(key);
   			var obj = JSON.parse(value);
   			var cardTitle = (obj.name[0] + " " + obj.name[1]);
   			makedt.innerHTML = cardTitle;
   			makedt.setAttribute("class", "cardtitle");
   			var makeCardDetails = document.createElement("dd");
   			makedt.appendChild(makeCardDetails);
   			delete obj.name;
   			for(var n in obj){
   				var makeCardDetailItem = document.createElement("dd");
   				makeCardDetails.appendChild(makeCardDetailItem);
   				var cardText = (obj[n][0] + " " + obj[n][1]);
   				makeCardDetailItem.innerHTML = cardText;
   			};
   		};
   	};
   	
   	function eraseCardData(){
   		if(localStorage.length === 0){
   			alert("There are no cards in your binder to clear.");
   		} else {
   			localStorage.clear();
   			alert("All cards have been removed from your binder.");
   			window.location.reload();
   			return false;
   		};
   	};

	//Make things happen when the links are clicked.
	var displayCardData = elementName("displayData");
	displayCardData.addEventListener("click", displayCards);
  	var clearCardData = elementName("eraseData");
  	clearCardData.addEventListener("click", eraseCardData);
  	var saveCardData = elementName("submit");
  	saveCardData.addEventListener("click", saveCard);                            
});