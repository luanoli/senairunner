<?php

include("./models/runs_model.php");

use \Models\Runs;

//get all
$app->get('/runs', function() use ($app) {
    $runs = Runs::getAll();
    echo json_encode($runs);
});

//get by id
$app->get('/runs/:id', function($id) use ($app) {    
    $run = Runs::getById($id);
    echo json_encode($run);
});

//update
$app->put('/runs/:id', function($id) use ($app) {	

    $run = json_decode($app->request()->getBody());
    
    $status = Runs::update($run);
    if($status){
        $app->response->setStatus(200);
    }else{
        $app->response->setStatus(304);
    }
});

//delete
$app->delete('/runs/:id', function($id) use ($app) {
	$status = Runs::delete($id);
    if($status){
        $app->response->setStatus(200);
    }else{
        $app->response->setStatus(304);   
    }
});

//insert
$app->post('/runs', function() use ($app) {

    $run = json_decode(file_get_contents('php://input'), true);
    Runs::insert($run);
  
});