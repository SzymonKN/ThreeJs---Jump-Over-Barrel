function CeilingLight(positionX,positionY,scene) {

    var bulb_geometry = new THREE.SphereGeometry(10, 10, 10);
    var bulb_material = new THREE.MeshBasicMaterial({
        color: 0xf4f5d5,
        side: THREE.DoubleSide,
        wireframe: false
    });
    var bulb = new THREE.Mesh(bulb_geometry, bulb_material);
    var lamp = new THREE.Object3D();

    var lamp_geometry = new THREE.CylinderGeometry(16, 96, 128, 16, 16, true, 0, 2*3.14);
    var lampMaterial = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
       // map: THREE.ImageUtils.loadTexture('img/floor.jpg')
        color: 0x6f6767,
        wireframe: false,
        shiness: 10

    });
    var lamp_mesh = new THREE.Mesh(lamp_geometry, lampMaterial);
    //lamp_mesh.material.map.repeat.set(4, 2);
   // lamp_mesh.material.map.wrapS = lamp_mesh.material.map.wrapT = THREE.RepeatWrapping;
    lamp_mesh.position.set(positionX, positionY + 15, 0);


    var cable_geometry = new THREE.CylinderGeometry(8, 8, 256, 8, 8, false, 0, 2 * 3.14);
    var cable_material = new THREE.MeshBasicMaterial({
        color: 0x4d4d4d, side: THREE.DoubleSide, wireframe: false
    });
    var cable_mesh = new THREE.Mesh(cable_geometry, lampMaterial);
    cable_mesh.position.set(positionX, positionY+128, 0);



    bulb.position.set(positionX, positionY, 0);
    lamp.add(lamp_mesh);
    lamp.add(cable_mesh);
    lamp.add(bulb);

    function init() {
     
        var light1 = new THREE.SpotLight(0x66ff66, 3, 0, Math.PI/2);
        light1.castShadow=true;
             
        scene.add(light1);
        scene.add(light1.target);
        light1.position.set(positionX, positionY, 0);
        light1.target.position.x = positionX;
        light1.target.position.y = 0;
        light1.target.position.z = 0;
        scene.add(lamp);

        
    }

    init();

}