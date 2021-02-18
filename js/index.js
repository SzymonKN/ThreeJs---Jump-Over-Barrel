/* Źródła
 * Wall Texture : https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f0ad962e-f108-4eab-8fdc-98011f434637/d1zw3lg-5c4d65b6-67b7-4a17-a56e-5eb40e0c98aa.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjBhZDk2MmUtZjEwOC00ZWFiLThmZGMtOTgwMTFmNDM0NjM3XC9kMXp3M2xnLTVjNGQ2NWI2LTY3YjctNGExNy1hNTZlLTVlYjQwZTBjOThhYS5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.EmAgt-9I7eF3AUDI-__foQ-Gn1UX-M0J5ies2V8GG8w
 * Floor Texture: https://www.textures.com/system/gallery/photos/Metal/Floors/Bare/60610/MetalFloorsBare0036_1_download600.jpg
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * */


function onLoad() {
    THREE.ImageUtils.crossOrigin = "";
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var scene = new THREE.Scene();


    var leftViewCamera = new THREE.PerspectiveCamera(
        65, // kąt patrzenia kamery (FOV - field of view)
        window.innerWidth / window.innerHeight, // proporcje widoku
        0.1, // min renderowana odległość
        10000 // max renderowana odległość
    );
    var rightViewCamera = new THREE.PerspectiveCamera(
        35, // kąt patrzenia kamery (FOV - field of view)
        window.innerWidth / window.innerHeight, // proporcje widoku
        0.1, // min renderowana odległość
        16000 // max renderowana odległość
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.shadowMapEnabled = true;
    //renderer.shadowMapType = THREE.BasicShadowMap;
    document.getElementById("content").appendChild(renderer.domElement);
    var floorMaterial = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture('img/floor.jpg')

    });


    var wallMaterial = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture('img/sewer_wall.jpg')

    });

    var ceilingMaterial = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: THREE.ImageUtils.loadTexture('img/sewer_wall.jpg')

    });

    //Sewer Build
    
        //Floor
        var floor_geometry = new THREE.PlaneBufferGeometry(16384, 1024);
        var mesh = new THREE.Mesh(floor_geometry, floorMaterial);
        mesh.rotateX(1.57);
        mesh.material.map.repeat.set(64, 4); 
        mesh.material.map.wrapS = mesh.material.map.wrapT = THREE.RepeatWrapping; 
        //mesh.receiveShadow = true;
        scene.add(mesh);


        //Walls
        var wall_geometry = new THREE.PlaneBufferGeometry(16384, 256);


        var wall_mesh_right = new THREE.Mesh(wall_geometry, wallMaterial);
        wall_mesh_right.position.z = 512;
        wall_mesh_right.position.y = 128;
        wall_mesh_right.material.map.repeat.set(32, 1)
        wall_mesh_right.material.map.wrapS = wall_mesh_right.material.map.wrapT = THREE.RepeatWrapping;

        var wall_mesh_left = new THREE.Mesh(wall_geometry, wallMaterial);
        wall_mesh_left.position.z = -512;
        wall_mesh_left.position.y = 128;
        wall_mesh_left.material.map.repeat.set(32, 1)
        wall_mesh_left.material.map.wrapS = wall_mesh_right.material.map.wrapT = THREE.RepeatWrapping;
        scene.add(wall_mesh_right);
        scene.add(wall_mesh_left);

        //Ceiling
        var ceiling_geometry = new THREE.CylinderGeometry(512, 512, 16384, 32, 32, true, 0, Math.PI);
        var ceiling_mesh = new THREE.Mesh(ceiling_geometry, ceilingMaterial);
        ceiling_mesh.rotateZ(1.57);
        ceiling_mesh.material.map.repeat.set(16, 48)
        ceiling_mesh.material.map.wrapS = ceiling_mesh.material.map.wrapT = THREE.RepeatWrapping;
        ceiling_mesh.position.y = 250;

        scene.add(ceiling_mesh);




