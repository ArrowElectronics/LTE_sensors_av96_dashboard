$(document).ready(function () {
  var socket;
  // The http vs. https is important. Use http for localhost!
  socket = io.connect({ forceNew: true });

  // ############### Resize Charts ###############
  $(window).on('resize', function () {
    if (myChartTemperature != null && myChartTemperature != undefined) {
      myChartTemperature.resize();
    }
    if (myChartTempChart != null && myChartTempChart != undefined) {
      myChartTempChart.resize();
    }
    if (myChartGyr != null && myChartGyr != undefined) {
      myChartGyr.resize();
    }
    if (myChartTof != null && myChartTof != undefined) {
      myChartTof.resize();
    }
    if (myChartMag != null && myChartMag != undefined) {
      myChartMag.resize();
    }
    if (myChartProxy != null && myChartProxy != undefined) {
      myChartProxy.resize();
    }
  });

  // ############### ToF ###############
  var myChartTof = echarts.init(document.getElementById('tof-container'));

  option5 = {
    grid: {
      containLabel: true,
    },
    color: ['#009090'],
    legend: {
      data: ['ToF (mm)'],
      icon: 'circle',
      textStyle: {
        color: 'white',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      data: (function () {
        var now = new Date();
        var res = [];
        var len = 100;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }
        return res;
      })(),
    },
    yAxis: {
      type: 'value',
      scale: true,
      max: 1200,
      min: -10,
      boundaryGap: [0.2, 0.2],
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      name: 'ToF (mm)',
      nameLocation: 'middle',
      nameGap: 50,
      splitLine: {
        show: false,
      },
    },
    series: {
      name: 'ToF (mm)',
      type: 'line',
      lineStyle: {
        color: '#009090',
      },
      itemStyle: {
        color: '#009090',
        opacity: 0,
      },
      showSymbol: false,
      data: (function () {
        var res = [];
        var len = 0;
        while (len < 100) {
          res.push(0);
          len++;
        }
        return res;
      })(),
    },
  };

  socket.on('message_from_server', function (data) {
    var axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

    var text = data;
    var dataJson = JSON.parse(text);
    var tof_val = dataJson.tof;
    var tof_data = option5.series.data;
    tof_data.shift();
    tof_data.push(tof_val);

    option5.xAxis.data.shift();
    option5.xAxis.data.push(axisData);

    myChartTof.setOption(option5);
    myChartTof.resize();
  });

  // ############### Temperature Chart ###############
  var myChartTempChart = echarts.init(
    document.getElementById('temp-chart-container')
  );

  option8 = {
    grid: {
      containLabel: true,
    },
    color: ['#009090'],
    legend: {
      data: ['Temperature °C'],
      icon: 'circle',
      textStyle: {
        color: 'white',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      data: (function () {
        var now = new Date();
        var res = [];
        var len = 100;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }
        return res;
      })(),
    },
    yAxis: {
      type: 'value',
      scale: true,
      max: 155,
      min: -60,
      boundaryGap: [0.2, 0.2],
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      name: 'Temperature °C',
      nameLocation: 'middle',
      nameGap: 50,
      splitLine: {
        show: false,
      },
    },
    series: {
      name: 'Temperature °C',
      type: 'line',
      lineStyle: {
        color: '#009090',
      },
      itemStyle: {
        color: '#009090',
        opacity: 0,
      },
      showSymbol: false,
      data: (function () {
        var res = [];
        var len = 0;
        while (len < 100) {
          res.push(0);
          len++;
        }
        return res;
      })(),
    },
  };

  socket.on('message_from_server', function (data) {
    var axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

    var text = data;
    var dataJson = JSON.parse(text);
    var tempchart_val = dataJson.temp;
    var tempchart_data = option8.series.data;
    tempchart_data.shift();
    tempchart_data.push(tempchart_val);

    option8.xAxis.data.shift();
    option8.xAxis.data.push(axisData);

    myChartTempChart.setOption(option8);
    myChartTempChart.resize();
  });

  // ############### Temperature ###############
  var myChartTemperature = echarts.init(
    document.getElementById('temperature-container')
  );

  // specify chart configuration item and data
  var symbols = [
    'path://M144.998,0.004               c-4.318,0-8.636,1.117-12.5,3.348c-7.728,4.462-12.5,12.727-12.5,21.65l0.164,182.652c-15.904,10.584-23.605,30.141-18.674,48.826                c5.195,19.686,23.025,33.461,43.385,33.518c20.359,0.056,38.266-13.619,43.57-33.275c5.038-18.669-2.549-38.364-18.418-49.051      l-0.025-182.676c-0.001-8.923-4.773-17.187-12.5-21.648C153.637,1.117,149.319,0,145.001,0L144.998,0.004z M144.998,10.002                c2.588,0,5.176,0.672,7.5,2.014c4.648,2.684,7.5,7.623,7.5,12.99v5h-5c-6.762-0.096-6.762,10.096,0,10H160v10h-5.004             c-6.762-0.096-6.762,10.096,0,10h5.006v10h-5.006c-6.762-0.096-6.762,10.096,0,10h5.008l0.019,130.264                c0,1.785,0.952,3.435,2.498,4.328c13.729,7.941,20.402,24.203,16.266,39.527c-4.137,15.33-18.01,25.925-33.889,25.881     c-15.878-0.044-29.692-10.718-33.744-26.07c-4.052-15.353,2.697-31.451,16.486-39.324c1.56-0.891,2.523-2.549,2.521-4.346    l-0.166-185.264c0-5.365,2.853-10.303,7.5-12.986c2.324-1.342,4.912-2.014,7.5-2.014H144.998z M144.922,91.498             c-2.759,0.042-4.963,2.311-4.924,5.07v129.098c-8.821,2.278-14.989,10.229-15,19.34c0,11.046,8.954,20,20,20l0,0      c11.046,0,20-8.954,20-20l0,0c-0.007-9.114-6.175-17.071-15-19.35V96.568c0.039-2.761-2.168-5.031-4.93-5.07              C145.02,91.497,144.971,91.497,144.922,91.498z',
  ];

  var bodyMax = 155;
  var bodyMin = -60;

  option2 = {
    title: {
      text: 0 + '°C',
      textAlign: 'top',
      left: '55%',
      top: '25%',
      textStyle: {
        fontSize: 20,
        fontFamily: 'Arial',
        color: '#009090',
      },
    },
    tooltip: {},
    xAxis: {
      data: ['Temperature'],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
      max: bodyMax,
      min: bodyMin,
      offset: -50,
      splitLine: { show: false },
    },
    grid: {
      top: 'center',
      left: 'left',
      height: 150,
    },
    series: [
      {
        type: 'pictorialBar',
        symbolClip: true,
        symbolBoundingData: bodyMax,
        itemStyle: {
          color: '#009090',
        },
        data: [
          {
            value: 0,
            symbol: symbols[0],
            symbolSize: [45, 150],
          },
        ],
        z: 10,
      },
      {
        name: 'full',
        type: 'pictorialBar',
        symbolBoundingData: bodyMax,
        animationDuration: 0,
        itemStyle: {
          color: '#ccc',
        },
        data: [
          {
            value: 1,
            symbol: symbols[0],
            symbolSize: [45, 150],
          },
        ],
      },
    ],
  };
  myChartTemperature.setOption(option2);

  socket.on('message_from_server', function (data) {
    var text = data;
    var dataJson = JSON.parse(text);
    temp_val = dataJson.temp;

    myChartTemperature.setOption({
      title: { text: temp_val + '°C' },
      series: [
        {
          type: 'pictorialBar',
          symbolClip: true,
          symbolBoundingData: bodyMax,
          itemStyle: {
            color: '#009090',
          },
          data: [
            {
              value: temp_val,
              symbol: symbols[0],
              symbolSize: [45, 150],
            },
          ],
          z: 10,
        },
        {
          name: 'full',
          type: 'pictorialBar',
          symbolBoundingData: bodyMax,
          animationDuration: 0,
          itemStyle: {
            color: '#ccc',
          },
          data: [
            {
              value: 1,
              symbol: symbols[0],
              symbolSize: [45, 150],
            },
          ],
        },
      ],
    });
    myChartTemperature.resize();
  });

  // ############### Gyr ###############
  var myChartGyr = echarts.init(document.getElementById('gyr-container'));

  option1 = {
    grid: {
      containLabel: true,
    },
    legend: {
      data: ['Axis X', 'Axis Y', 'Axis Z'],
      icon: 'circle',
      textStyle: {
        color: 'white',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      data: (function () {
        var now = new Date();
        var res = [];
        var len = 100;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }
        return res;
      })(),
    },
    yAxis: {
      name: 'RPS',
      nameLocation: 'middle',
      nameGap: 50,
      type: 'value',
      scale: true,
      max: 3,
      min: -3,
      boundaryGap: [0.2, 0.2],
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      name: 'RPS',
      nameLocation: 'middle',
      nameGap: 50,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: 'Axis X',
        type: 'line',
        lineStyle: {
          color: '#009090',
        },
        itemStyle: {
          color: '#009090',
          opacity: 0,
        },
        showSymbol: false,
        data: (function () {
          var res = [];
          var len = 0;
          while (len < 100) {
            res.push(0);
            len++;
          }
          return res;
        })(),
      },
      {
        name: 'Axis Y',
        type: 'line',
        lineStyle: {
          color: '#FFA500',
        },
        itemStyle: {
          color: '#FFA500',
          opacity: 0,
        },
        showSymbol: false,
        data: (function () {
          var res = [];
          var len = 0;
          while (len < 100) {
            res.push(0);
            len++;
          }
          return res;
        })(),
      },
      {
        name: 'Axis Z',
        type: 'line',
        lineStyle: {
          color: '#008000',
        },
        itemStyle: {
          color: '#008000',
          opacity: 0,
        },
        showSymbol: false,
        data: (function () {
          var res = [];
          var len = 0;
          while (len < 100) {
            res.push(0);
            len++;
          }
          return res;
        })(),
      },
    ],
  };

  socket.on('message_from_server', function (data) {
    var axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

    var text = data;
    var dataJson = JSON.parse(text);
    gyr_x_val = dataJson.gyr.x;
    gyr_y_val = dataJson.gyr.y;
    gyr_z_val = dataJson.gyr.z;

    gyr_x_val_f = gyr_x_val / 900;
    gyr_y_val_f = gyr_y_val / 900;
    gyr_z_val_f = gyr_z_val / 900;

    var gyr_x = option1.series[0].data;
    gyr_x.shift();
    gyr_x.push(gyr_x_val_f.toFixed(2));

    var gyr_y = option1.series[1].data;
    gyr_y.shift();
    gyr_y.push(gyr_y_val_f.toFixed(2));

    var gyr_z = option1.series[2].data;
    gyr_z.shift();
    gyr_z.push(gyr_z_val_f.toFixed(2));

    option1.xAxis.data.shift();
    option1.xAxis.data.push(axisData);

    myChartGyr.setOption(option1);
    myChartGyr.resize();
  });

  // ############### Mag ###############
  var myChartMag = echarts.init(document.getElementById('mag-container'));

  option4 = {
    grid: {
      containLabel: true,
    },
    legend: {
      data: ['Axis X', 'Axis Y', 'Axis Z'],
      icon: 'circle',
      textStyle: {
        color: 'white',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      data: (function () {
        var now = new Date();
        var res = [];
        var len = 100;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }
        return res;
      })(),
    },
    yAxis: {
      type: 'value',
      scale: true,
      max: 1800,
      min: -1800,
      boundaryGap: [0.2, 0.2],
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      name: 'μT',
      nameLocation: 'middle',
      nameGap: 50,
      splitNumber: 1,
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: 'Axis X',
        type: 'line',
        lineStyle: {
          color: '#009090',
        },
        itemStyle: {
          color: '#009090',
          opacity: 0,
        },
        showSymbol: false,
        data: (function () {
          var res = [];
          var len = 0;
          while (len < 100) {
            res.push(0);
            len++;
          }
          return res;
        })(),
      },
      {
        name: 'Axis Y',
        type: 'line',
        lineStyle: {
          color: '#FFA500',
        },
        itemStyle: {
          color: '#FFA500',
          opacity: 0,
        },
        showSymbol: false,
        data: (function () {
          var res = [];
          var len = 0;
          while (len < 100) {
            res.push(0);
            len++;
          }
          return res;
        })(),
      },
      {
        name: 'Axis Z',
        type: 'line',
        lineStyle: {
          color: '#008000',
        },
        itemStyle: {
          color: '#008000',
          opacity: 0,
        },
        showSymbol: false,
        data: (function () {
          var res = [];
          var len = 0;
          while (len < 100) {
            res.push(0);
            len++;
          }
          return res;
        })(),
      },
    ],
  };

  socket.on('message_from_server', function (data) {
    var axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

    var text = data;
    var dataJson = JSON.parse(text);
    mag_x_val = dataJson.mag.x;
    mag_y_val = dataJson.mag.y;
    mag_z_val = dataJson.mag.z;

    mag_x_val_f = mag_x_val / 16;
    mag_y_val_f = mag_y_val / 16;
    mag_z_val_f = mag_z_val / 16;

    var data1 = option4.series[0].data;
    data1.shift();
    data1.push(mag_x_val_f.toFixed(2));

    var data1 = option4.series[1].data;
    data1.shift();
    data1.push(mag_y_val_f.toFixed(2));

    var data1 = option4.series[2].data;
    data1.shift();
    data1.push(mag_z_val_f.toFixed(2));

    option4.xAxis.data.shift();
    option4.xAxis.data.push(axisData);

    myChartMag.setOption(option4);
    myChartMag.resize();
  });

  // ############### Proxy ###############
  var myChartProxy = echarts.init(document.getElementById('proxy-container'));

  option6 = {
    grid: {
      containLabel: true,
    },
    color: ['#009090'],
    legend: {
      data: ['Intensity'],
      icon: 'circle',
      textStyle: {
        color: 'white',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#283b56',
        },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      data: (function () {
        var now = new Date();
        var res = [];
        var len = 100;
        while (len--) {
          res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
          now = new Date(now - 2000);
        }
        return res;
      })(),
    },
    yAxis: {
      type: 'value',
      scale: true,
      max: 265000,
      min: 125000,
      splitNumber: 5,
      boundaryGap: [0.2, 0.2],
      axisLine: {
        lineStyle: {
          color: 'darkgrey',
        },
      },
      splitLine: {
        show: false,
      },
    },
    series: {
      name: 'Intensity',
      type: 'line',
      lineStyle: {
        color: '#009090',
      },
      itemStyle: {
        color: '#009090',
        opacity: 0,
      },
      showSymbol: false,
      data: (function () {
        var res = [];
        var len = 0;
        while (len < 100) {
          res.push(0);
          len++;
        }
        return res;
      })(),
    },
  };

  socket.on('message_from_server', function (data) {
    // ############### Table ###############
    var text = data;
    var dataJson = JSON.parse(text);
    var proxy_x = dataJson.proxy.x;
    var proxy_x1 = dataJson.proxy.x1;
    var proxy_x2 = dataJson.proxy.x2;
    var proxy_y = dataJson.proxy.y;
    var proxy_y1 = dataJson.proxy.y1;
    var proxy_y2 = dataJson.proxy.y2;
    var proxy_fix = dataJson.proxy.fi_x;
    var proxy_fiy = dataJson.proxy.fi_y;
    var proxy_int = dataJson.proxy.int;

    document.getElementById('proxy-x').innerHTML = proxy_x;
    document.getElementById('proxy-x1').innerHTML = proxy_x1;
    document.getElementById('proxy-x2').innerHTML = proxy_x2;
    document.getElementById('proxy-y').innerHTML = proxy_y;
    document.getElementById('proxy-y1').innerHTML = proxy_y1;
    document.getElementById('proxy-y2').innerHTML = proxy_y2;
    document.getElementById('proxy-fix').innerHTML = proxy_fix;
    document.getElementById('proxy-fiy').innerHTML = proxy_fiy;
    document.getElementById('proxy-int').innerHTML = proxy_int;

    // ############### Charts ###############
    var axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
    var proxy_data = option6.series.data;
    proxy_data.shift();
    proxy_data.push(proxy_int);

    option6.xAxis.data.shift();
    option6.xAxis.data.push(axisData);

    myChartProxy.setOption(option6);
    myChartProxy.resize();
  });

  // ############### Acc ###############
  // Three.js ray.intersects with offset canvas
  var container,
    camera,
    scene,
    renderer,
    mesh,
    objects = [],
    CANVAS_WIDTH = 170,
    CANVAS_HEIGHT = 170;

  container = document.getElementById('canvastest');

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x161a28, 1);
  renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    50,
    CANVAS_WIDTH / CANVAS_HEIGHT,
    1,
    1000
  );
  camera.position.y = 150;
  camera.position.z = 500;
  camera.lookAt(scene.position);

  mesh = new THREE.Mesh(
    new THREE.BoxGeometry(200, 200, 200),
    new THREE.MeshNormalMaterial()
  );
  scene.add(mesh);
  objects.push(mesh);

  function render() {
    socket.on('message_from_server', function (data) {
      var text = data;
      var dataJson = JSON.parse(text);
      acc_y = dataJson.acc.y;
      acc_x = dataJson.acc.x;
      acc_z = dataJson.acc.z;

      acc_y_f = acc_y / 100;
      acc_x_f = acc_x / 100;
      acc_z_f = acc_z / 100;

      acc_x_val = acc_x / 1000;
      acc_y_val = acc_y / 1000;
      acc_z_val = acc_z / 1000;

      mesh.rotation.y = acc_y_val;
      mesh.rotation.x = acc_x_val;
      mesh.rotation.z = acc_z_val;

      renderer.render(scene, camera);

      // ############### Table ###############
      document.getElementById('acc_axis-x').innerHTML =
        'Axis X:' + ' ' + acc_x_f.toFixed(2) + ' m/s&#178';
      document.getElementById('acc_axis-y').innerHTML =
        'Axis Y:' + ' ' + acc_y_f.toFixed(2) + ' m/s&#178';
      document.getElementById('acc_axis-z').innerHTML =
        'Axis Z:' + ' ' + acc_z_f.toFixed(2) + ' m/s&#178';
    });
  }
  render();
});
