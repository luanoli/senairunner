<?php

include("./models/runners_model.php");

use \Models\Runners;

//get all
$app->get('/runners', function() use ($app) {
    $runners = Runners::getAll();
    echo json_encode($runners);
});

//get by id
$app->get('/runners/:id', function($id) use ($app) {    
    $runner = Runners::getById($id);
    echo json_encode($runner);
});

//update
$app->put('/runners/:id', function($id) use ($app) {

    $runner = json_decode($app->request()->getBody());
    
    $status = Runners::update($runner);
    if($status){
        $app->response->setStatus(200);
    }else{
        $app->response->setStatus(304);
    }
});

//delete
$app->delete('/runners/:id', function($id) use ($app) {
	$status = Runners::delete($id);
    if($status){
        $app->response->setStatus(200);
    }else{
        $app->response->setStatus(304);   
    }
});

//insert
$app->post('/runners', function() use ($app) {

    $runner = json_decode(file_get_contents('php://input'), true);
    Runners::insert($runner);
  
});