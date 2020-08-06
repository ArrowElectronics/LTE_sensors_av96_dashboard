$(document).ready(function () {
  var container = document.getElementById('proxy-container');

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(320, 240);
  container.append(renderer.domElement);

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(45, 320 / 240, 0.1, 1000);
  camera.position = new THREE.Vector3(350, 350, 350);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  var cube = new THREE.Mesh(
    new THREE.CubeGeometry(100, 100, 100),
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  scene.add(cube);

  var pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.y = 150;
  pointLight.position.z = 200;
  scene.add(pointLight);

  requestAnimationFrame(render);

  var fov = camera.fov,
    zoom = 1.0,
    inc = -0.01;

  function render() {
    requestAnimationFrame(render);

    camera.fov = fov * zoom;
    camera.updateProjectionMatrix();

    zoom += inc;
    if (zoom <= 0.2 || zoom >= 1.0) {
      inc = -inc;
    }

    renderer.render(scene, camera);
  }
});
