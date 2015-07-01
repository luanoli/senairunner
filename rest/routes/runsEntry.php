<?php

include("./models/runs_entry_model.php");

use Models\RunsEntry;

//get all
$app->get('/runsEntry', function() use ($app) {
    $runsEntry = RunsEntry::getAll();
    
    $app->response()->header("Content-Type", "application/json");
    
    echo json_encode($runsEntry);
});

//get by id
$app->get('/runsEntry/:id', function($id) use ($app) {    
    $runEntry = RunsEntry::getById($id);
    
    $app->response()->header("Content-Type", "application/json");
    
    echo json_encode($runEntry);
});

//update
$app->put('/runsEntry/:id', function($id) use ($app) {	

    $runEntry = json_decode($app->request()->getBody());
    
    $status = RunsEntry::update($runEntry);
    if($status){
        $app->response->setStatus(200);
    }else{
        $app->response->setStatus(304);
    }
});

//delete
$app->delete('/runsEntry/:id', function($id) use ($app) {
	$status = RunsEntry::delete($id);
    if($status){
        $app->response->setStatus(200);
    }else{
        $app->response->setStatus(304);   
    }
});

//insert
$app->post('/runsEntry', function() use ($app) {    
    
    $runEntry = json_decode(file_get_contents('php://input'), true);
    try{
        RunsEntry::insert($runEntry);
        $app->response->setStatus(200);
    }  catch (PDOException $e){
        $app->response->setStatus(304);  
    }
      
});