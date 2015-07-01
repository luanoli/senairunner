<?php

include("./models/runs_model.php");

use \Models\Runs;

//get all
$app->get('/runs', function() use ($app) {
    $runs = Runs::getAll();
    $app->response()->header("Content-Type", "application/json");
    echo json_encode($runs);
});

//get by id
$app->get('/runs/:id', function($id) use ($app) {
    try{
        $run = Runs::getById($id);
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($run);
    }catch (PDOException $e){
        $app->response->setStatus(404);
    }
});

//get by id and all runners of run
$app->get('/runs/:id/runners', function($id) use ($app) {    
    try{
        $run = Runs::getById($id);
        $runners = Runs::getRunnersByRun($id);
        $info['run'] = $run;
        $info['runners'] = $runners;
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($info);
    }  catch (PDOException $e){
        $app->responde->setStatus(404);
    }
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
    try{
        Runs::delete($id);
        $app->response->setStatus(200);
    }  catch (PDOException $e){
        $app->response->setStatus(304);   
    }                
});

//insert
$app->post('/runs', function() use ($app) {

    $run = json_decode(file_get_contents('php://input'), true);
    Runs::insert($run);
  
});