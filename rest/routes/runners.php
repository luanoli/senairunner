<?php

include("./models/runners_model.php");

use \Models\Runners;

//get all
$app->get('/runners', function() use ($app) {    
    $runners = Runners::getAll();
    $app->response()->header("Content-Type", "application/json");
    echo json_encode($runners);    
});

//get by id
$app->get('/runners/:id', function($id) use ($app) {    
    try{
        $runner = Runners::getById($id);
        $app->response()->header("Content-Type", "application/json");
        
        echo json_encode($runner);
        
    }  catch (PDOException $e){
        $app->responde->setStatus(404);
    }
});

//get by id and all runners of run
$app->get('/runners/:id/runs', function($id) use ($app) {    
    try{
        $runner = Runners::getById($id);
        $runs = Runners::getRunsByRunner($id);
        $info['runner'] = $runner;
        $info['runs'] = $runs;
        
        $app->response()->header("Content-Type", "application/json");
        
        echo json_encode($info);
        
    }  catch (PDOException $e){
        $app->responde->setStatus(404);
    }
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