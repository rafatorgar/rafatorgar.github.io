/**
 * STL Viewer using Three.js
 * Allows users to view and interact with 3D STL models
 */

function initSTLViewer(containerId, stlPath, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Container not found:", containerId);
    return;
  }

  // Default options
  const settings = {
    width: options.width || container.clientWidth,
    height: options.height || 400,
    backgroundColor: options.backgroundColor || 0x1a1a1a,
    modelColor: options.modelColor || 0x00a8ff,
    autoRotate: options.autoRotate || false,
    showGrid: options.showGrid !== false, // true by default
  };

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

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight1.position.set(1, 1, 1);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
  directionalLight2.position.set(-1, -1, -1);
  scene.add(directionalLight2);

  // Grid helper
  if (settings.showGrid) {
    const gridHelper = new THREE.GridHelper(200, 20, 0x444444, 0x222222);
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

  loader.load(
    stlPath,
    function (geometry) {
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
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Auto-scale to fit view
      const boundingBox = new THREE.Box3().setFromObject(mesh);
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
    },
    function (xhr) {
      // Progress callback
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log("Cargando: " + Math.round(percentComplete) + "%");
    },
    function (error) {
      console.error("Error cargando STL:", error);
      loadingDiv.innerHTML =
        '<p style="color: #ff4444;">Error al cargar el modelo 3D</p>';
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
  return { scene, camera, renderer, controls, settings, container };
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

  // Remove existing mesh
  const existingMesh = scene.children.find(
    (child) => child instanceof THREE.Mesh && child.geometry,
  );
  if (existingMesh) {
    scene.remove(existingMesh);
    existingMesh.geometry.dispose();
    existingMesh.material.dispose();
  }

  // Show loading indicator
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "stl-loading";
  loadingDiv.innerHTML =
    '<div class="spinner"></div><p>Cargando modelo 3D...</p>';
  container.appendChild(loadingDiv);

  // Load new model
  const loader = new THREE.STLLoader();
  const finalColor =
    modelColor !== undefined ? modelColor : settings.modelColor;

  loader.load(
    stlPath,
    function (geometry) {
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
      const percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log("Cargando: " + Math.round(percentComplete) + "%");
    },
    function (error) {
      console.error("Error cargando STL:", error);
      loadingDiv.innerHTML =
        '<p style="color: #ff4444;">Error al cargar el modelo 3D</p>';
    },
  );
}
