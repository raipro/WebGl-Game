// const { moveMessagePortToContext } = require("worker_threads");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / (0.9*window.innerHeight), 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, 0.9*window.innerHeight );
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
                        // scene.add( cube );
      
renderer.setClearColor("#000000")
camera.position.set(0,5,20)
camera.lookAt(new THREE.Vector3(0,0,0));
const xAxis = new THREE.Vector3(1, 0, 0);
const yAxis = new THREE.Vector3(0, 1, 0);
const zAxis = new THREE.Vector3(0, 0, 1);						
var ambientLight = new THREE.AmbientLight (0xdddddd,1 )
scene.add( ambientLight )

var missilelist = []
var plane;
var starlist = []
var emissilelist = []
var health1 = 120
var score1 = 0
estatus = 1
estatus2 = 1
ehp = 2
ehp2 = 2
gover = 0

let loader1 = new THREE.FontLoader();
loader1.load('arial.json', function (res) {
  font = res;
  createText();
});
function createText() {
  textGeo = new THREE.TextGeometry( "Hello", {
    font: font,
    size: 40,
    height: 6
});
textGeo.position.y = 10
scene.add(textGeo)
}



window.addEventListener( 'resize', () => {
	let width = window.innerWidth
	let height = window.innerHeight*0.9
	renderer.setSize( width, height )
	camera.aspect = width / height
	camera.updateProjectionMatrix()
})
// function pmove()
// {

// }
let loader = new THREE.GLTFLoader();
loader.load('./player.gltf',function(gltf){
  plane = gltf.scene;
  // plane.rotateOnWorldAxis(yAxis, THREE.Math.degToRad(180));
   //plane.rotateOnWorldAxis(zAxis, THREE.Math.degToRad(10));
  // plane.rotateOnWorldAxis(xAxis, THREE.Math.degToRad(180));
  plane.scale.set(0.3,0.3,0.3)
  plane.position.z = 13
  plane.position.y = 0
  plane.position.x = 0
  // plane.rotation.x = -3.14/2
  scene.add(plane);
});


addEventListener('keydown', movement);
function movement(e){
  if(e.keyCode==65 && plane.position.x>=-25){
    plane.position.x-=0.25
  // camera.updateProjectionMatrix()
  }
  if(e.keyCode==68 && plane.position.x<=25){
    plane.position.x+=0.25
    // camera.updateProjectionMatrix()
  }
  if(e.keyCode==81){
    plane.position.z-=0.25
    // camera.updateProjectionMatrix()
  }
  if(e.keyCode==69){
    plane.position.z+=0.25
    // camera.updateProjectionMatrix()
  }
  if(e.keyCode==82){
    loader.load('./missile.gltf',function(gltf){
      missile = gltf.scene;
      // plane.rotateOnWorldAxis(yAxis, THREE.Math.degToRad(180));
       //plane.rotateOnWorldAxis(zAxis, THREE.Math.degToRad(10));
      missile.rotateOnWorldAxis(xAxis, THREE.Math.degToRad(180));
      missile.scale.set(0.05,0.05,0.05)
      missile.position.z = plane.position.z
      missile.position.y = plane.position.y + 0.2
      missile.position.x = plane.position.x - 0.8
      missile.rotation.x = 3.14/2
      missile.rotation.y = -3.14
      scene.add(missile);
      missilelist.push(missile) 
    
    });
    loader.load('./missile.gltf',function(gltf){
      missile1 = gltf.scene;
      // plane.rotateOnWorldAxis(yAxis, THREE.Math.degToRad(180));
       //plane.rotateOnWorldAxis(zAxis, THREE.Math.degToRad(10));
      missile1.rotateOnWorldAxis(xAxis, THREE.Math.degToRad(180));
      missile1.scale.set(0.05,0.05,0.05)
      missile1.position.z = plane.position.z
      missile1.position.y = plane.position.y + 0.2
      missile1.position.x = plane.position.x + 0.8
       missile1.rotation.x = 3.14/2
      missile1.rotation.y = -3.14
      scene.add(missile1);
      missilelist.push(missile1)  

    });

  }
  
}

ctr = 1
arr = []
arr1 = []
arr2 = []
for(i=-10;i<=10;i++)
{
  arr.push(i) 
}
arr3 = [1,3,5]
arr4 = [4,6,7]

loader.load('./enemy.gltf',function(gltf){
  enemy = gltf.scene;
  // enemy.rotateOnWorldAxis(xAxis, THREE.Math.degToRad(90));
  enemy.scale.set(0.3,0.3,0.3)
  enemy.position.z = 1
  enemy.position.y = 0
  enemy.position.x = 4
  // star.rotation.x
  // star.rotation.y = -3.14
  scene.add(enemy);
  // starlist.push(star) 
});

loader.load('./enemy2.gltf',function(gltf){
  enemy2 = gltf.scene;
  // enemy.rotateOnWorldAxis(xAxis, THREE.Math.degToRad(90));
  enemy2.scale.set(0.3,0.3,0.3)
  enemy2.position.z = 7
  enemy2.position.y = 0
  enemy2.position.x = 4
  // star.rotation.x
  // star.rotation.y = -3.14
  scene.add(enemy2);
  // starlist.push(star) 
});

