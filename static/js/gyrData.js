$(document).ready(function () {
  var socket;

  socket = io.connect({ forceNew: true });

  // Three.js ray.intersects with offset canvas

  var container,
    camera,
    scene,
    renderer,
    mesh,
    objects = [],
    CANVAS_WIDTH = 180,
    CANVAS_HEIGHT = 180;

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
      gyr_y = dataJson.gyr.y;
      gyr_x = dataJson.gyr.x;
      gyr_z = dataJson.gyr.z;
      document.getElementById('gyr_axis-x').innerHTML = 'Axis X' + ' ' + gyr_x;
      document.getElementById('gyr_axis-y').innerHTML = 'Axis Y' + ' ' + gyr_y;
      document.getElementById('gyr_axis-z').innerHTML = 'Axis Z' + ' ' + gyr_z;

      gyr_x_val = gyr_x / 1000;
      gyr_y_val = gyr_y / 1000;
      gyr_z_val = gyr_z / 1000;

      mesh.rotation.y += gyr_y_val / 1000;
      mesh.rotation.x += gyr_x_val / 1000;
      mesh.rotation.z += gyr_z_val / 1000;

      renderer.render(scene, camera);
    });
  }

  (function animate() {
    requestAnimationFrame(animate);

    render();
  })();
});
