<?php

include("./libs/database.php");

use \Slim\Slim;


require 'Slim/Slim.php';
Slim::registerAutoloader();

$app = new Slim();

include("./routes/runs.php");
include("./routes/runners.php");

$app->run();