md = 1

function Collisions(){
planez = plane.position.z + 0.15
planex = plane.position.x - 1
planex1 = plane.position.x + 1

for(i=0;i<starlist.length;i++)
{  
  if(starlist[i].position.x >= planex && starlist[i].position.x <= planex1 && starlist[i].position.z >= plane.position.z && starlist[i].position.z <= planez  )
  {
    scene.remove(starlist[i])
    score1 += 10
  } 
}

for(i = 0;i<emissilelist.length;i++)
{
  if(emissilelist[i].position.x >= planex && emissilelist[i].position.x <= planex1 && emissilelist[i].position.z >= plane.position.z && emissilelist[i].position.z <= planez  )
  {
    scene.remove(emissilelist[i])
    health1 -= 10
  } 
}

for(i=0;i<missilelist.length;i++)
{
  if(missilelist[i].position.x >= enemy.position.x - 0.6 && missilelist[i].position.x <= enemy.position.x + 0.6 && missilelist[i].position.z >= enemy.position.z && missilelist[i].position.z <= enemy.position.z + 0.15 && estatus == 1)
  {
    scene.remove(missilelist[i])
    ehp = ehp - 1
    if(ehp == 0)
    {
      scene.remove(enemy)
      estatus = 0
    }
  } 

  if(missilelist[i].position.x >= enemy2.position.x - 0.6 && missilelist[i].position.x <= enemy2.position.x + 0.6 && missilelist[i].position.z >= enemy2.position.z && missilelist[i].position.z <= enemy2.position.z + 0.15 && estatus2 == 1)
  {
    scene.remove(missilelist[i])
    ehp2 = ehp2 - 1
    if(ehp2 == 0)
    {
      scene.remove(enemy2)
      estatus2 = 0
    }
  } 
}


}



const animate = function () 
{
if(gover == 0)
{  
requestAnimationFrame( animate );
for(i = 0;i<3;i++)
{
  arr1[i] = plane.position.z - 13 + arr3[i]
  arr2[i] = plane.position.z - 13 + arr4[i]
}
if(enemy.position.x < 8)
{
  enemy.position.x += md*0.1
  if ((enemy.position.x - 0.1) < -8)
  {
    md = 1
  }
}
else
{ 
  md = -1
}


if(ctr % 50 == 0)
{
  if(estatus == 1)
  {  
    loader.load('./emissile.gltf',function(gltf){
      emissile1 = gltf.scene;
      // enemy.rotateOnWorldAxis(xAxis, THREE.Math.degToRad(90));
      emissile1.scale.set(0.15,0.15,0.15)
      emissile1.position.z = enemy.position.z + 0.6
      emissile1.position.y = enemy.position.y
      emissile1.position.x = enemy.position.x 
      // star.rotation.x
      // star.rotation.y = -3.14
      scene.add(emissile1);
      // starlist.push(star)
      emissilelist.push(emissile1) 
    });
  } 
  if(estatus2 == 1)
  {
    loader.load('./emissile.gltf',function(gltf){
      emissile = gltf.scene;
      // enemy.rotateOnWorldAxis(xAxis, THREE.Math.degToRad(90));
      emissile.scale.set(0.15,0.15,0.15)
      emissile.position.z = enemy2.position.z + 0.6
      emissile.position.y = enemy2.position.y
      emissile.position.x = enemy2.position.x
      // star.rotation.x
      // star.rotation.y = -3.14
      scene.add(emissile);
      // starlist.push(star)
      emissilelist.push(emissile) 
    });
  }

  enemy.position.x = arr[Math.floor(Math.random() * arr.length)];
  enemy2.position.x = arr[Math.floor(Math.random() * arr.length)];
  enemy.position.z = arr1[Math.floor(Math.random() * arr1.length)];
  enemy2.position.z = arr2[Math.floor(Math.random() * arr2.length)];
  loader.load('./star3.gltf',function(gltf){
    star = gltf.scene;
    // plane.rotateOnWorldAxis(yAxis, THREE.Math.degToRad(180));
     //plane.rotateOnWorldAxis(zAxis, THREE.Math.degToRad(10));
    star.rotateOnWorldAxis(xAxis, THREE.Math.degToRad(90));
    star.scale.set(0.1,0.1,0.1)
    star.position.z = 0
    star.position.y = 0
    star.position.x = arr[Math.floor(Math.random() * arr.length)];
    // star.rotation.x
    // star.rotation.y = -3.14
    scene.add(star);
    starlist.push(star) 
  }); 
}

for(i=0;i<missilelist.length;i++)
{
  missilelist[i].position.z -= 0.1
}  
for(i=0;i<starlist.length;i++)
{
  starlist[i].position.z += 0.1
} 
for(i=0;i<emissilelist.length;i++)
{
  emissilelist[i].position.z += 0.1
}
Collisions()
if(health1 == 0){
  gover = 1
}
renderer.render( scene, camera );
document.getElementById("health").innerHTML = "Health : "+health1.toString()+"                         Score: "+score1.toString()
ctr++
}
else
{
  document.getElementById("health").innerHTML = "Final Score: "+score1.toString()
}

};

animate();

