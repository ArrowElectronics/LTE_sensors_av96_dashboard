$(document).ready(function () {
  let socket;
  // The http vs. https is important. Use http for localhost!
  socket = io.connect({ forceNew: true });

  // timestamp chart function
  function timeStamp() {
    let timeNow = new Date();
    let arrayLength = [];
    let chartLength = 100;
    while (chartLength--) {
      arrayLength.unshift(timeNow.toLocaleTimeString().replace(/^\D*/, ''));
      timeNow = new Date(timeNow);
    }
    return arrayLength;
  }

  // init drawing line chart function
  function initChartValue() {
    let arrayLength = [];
    let chartLength = 0;
    while (chartLength < 100) {
      arrayLength.push(0);
      chartLength++;
    }
    return arrayLength;
  }

  // ############### Resize Charts ###############
  $(window).on('resize', function () {
    if (chartTemperature != null && chartTemperature != undefined) {
      chartTemperature.resize();
    }
    if (chartTempGraph != null && chartTempGraph != undefined) {
      chartTempGraph.resize();
    }
    if (chartGyroscope != null && chartGyroscope != undefined) {
      chartGyroscope.resize();
    }
    if (chartTof != null && chartTof != undefined) {
      chartTof.resize();
    }
    if (chartMagnetometer != null && chartMagnetometer != undefined) {
      chartMagnetometer.resize();
    }
    if (chartProximity != null && chartProximity != undefined) {
      chartProximity.resize();
    }
  });

  // ############### Time of Flight ###############
  let chartTof = echarts.init(document.getElementById('tof-container'));

  tofOption = {
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
      data: timeStamp(),
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
      data: initChartValue(),
    },
  };

  socket.on('message_from_server', function (data) {
    let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

    let dataJson = JSON.parse(data);
    let tof_val = dataJson.tof;
    let tof_data = tofOption.series.data;
    tof_data.shift();
    tof_data.push(tof_val);

    tofOption.xAxis.data.shift();
    tofOption.xAxis.data.push(axisData);

    chartTof.setOption(tofOption);
    chartTof.resize();
  });

  // ############### Temperature Chart ###############
  let chartTempGraph = echarts.init(
    document.getElementById('temp-chart-container')
  );

  tempChartOption = {
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
      data: timeStamp(),
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
      data: initChartValue(),
    },
  };

  socket.on('message_from_server', function (data) {
    let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

    let dataJson = JSON.parse(data);
    let tempchart_val = dataJson.temp;
    let tempchart_data = tempChartOption.series.data;
    tempchart_data.shift();
    tempchart_data.push(tempchart_val);

    tempChartOption.xAxis.data.shift();
    tempChartOption.xAxis.data.push(axisData);

    chartTempGraph.setOption(tempChartOption);
    chartTempGraph.resize();
  });

  // ############### Temperature Pictural ###############
  let chartTemperature = echarts.init(
    document.getElementById('temperature-container')
  );

  // specify chart configuration item and data
  let symbols = temperatureSVG;

  let bodyMax = 155;
  let bodyMin = -60;

  tempOption = {
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
  chartTemperature.setOption(tempOption);

  socket.on('message_from_server', function (data) {
    let dataJson = JSON.parse(data);
    let temp_val = dataJson.temp;

    chartTemperature.setOption({
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
    chartTemperature.resize();
  });

  // ############### Gyroscope ###############
  let chartGyroscope = echarts.init(document.getElementById('gyr-container'));

  gyrOption = {
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
      data: timeStamp(),
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
        data: initChartValue(),
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
        data: initChartValue(),
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
        data: initChartValue(),
      },
    ],
  };

  socket.on('message_from_server', function (data) {
    let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
    let scaleGyr = 900;

    let dataJson = JSON.parse(data);
    let gyr_data = [dataJson.gyr.x, dataJson.gyr.y, dataJson.gyr.z];

    let gyr_option = [
      gyrOption.series[0].data,
      gyrOption.series[1].data,
      gyrOption.series[2].data,
    ];

    gyr_option[0].shift();
    gyr_option[0].push((gyr_data[0] / scaleGyr).toFixed(2));

    gyr_option[1].shift();
    gyr_option[1].push((gyr_data[1] / scaleGyr).toFixed(2));

    gyr_option[2].shift();
    gyr_option[2].push((gyr_data[2] / scaleGyr).toFixed(2));

    gyrOption.xAxis.data.shift();
    gyrOption.xAxis.data.push(axisData);

    chartGyroscope.setOption(gyrOption);
    chartGyroscope.resize();
  });

  // ############### Magnetometer ###############
  let chartMagnetometer = echarts.init(
    document.getElementById('mag-container')
  );

  magOption = {
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
      data: timeStamp(),
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
        data: initChartValue(),
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
        data: initChartValue(),
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
        data: initChartValue(),
      },
    ],
  };

  socket.on('message_from_server', function (data) {
    let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
    let scaleMag = 16;

    let dataJson = JSON.parse(data);
    let mag_data = [dataJson.mag.x, dataJson.mag.y, dataJson.mag.z];

    let mag_option = [
      magOption.series[0].data,
      magOption.series[1].data,
      magOption.series[2].data,
    ];
    mag_option[0].shift();
    mag_option[0].push((mag_data[0] / scaleMag).toFixed(2));

    mag_option[1].shift();
    mag_option[1].push((mag_data[1] / scaleMag).toFixed(2));

    mag_option[2].shift();
    mag_option[2].push((mag_data[2] / scaleMag).toFixed(2));

    magOption.xAxis.data.shift();
    magOption.xAxis.data.push(axisData);

    chartMagnetometer.setOption(magOption);
    chartMagnetometer.resize();
  });

  // ############### Proximty ###############
  let chartProximity = echarts.init(
    document.getElementById('proxy-container')
  );

  proxyOption = {
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
      data: timeStamp(),
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
      data: initChartValue(),
    },
  };

  socket.on('message_from_server', function (data) {
    // ############### Table ###############
    let dataJson = JSON.parse(data);
    let proxy_data_arr = [
      dataJson.proxy.x,
      dataJson.proxy.x1,
      dataJson.proxy.x2,
      dataJson.proxy.y,
      dataJson.proxy.y1,
      dataJson.proxy.y2,
      dataJson.proxy.fi_x,
      dataJson.proxy.fi_y,
      dataJson.proxy.int,
    ];

    document.getElementById('proxy-x').innerHTML = proxy_data_arr[0];
    document.getElementById('proxy-x1').innerHTML = proxy_data_arr[1];
    document.getElementById('proxy-x2').innerHTML = proxy_data_arr[2];
    document.getElementById('proxy-y').innerHTML = proxy_data_arr[3];
    document.getElementById('proxy-y1').innerHTML = proxy_data_arr[4];
    document.getElementById('proxy-y2').innerHTML = proxy_data_arr[5];
    document.getElementById('proxy-fix').innerHTML = proxy_data_arr[6];
    document.getElementById('proxy-fiy').innerHTML = proxy_data_arr[7];
    document.getElementById('proxy-int').innerHTML = proxy_data_arr[8];

    // ############### Charts ###############
    let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
    let proxy_data = proxyOption.series.data;
    proxy_data.shift();
    proxy_data.push(proxy_data_arr[8]);

    proxyOption.xAxis.data.shift();
    proxyOption.xAxis.data.push(axisData);

    chartProximity.setOption(proxyOption);
    chartProximity.resize();
  });

  // ############### Accelerometer ###############
  // Three.js ray.intersects with offset canvas
  let container,
    camera,
    scene,
    renderer,
    mesh,
    objects = [],
    CANVAS_WIDTH = 170,
    CANVAS_HEIGHT = 170;

  container = document.getElementById('canvas_acc');

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
      let squareSecond = ' m/s&#178';
      let scaleAcc = 1100;
      let scaleAccResult = 100;
      let dataJson = JSON.parse(data);
      let acc_data = [dataJson.acc.x, dataJson.acc.y, dataJson.acc.z];

      mesh.rotation.x = acc_data[0] / scaleAcc;
      mesh.rotation.y = acc_data[1] / scaleAcc;
      mesh.rotation.z = acc_data[2] / scaleAcc;

      renderer.render(scene, camera);

      // ############### Table ###############
      document.getElementById('acc_axis-x').innerHTML =
        'Axis X:' +
        ' ' +
        (acc_data[0] / scaleAccResult).toFixed(2) +
        squareSecond;
      document.getElementById('acc_axis-y').innerHTML =
        'Axis Y:' +
        ' ' +
        (acc_data[1] / scaleAccResult).toFixed(2) +
        squareSecond;
      document.getElementById('acc_axis-z').innerHTML =
        'Axis Z:' +
        ' ' +
        (acc_data[2] / scaleAccResult).toFixed(2) +
        squareSecond;
    });
  }
  render();
});
