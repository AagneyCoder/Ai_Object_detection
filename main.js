video = "";
objects = [];
function preload()
{
   
}

    
function setup() {
    canvas = createCanvas(480 , 380);
    canvas.position(380 , 250);
    video = createCapture(VIDEO);
    video.size(480 , 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status :  Detecting Objects"; 

}

function draw()
{
    image(video , 0 , 0 , 480 , 380 );
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";

}

function modelLoaded()
{
    console.log('Model Loaded');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "") {
        objectDetector.detect(video, gotResult);
        for ( i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects Detected Are : " + objects.length;

            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            nofill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


        }

    }
    

}

