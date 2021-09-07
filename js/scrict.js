const RANGE_PIE = 8000;
const RANGE_GRAPH = 50;
const BLUE = "#186AA5";
const api_url = "https://api.demoleap.com/exercise";

window.onload = function () {

  CanvasJS.addColorSet("default",
    [
      BLUE
    ]);
  CanvasJS.addColorSet("blue",
    [
      BLUE, "#0FA8E2", "#98E3FE"
    ]);
  //Better to construct options first and then pass it as a parameter
  var options = {
    colorSet: "default",
    title: {
      text: ""
    },
    cornerRadius: 5,
    dataPointWidth: 26,
    axisY: {
      maximum: 50,
      interval: 10,
      gridDashType: "dot",
      gridColor: BLUE,
      lineThickness: 0,
      tickLength: 0,
      labelFontSize: 16,
      labelFontColor: BLUE,
      labelFontFamily: 'Noto Sans KR',
    },
    axisX: {
      lineThickness: 0,
      tickLength: 50,
      tickThickness: 0,
      labelFontSize: 16,
      labelFontColor: BLUE,
      labelFontFamily: 'Noto Sans KR',
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: "column",
        borderRadius: 15,
        dataPoints: [
          { label: "Jan.", y: 10 },
          { label: "Feb.", y: 15 },
          { label: "Mar.", y: 25 },
          { label: "Apr.", y: 30 },
          { label: "May", y: 28 },
          { label: "Jun.", y: 28 },
          { label: "Jul.", y: 10 },
          { label: "Aug.", y: 46 },
          { label: "Sep.", y: 25 },
          { label: "Oct.", y: 30 },
          { label: "Nov.", y: 28 },
          { label: "Dec.", y: 28 },
        ]
      }
    ]
  };

  $("#graph").CanvasJSChart(options);

  var optionsPie = {
    colorSet: "blue",
    exportEnabled: false,
    animationEnabled: false,
    legend: {
      horizontalAlign: "left",
      verticalAlign: "center",
      fontFamily: 'Noto Sans KR',
      fontColor: BLUE,
      fontSize: 16,
      markerMargin: 34,
      itemWidth: 200,
    },
    data: [{
      type: "pie",
      showInLegend: true,
      toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
      legend: {
        markerMargin: 80
      },
      indexLabel: "{}",
      legendText: "{name}",
      indexLabelPlacement: "inside",
      dataPoints: [
        { y: 6566.4, name: "Data 1" },
        { y: 2599.2, name: "Data 2" },
        { y: 1231.2, name: "Data 3" },
      ]
    }]
  };
  $("#pie").CanvasJSChart(optionsPie);

  $('#tograph').on('click', function () {
    $('#tograph').addClass("active");
    $('#topie').removeClass("active");
    $("#pie").addClass("hidden");
    $("#graph").removeClass("hidden");
    $("#graph").CanvasJSChart(options);
  });

  $('#topie').on('click', function () {
    $('#tograph').removeClass("active");
    $('#topie').addClass("active");
    $("#graph").addClass("hidden");
    $("#pie").removeClass("hidden");
    $("#pie").CanvasJSChart(optionsPie);
  });

  $('#random').on('click', function () {
    optionsPie.data[0].dataPoints.forEach(function (el) {
      el.y = Math.random() * RANGE_PIE;
    });
    options.data[0].dataPoints.forEach(function (el) {
      el.y = Math.floor(Math.random() * RANGE_GRAPH);
    });
    $("#pie").CanvasJSChart(optionsPie);
    $("#graph").CanvasJSChart(options);
  });

  $('#server').on('click', function () {
    getData(api_url);
  });

}

function getData(url) {
  var headers = { 'Access-Control-Allow-Origin': '*' };
  $.ajax({
    type: 'POST',
    url: url,
    crossDomain: true,
    data: '{}',
    dataType: 'json',
    headers: headers,
    success: function (responseData, textStatus, jqXHR) {
      console.log(responseData);
    },
    error: function (responseData, textStatus, errorThrown) {
      alert('POST failed.');
    }
  });
}
