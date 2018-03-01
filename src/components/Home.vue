<template>
<div>
<div class="combo" onclick="myFunction()">
    <div class="upper">{{sensorData}}</div>
    <div class="lower">
    <p>{{sensorName}}</p>
    <p>{{sensorDesc}}</p>
    </div>
</div>
</div>
</template>

<script>
export default {
  name: 'sensor',
  data () {
    return {
      sensorName: 'LietotajsX'
    }
  }
}

var BLOCKS_PER_CHART = 10;

function generateChart(chartContainer) {
  var container = document.createElement("div");
  var text = "Hello World!";
  var blockDiv, textSpan;  // used in the for loop

  container.className = "container2";
  document.getElementById(chartContainer.replace("#", "")).appendChild(container);

  for(var i = 0; i < BLOCKS_PER_CHART; i++) {
    blockDiv = document.createElement("div");
    blockDiv.className = "block";
    textSpan = document.createElement("span");
    textSpan.append(text);  // see note about browser compatibility
    blockDiv.append(textSpan);
    container.append(blockDiv);
  }
}

</script>

<style scoped>
.combo
{
   transition: transform .2s;
    width: 180px;
    height: 260px;
    border: 2px solid red;
    border-radius: 10px;
    margin: 10px;
    float: left;
}
.upper
{
height: 180px;
}
.lower
{
  height: 80px;
  border-top: 2px solid red;
}
.combo:hover {
    transform: scale(1.05);
}
</style>
