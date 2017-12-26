var length = {
  meters: 1,
  kilometers: 0.001,
  centimeters: 100,
  millimeters: 1000,
  micrometers: 1000000,
  nanometers: 1000000000,
  inches: 39.3701,
  feet: 3.28084,
  miles: 0.000621371
}
var mass = {
  grams: 1,
  kilograms: 0.001,
  milligrams: 1000,
  tons: 0.000001,
  pounds: 0.00220462,
  ounces: 0.035274
}
var time = {
  seconds: 1,
  milliseconds: 1000,
  microseconds: 1000000,
  nanoseconds: 1000000000,
  minutes: 0.0166667,
  hours: 0.000277778,
  days: 0.000011574,
  weeks: 0.0000016534,
  months: 0.00000038052,
  years: 0.00000003171 
}
var temperature = {
  celsius: 1,
  fahrenheit: 33.8,
  kelvin: 274.15
}
var speed = {
  metersPerSecond: 1,
  kilometersPerHour: 3.6,
  milesPerHour: 2.23694,
  knots: 1.94384
}

var indexArr = [length, mass, speed, temperature, time];

function converter(unitType, unit1, unit2, value){
  
  var finalValue;
    
  if(unitType == speed){
    
    unit1 = alterSpeedUnit(unit1);
    unit2 = alterSpeedUnit(unit2);
    
  }else{
    unit1 = unit1.toLowerCase();
    unit2 = unit2.toLowerCase();  
  }
     
  if(unitType == temperature){   
    finalValue = convertTemperature(value, unit1, unit2);   
  }else{
    finalValue = value*(1/unitType[unit1])*unitType[unit2];
  }
    
  return finalValue;
  
}

$("#value1").on("keyup", function(e){
  
  e.preventDefault();
  
  var convertedValue,
      value1 = document.getElementById("value1").value,
      unitIndex = document.getElementById("unitType").selectedIndex,
      unit1 = document.getElementById("select1").value,
      unit2 = document.getElementById("select2").value;
  
  value1 = parseFloat(value1);

  if(typeof value1 != "number"){
    throw "Please enter a number";
  }else{       
        
    convertedValue = converter(indexArr[unitIndex], unit1, unit2, value1);
    
    if(isNaN(convertedValue) == true){
      console.log("bloop");
      convertedValue = "";
    }
    
    document.getElementById("value2").value = convertedValue;
    
    
  }
  
})


$("#value2").on("keyup", function(e){
  
  e.preventDefault();
  
  var convertedValue,
      value2 = document.getElementById("value2").value,
      unitIndex = document.getElementById("unitType").selectedIndex,
      unit1 = document.getElementById("select1").value,
      unit2 = document.getElementById("select2").value;
  
  value2 = parseFloat(value2);

  if(typeof value2 != "number"){
    throw "Please enter a number";
  }else{       
    
    convertedValue = converter(indexArr[unitIndex], unit2, unit1, value2);
    
    if(isNaN(convertedValue) == true){
      console.log("bloop");
      convertedValue = "";
    }
    
    document.getElementById("value1").value = convertedValue;
    
  }
  
})

var index,
    newContent,
    newContent1,
    unitOptions,
    body;

$(".selectBox").on("input", function(e){
  
    e.preventDefault();
  
  var convertedValue,
      value1 = document.getElementById("value1").value,
      unitIndex = document.getElementById("unitType").selectedIndex,
      unit1 = document.getElementById("select1").value,
      unit2 = document.getElementById("select2").value;
  
  value1 = parseFloat(value1);

  if(typeof value1 != "number"){
    throw "Please enter a number";
  }else{       
        
    convertedValue = converter(indexArr[unitIndex], unit1, unit2, value1);

    if(isNaN(convertedValue) == true){
      console.log("bloop");
      convertedValue = "";
    }
    
    document.getElementById("value2").value = convertedValue;
    
    
  }
    

})


$("#unitType").on("input", function(){
    
  index = document.getElementById("unitType").selectedIndex;
  body = "";


  unitOptions = [["Meters", "Feet", "Miles", "Inches", "Kilometers", "Millimeters", "Micrometers", "Nanometers", "Centimeters"], ["Grams", "Kilograms", "Milligrams", "Tons", "Pounds", "Ounces"], ["Meters Per Second", "Miles Per Hour", "Kilometers Per Hour", "Knots"], ["Celsius", "Fahrenheit", "Kelvin"], ["Seconds", "Milliseconds", "Microseconds", "Nanoseconds", "Minutes", "Hours", "Days", "Weeks", "Months", "Years"]]


  $(".selectBox").attr("name", indexArr[index]);

  for(var i = 0; i < unitOptions[index].length; i++){
    body += '<option value=' + unitOptions[index][i] + '>' + unitOptions[index][i] + '</option>';

  }
  
  $(".selectBox").empty().prepend(body);
   
});


function alterSpeedUnit(unit){
  
  
    switch(unit){
      case "Meters":
        unit = "metersPerSecond";
        break;
      case "Miles":
        unit = "milesPerHour";
        break;
      case "Kilometers":
        unit = "kilometersPerHour";
        break;
      case "Knots":
        unit = "knots";
        break;
    }
   
  return unit;

}


function convertTemperature(value, scale1, scale2){
    
  var temp;
  
  if(scale1 == scale2){
    temp = value;
  }else{
    if(scale1 != "celsius"){
      value = convertToCelsius(value, scale1);
    }
    
    if(scale2 == "celsius"){
      temp = value;
    }else if(scale2 == "fahrenheit"){
      temp = value*(9/5) + 32;
    }else{
      temp = value + 273.15;
    }
  }
  
  return temp;
  
}


function convertToCelsius(value, scale){
  
  var celsius;
  
  if(scale == "fahrenheit"){
    celsius = (value - 32)*(5/9);
  }else{
    celsius = value - 273.15;
  }
  
  return celsius;
  
}