//+++++++++++++++          Barrel Model Loader         ++++++++++++++++++++++++

    //diffuse = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/25480/Misc_WoodBarrelOldMold_2k_d.jpg");
    //specular = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/25480/Misc_WoodBarrelOldMold_2k_s.jpg");
    //normal = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/25480/Misc_WoodBarrelOldMold_2k_n.jpg");

    var diffuse = THREE.ImageUtils.loadTexture("img/barrel.jpg");

    var barrel_material = new THREE.MeshPhongMaterial({
        map: diffuse,
        specular: 0xffffff,
        shininess: 5
    });

    var barrel_mesh;
    var loader = new THREE.JSONLoader();
    loader.load(
        "js/barrel.js", function (geometry_barrel) {
            barrel_mesh = new THREE.MorphAnimMesh(geometry_barrel, barrel_material);    
            barrel_mesh.rotateX(1.57);
            barrel_mesh.scale.set(75, 100, 75);
           // scene.add(barrel_mesh);
        });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//----------------          Barrel Spawning System          ------------------
    var barrelsTab = [];
    setInterval(function () {
        var new_barrel = barrel_mesh.clone();
        var z = Math.random() * (1024-128 )- 512+64;
        new_barrel.position.set(8200, 20, z);
        barrelsTab.push(new_barrel);
        scene.add(new_barrel);
    }, 500);

    function rotateBarrels(item) {
        if (item.position.x >= -8000) {
            item.rotation.y += 0.03;
            item.position.x -= 20;

            if (item.position.distanceTo(skeletonModel.position) < 90) {
             //   console.log("DEAD");
                window.alert("Słabo skaczesz... Jesteś martwy!");
                skeletonModel.position.x = -8000;
                while (barrelsTab.length > 0) {
                    scene.remove(barrelsTab.pop());
                    
                }
               // location.reload();
            }
            
        }
        else {
            scene.remove(item);
            barrelsTab.shift();
        }
    }


//----------------------------------------------------------------------------


    rightViewCamera.position.x = 8000;
    rightViewCamera.position.y = 200;
    rightViewCamera.position.z = 0;

    var clock = new THREE.Clock();


//************          Skeleton Model Loader       ***************
    var skeletonModel;
    var skeletalMaterial;
    var animationTab = [];
    var loader = new THREE.JSONLoader();
    loader.load('js/tris.js', function (geometry, mat) {
        geometry.computeMorphNormals();

        //mat.morphNormals = true;

        skeletalMaterial = new THREE.MeshPhongMaterial(
            {
                map: THREE.ImageUtils.loadTexture("img/szkiel.png"),
                morphTargets: true, //konieczne do animacji
                morphNormals: true, //konieczne animacji
                specular: 0xffffff,
                shininess: 20,
                shading: THREE.SmoothShading,
                vertexColors: THREE.FaceColors
            });

        //mesh dla modelu musi być typu MorphAnimMesh

        skeletonModel = new THREE.MorphAnimMesh(geometry, skeletalMaterial);
        skeletonModel.name = "name";
        skeletonModel.rotation.y = 3.14; 
        skeletonModel.position.y = 80; 
        skeletonModel.position.x = -8000;
        skeletonModel.scale.set(3, 3, 3); 
        skeletonModel.castShadow = true;


        scene.add(skeletonModel);
        skeletonModel.parseAnimations();
        for (var key in skeletonModel.geometry.animations) {

            if (key === 'length' || !skeletonModel.geometry.animations.hasOwnProperty(key)) continue;
            animationTab.push(key);
         
        }

        skeletonModel.playAnimation(animationTab[1], 60);


    });
//*****************************************************************


    leftViewCamera.lookAt(mesh.position);
    rightViewCamera.lookAt(mesh.position);



//#############         Lights         ###############
    {

        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);

        var first_lamp = new CeilingLight(-8000, 450, scene);
        new CeilingLight(-7000, 450, scene);
        new CeilingLight(-6000, 450, scene);
        new CeilingLight(-5000, 450, scene);
        new CeilingLight(-4000, 450, scene);
        new CeilingLight(-3000, 450, scene);
        new CeilingLight(-2000, 450, scene);
        new CeilingLight(-1000, 450, scene);
        new CeilingLight(0, 450, scene);
        new CeilingLight(1000, 450, scene);
        new CeilingLight(2000, 450, scene);
        new CeilingLight(3000, 450, scene);
        new CeilingLight(4000, 450, scene);
        new CeilingLight(5000, 450, scene);
        new CeilingLight(6000, 450, scene);
        new CeilingLight(7000, 450, scene);
        new CeilingLight(8000, 450, scene);
    }
