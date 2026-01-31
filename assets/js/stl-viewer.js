/**
 * STL Viewer using Three.js
 * Allows users to view and interact with 3D STL models
 */

function initSTLViewer(containerId, stlPath, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Container not found:", containerId);
    return null;
  }

  // Default options
  const settings = {
    width: options.width || container.clientWidth,
    height: options.height || 400,
    backgroundColor: options.backgroundColor || 0x2a2a2a,
    modelColor: options.modelColor || 0x00a8ff,
    autoRotate: options.autoRotate || false,
    showGrid: options.showGrid !== false, // true by default
  };

  console.log("Initializing STL Viewer:", { containerId, stlPath, settings });

  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(settings.backgroundColor);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    75,
    settings.width / settings.height,
    0.1,
    1000,
  );
  camera.position.z = 100;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(settings.width, settings.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  console.log("Renderer size:", settings.width, "x", settings.height);
  console.log(
    "Container size:",
    container.clientWidth,
    "x",
    container.clientHeight,
  );

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight1.position.set(1, 1, 1);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight2.position.set(-1, -1, -1);
  scene.add(directionalLight2);

  // Grid helper
  if (settings.showGrid) {
    const gridHelper = new THREE.GridHelper(200, 20, 0x666666, 0x333333);
    scene.add(gridHelper);
  }

  // Controls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = settings.autoRotate;
  controls.autoRotateSpeed = 2.0;

  // Load STL
  const loader = new THREE.STLLoader();

  // Loading indicator
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "stl-loading";
  loadingDiv.innerHTML =
    '<div class="spinner"></div><p>Cargando modelo 3D...</p>';
  container.appendChild(loadingDiv);

  // Store current mesh reference
  let currentMesh = null;

  loader.load(
    stlPath,
    function (geometry) {
      console.log("STL geometry loaded successfully");

      // Remove loading indicator
      loadingDiv.remove();

      // Center geometry
      geometry.center();

      // Create material
      const material = new THREE.MeshPhongMaterial({
        color: settings.modelColor,
        specular: 0x111111,
        shininess: 200,
      });

      // Create mesh
      currentMesh = new THREE.Mesh(geometry, material);
      scene.add(currentMesh);

      // Auto-scale to fit view
      const boundingBox = new THREE.Box3().setFromObject(currentMesh);
      const size = boundingBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / Math.sin(fov / 2)) * 1.5;
      camera.position.z = cameraZ;
      camera.updateProjectionMatrix();

      // Update controls target
      const center = boundingBox.getCenter(new THREE.Vector3());
      controls.target.copy(center);
      controls.update();

      console.log("Model rendered successfully");
    },
    function (xhr) {
      // Progress callback
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log("Loading progress: " + Math.round(percentComplete) + "%");
      }
    },
    function (error) {
      console.error("Error loading STL:", error);
      console.error("Attempted path:", stlPath);
      loadingDiv.innerHTML =
        '<p style="color: #ff4444; padding: 20px; text-align: center;">❌ Error al cargar el modelo 3D<br><small style="font-size: 0.8em;">Ruta: ' +
        stlPath +
        "</small></p>";
    },
  );

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  window.addEventListener("resize", function () {
    const newWidth = container.clientWidth;
    camera.aspect = newWidth / settings.height;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, settings.height);
  });

  // Return controls for external manipulation if needed
  return {
    scene,
    camera,
    renderer,
    controls,
    settings,
    container,
    getCurrentMesh: () => currentMesh,
  };
}

/**
 * Load a new STL model into an existing viewer
 * @param {Object} viewerInstance - The viewer instance returned by initSTLViewer
 * @param {String} stlPath - Path to the new STL file
 * @param {Number} modelColor - Color of the model (optional)
 */
function loadNewModel(viewerInstance, stlPath, modelColor) {
  if (!viewerInstance || !viewerInstance.scene) {
    console.error("Invalid viewer instance");
    return;
  }

  const { scene, camera, controls, settings, container } = viewerInstance;

  console.log("Loading new model:", stlPath);

  // Remove existing mesh
  const currentMesh = viewerInstance.getCurrentMesh();
  if (currentMesh) {
    scene.remove(currentMesh);
    if (currentMesh.geometry) currentMesh.geometry.dispose();
    if (currentMesh.material) currentMesh.material.dispose();
  }

  // Show loading indicator
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "stl-loading";
  loadingDiv.innerHTML =
    '<div class="spinner"></div><p>Cargando nuevo modelo...</p>';
  container.appendChild(loadingDiv);

  // Load new model
  const loader = new THREE.STLLoader();
  const finalColor =
    modelColor !== undefined ? modelColor : settings.modelColor;

  loader.load(
    stlPath,
    function (geometry) {
      console.log("New model loaded successfully");

      // Remove loading indicator
      loadingDiv.remove();

      // Center geometry
      geometry.center();

      // Create material
      const material = new THREE.MeshPhongMaterial({
        color: finalColor,
        specular: 0x111111,
        shininess: 200,
      });

      // Create mesh
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Update the current mesh reference
      viewerInstance.getCurrentMesh = () => mesh;

      // Auto-scale to fit view
      const boundingBox = new THREE.Box3().setFromObject(mesh);
      const size = boundingBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / Math.sin(fov / 2)) * 1.5;
      camera.position.set(0, 0, cameraZ);
      camera.updateProjectionMatrix();

      // Update controls target
      const center = boundingBox.getCenter(new THREE.Vector3());
      controls.target.copy(center);
      controls.update();
    },
    function (xhr) {
      // Progress callback
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log("Loading progress: " + Math.round(percentComplete) + "%");
      }
    },
    function (error) {
      console.error("Error loading new STL:", error);
      console.error("Attempted path:", stlPath);
      loadingDiv.innerHTML =
        '<p style="color: #ff4444; padding: 20px; text-align: center;">❌ Error al cargar el modelo 3D<br><small style="font-size: 0.8em;">Ruta: ' +
        stlPath +
        "</small></p>";
    },
  );
}
