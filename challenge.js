lightSensor.setScale(0, 255);
soundSensor.setScale(0, 255);
onBoardEvent(lightSensor, "data", function() {
  var lightRGB = lightSensor.value;
  var soundRGB = soundSensor.value;
  var tempRGB = tempSensor.F;
  setProperty("sound_icon", "icon-color", rgb(soundRGB,0,0));
  setProperty("light_icon", "icon-color", rgb(0,lightRGB * 2,0));
  setProperty("temp_icon", "icon-color", rgb(0,0,tempRGB));
});