//#################################################


    var isForwardKeyPressed;
    var isLeftKeyPressed;
    var isRightKeyPressed;
    var isJumpKeyPressed;
    const jumpingTime = 0.014 * 3000;
    var timer_for_jumping = 0;
    var jumping_already_executing = false;

    document.addEventListener("keydown", function () {
      //  console.log(event.which);
        if (event.which == 87) {

            isForwardKeyPressed = true;
            if (timer_for_jumping <= 0)
                skeletonModel.playAnimation(animationTab[1], 3);
          
        }
        if (event.which == 65) {

            isLeftKeyPressed = true;
        }
        if (event.which == 68) {

            isRightKeyPressed = true;
        }
        if (event.which == 32 && timer_for_jumping <= 0) {

            isJumpKeyPressed = true;
            skeletonModel.playAnimation(animationTab[4], 2);
            timer_for_jumping = 0.014 * 3000;
      
            jumping_already_executing = true;
        }
       
    })

    document.addEventListener("keyup", function () {
        // "W"
        if (event.which == 87) {
            isForwardKeyPressed = false;
            
        }
        //"A"
        if (event.which == 65) {

            isLeftKeyPressed = false;
        }
        //"D"
        if (event.which == 68) {

            isRightKeyPressed = false;
        }
        //"Space"
        if (event.which == 32) {
            isJumpKeyPressed = false;
        }

    })






    function animateScene() {
        requestAnimationFrame(animateScene);

        if (timer_for_jumping > 0) {
            timer_for_jumping--;
            if (timer_for_jumping >= jumpingTime / 2) {
                skeletonModel.position.y += 4;
            } else {
                skeletonModel.position.y -= 4;
            }
         
        }
        if (barrelsTab != null) {
            barrelsTab.forEach(rotateBarrels);
        }


        var delta = clock.getDelta(); 

        if (skeletonModel != null) {

 //++++++++++++              Control          ++++++++++++++
            if (isForwardKeyPressed == true) {

                if (jumping_already_executing && timer_for_jumping <= 0) {
                    skeletonModel.playAnimation(animationTab[1], 3);
                    // skeletonModel.updateAnimation(delta * 2000);
                    jumping_already_executing = false;
                }
                if (!jumping_already_executing) {
                    skeletonModel.updateAnimation(delta * 2000);
                }

                skeletonModel.translateX(-16);
            }
            if (isLeftKeyPressed == true) {
                skeletonModel.rotation.y += 0.05;
            }
            if (isRightKeyPressed == true) {
                skeletonModel.rotation.y -= 0.05;
            }
            if (isJumpKeyPressed || timer_for_jumping > 0) {
                skeletonModel.updateAnimation(delta * 3000);
            }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//-------               Collisions with Walls           ----------
            if (skeletonModel.position.z <= wall_mesh_left.position.z + 50) {
                skeletonModel.position.z = wall_mesh_left.position.z + 50;
            }
            if (skeletonModel.position.z >= wall_mesh_right.position.z - 50) {
                skeletonModel.position.z = wall_mesh_right.position.z - 50;
            }
            if (skeletonModel.position.x > 8000) {
                alert("Gratuluję! Wygrałeś... NIC :D")
                location.reload();
            }
            if (skeletonModel.position.x <= -8000) {
                skeletonModel.position.x = -8000;
            }
//----------------------------------------------------------------


            leftViewCamera.aspect = windowWidth / windowHeight;
            rightViewCamera.aspect = windowWidth / windowHeight;

            leftViewCamera.updateProjectionMatrix();
            rightViewCamera.updateProjectionMatrix();

            renderer.setViewport(0, 0, windowWidth / 2, windowHeight);
            renderer.render(scene, leftViewCamera);

            renderer.setViewport(windowWidth / 2, 0, windowWidth / 2, windowHeight);
            renderer.render(scene, rightViewCamera);


            var camVect = new THREE.Vector3(150, 10, 0);
            var camPos = camVect.applyMatrix4(skeletonModel.matrixWorld);

            leftViewCamera.position.x = camPos.x;
            leftViewCamera.position.y = camPos.y + 125 ;
            leftViewCamera.position.z = camPos.z;

            leftViewCamera.lookAt(skeletonModel.position);
            rightViewCamera.lookAt(barrel_mesh.position);
        }
    }

    animateScene();
}


