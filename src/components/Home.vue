<template>
  <div class="full">
    <div class="combo" onclick="dropDiv()">
      <div class="upper">
        <img src=static/snow.png>
      </div>
        <div class="lower">
        <h3>{{sensorName}}</h3>
          <div class="lowerLeft"><p>Time: {{sensorTime}}</p>
          <p>Temp.: {{sensorTemp}}</p>
          <p>Hum.: {{sensorHum}}</p>
          </div>
          <div class="lowerright">
          <p>Polution: {{sensorPol}}</p>
          <p>Type: {{sensorType}}</p>
          <img src=static/warning.png>
          <img src=static/lowbattery.png>
        </div>
      </div>
    </div>
  
    <div class="combo" onclick="dropDiv()">
      <div class="upper"><img src=static/cloudy.png>{{sensorData}}</div>
        <div class="lower">
        <h3>{{sensorName}}</h3>
          <div class="lowerLeft"><p>Time: {{sensorTime}}</p>
          <p>Temp.: {{sensorTemp}}</p>
          <p>Hum.: {{sensorHum}}</p>
          </div>
          <div class="lowerright">
          <p>Polution: {{sensorPol}}</p>
          <p>Type: {{sensorType}}</p>
        </div>
      </div>
    </div>
  
    <div class="combo" onclick="dropDiv()">
      <div class="upper"><img src=static/sun.png>{{sensorData}}</div>
        <div class="lower">
        <h3>{{sensorName}}</h3>
          <div class="lowerLeft"><p>Time: {{sensorTime}}</p>
          <p>Temp.: {{sensorTemp}}</p>
          <p>Hum.: {{sensorHum}}</p>
          </div>
          <div class="lowerright">
          <p>Polution: {{sensorPol}}</p>
          <p>Type: {{sensorType}}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sensor',
  data () {
    return {
      sensorName: 'SensorsX',
      sensorTime: '15:00',
      sensorTemp: '18.53',
      sensorHum: '55%',
      sensorPol: '50',
      sensorType: '1'
    }
  }
}
</script>

<style scoped>
body.home
{
  background-color: rgb(224,224,224);
}
.combo
{
   transition: transform .3s;
    width: 180px;
    height: 260px;
    border-radius: 10px;
    margin: 10px;
    float: left;
}
.upper
{
  background-color: rgb(224,224,224);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 180px;
  width: 180px;
  opacity: 0.8;
}
.upper img
{
  height: 180px;
  width: 180px;
  opacity: 0.3;
}
.lowerright img
{
  height: 15px;
  width: 15px;
  float: right;
  margin-right: 10px;
}
.lower
{
  height: 80px;
  background-color: #DC143C;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.lowerLeft
{
  float: left;
  width: 90px;
}
.loweright
{
  float: right;
  width: 90px;
}
.combo:hover {
  transform: scale(1.05);
}
p
{
  font-size: 11px;
  margin: 2px;
}
h3
{
  font-size: 14px;
  margin-left: 5px;
}
</style>
