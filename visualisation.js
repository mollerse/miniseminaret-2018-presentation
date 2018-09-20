const THREE = require("three");
const OrbitControls = require("three-orbit-controls")(THREE);
const analyse = require("./soundanalyser.js");
const dat = require("dat.gui");
const midi = require("web-midi");

const knobs = midi("Launch Control", {});
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

let config = {
  cubes: 1,
  offsetFft: 0,
  spreadX: 1,
  spreadY: 1,
  spreadZ: 1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  rotationSpeed: 0,
  scale: 1,
  music: false,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0
};

let controls = {};
let triggers = {};

function initGUI() {
  const gui = new dat.GUI({ closed: true });
  let cubesControl = gui
    .add(config, "cubes", 1, 100, 1)
    .onChange(repositionCubes);
  let offsetFftControl = gui.add(config, "offsetFft", 0, 412, 1);
  let scaleControl = gui
    .add(config, "scale", 1, 5, 0.1)
    .onChange(repositionCubes);
  let spreadXControl = gui
    .add(config, "spreadX", 1, 1000, 1)
    .onChange(repositionCubes);
  let spreadYControl = gui
    .add(config, "spreadY", 1, 1000, 1)
    .onChange(repositionCubes);
  let spreadZControl = gui
    .add(config, "spreadZ", 1, 100, 0.5)
    .onChange(repositionCubes);
  let rotationXControl = gui
    .add(config, "rotationX", 0, 2 * Math.PI, Math.PI / 10)
    .onChange(repositionCubes);
  let rotationYControl = gui
    .add(config, "rotationY", 0, 2 * Math.PI, Math.PI / 10)
    .onChange(repositionCubes);
  let rotationZControl = gui
    .add(config, "rotationZ", 0, 2 * Math.PI, Math.PI / 10)
    .onChange(repositionCubes);
  let rotationSpeedControl = gui.add(config, "rotationSpeed", 0, 1, 0.1);
  let musicControl = gui.add(config, "music").onChange(musicOnOff);

  let cameraXControl = gui.add(config, "cameraX").onChange(repositionCamera);
  let cameraYControl = gui.add(config, "cameraY").onChange(repositionCamera);
  let cameraZControl = gui.add(config, "cameraZ").onChange(repositionCamera);

  triggers["9"] = () => musicControl.setValue(!musicControl.getValue());

  controls["21"] = v => cubesControl.setValue(1 + 100 * v);
  controls["22"] = v => offsetFftControl.setValue(412 * v);
  controls["23"] = v => scaleControl.setValue(1 + 5 * v);
  controls["24"] = v => spreadXControl.setValue(1 + 1000 * v);
  controls["25"] = v => spreadYControl.setValue(1 + 1000 * v);
  controls["26"] = v => spreadZControl.setValue(1 + 100 * v);
  controls["41"] = v => rotationXControl.setValue(Math.PI * 2 * v);
  controls["42"] = v => rotationYControl.setValue(Math.PI * 2 * v);
  controls["43"] = v => rotationZControl.setValue(Math.PI * 2 * v);
  controls["44"] = v => rotationSpeedControl.setValue(v);

  controls["45"] = v => cameraXControl.setValue(-100 + 200 * v);
  controls["46"] = v => cameraYControl.setValue(-100 + 200 * v);
  controls["47"] = v => cameraZControl.setValue(100 * v);
}
knobs.on("data", function([event, knobId, value]) {
  if (event === 176) {
    const control = controls[knobId];
    if (control) {
      control(normalise(0, 127, value), event);
    }
  } else if (event === 144) {
    const trigger = triggers[knobId];
    if (trigger) {
      trigger(value);
    }
  }
});

let scene, camera, renderer, cubes, analyser, soundLevel, cameraControls, audio;

function init(canvas) {
  scene = new THREE.Scene();

  initCubes();
  repositionCubes();
  initCamera();
  initRenderer(canvas);
  initGUI();

  renderer.render(scene, camera);

  audio = new Audio();
  audio.src = "/song.mp3";
  audio.loop = true;
}

function repositionCamera() {
  camera.position.set(config.cameraX, config.cameraY, config.cameraZ);
  cameraControls.update();
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 10000);
  camera.position.set(config.cameraX, config.cameraY, config.cameraZ);

  cameraControls = new OrbitControls(camera);
}

function initRenderer(canvas) {
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setClearColor(0x333333);
}

function random2(min, max) {
  return min + (max - min) * Math.random();
}

function random2i(min, max) {
  return random2(min, max);
}

function initCubes() {
  cubes = Array(100)
    .fill()
    .map(function() {
      let cube = new THREE.Mesh(
        new THREE.CubeGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()
      );
      let userData = {
        x0: random2(-0.2, 0.2),
        y0: random2(-0.2, 0.2),
        z0: random2(-0.2, 0.2),
        rx0: random2(-0.1, 0.1),
        ry0: random2(-0.1, 0.1),
        rz0: random2(-0.1, 0.1),
        s0: random2(-0.2, 0.2)
      };

      let { x0, y0, z0 } = userData;

      cube.userData = userData;
      cube.position.set(x0, y0, z0);
      cube.scale.set(2 * config.scale, 2 * config.scale, 2 * config.scale);

      return cube;
    });
}

function repositionCubes() {
  let visibleCubes = cubes.slice(0, config.cubes);
  let invisibleCubes = cubes.slice(config.cubes);

  invisibleCubes.forEach(
    c => scene.children.indexOf(c) > -1 && scene.remove(c)
  );
  visibleCubes.forEach(c => scene.children.indexOf(c) > -1 || scene.add(c));

  cubes.forEach(function(c) {
    let { x0, y0, z0, rx0, ry0, rz0 } = c.userData;
    c.position.set(
      config.spreadX * x0,
      config.spreadY * y0,
      config.spreadZ * z0
    );
    c.rotation.set(
      config.rotationX * rx0,
      config.rotationY * ry0,
      config.rotationZ * rz0
    );
  });
}

function normalise(min, max, v) {
  return (v - min) / max;
}

function makeCubesDance() {
  let min = 0;
  let max = 255;
  let frequencies = analyser.frequencies();

  cubes.forEach(function(c, i) {
    let f =
      (1 + 5 * normalise(min, max, frequencies[i + config.offsetFft])) *
      config.scale;
    if (config.music) c.scale.set(f, f, f);

    let { x, y, z } = c.rotation;
    let { s0 } = c.userData;
    let displacement = s0 * config.rotationSpeed * (Math.PI / 100);
    c.rotation.set(x + displacement, y + displacement, z + displacement);
  });
}

function render() {
  requestAnimationFrame(render);
  makeCubesDance();
  renderer.render(scene, camera);
}

export default function start(canvas) {
  init(canvas);
  analyse(audio, { fftSize: Math.pow(2, 10) }, function(a) {
    analyser = a;
    render();
  });
}

function musicOnOff(on) {
  if (on) {
    audio.play();
  } else {
    audio.pause();
  }
}
