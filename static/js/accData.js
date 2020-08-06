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
      acc_y = dataJson.acc.y;
      acc_x = dataJson.acc.x;
      acc_z = dataJson.acc.z;
      document.getElementById('acc_axis-x').innerHTML = 'Axis X' + ' ' + acc_x;
      document.getElementById('acc_axis-y').innerHTML = 'Axis Y' + ' ' + acc_y;
      document.getElementById('acc_axis-z').innerHTML = 'Axis Z' + ' ' + acc_z;

      acc_x_val = acc_x / 2000;
      acc_y_val = acc_y / 2000;
      acc_z_val = acc_z / 2000;

      mesh.rotation.y += acc_y_val / 2000;
      mesh.rotation.x += acc_x_val / 2000;
      mesh.rotation.z += acc_z_val / 2000;

      renderer.render(scene, camera);
    });
  }

  (function animate() {
    requestAnimationFrame(animate);

    render();
  })();
});
