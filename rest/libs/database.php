<?php

namespace Libs\Database;

use \PDO;

class Db {

    protected static $db = null;

    public static function connect(){

        try {    

//            $dbuser = "root";
//            $dbpass = "";
//            self::$db = new PDO("mysql:host=localhost;dbname=senairunner;charset=utf8", $dbuser, $dbpass);
            
            $dbuser = "root";
            $dbpass = "senai123";
            self::$db = new PDO("mysql:host=senairunner.cgmhrti5qsk6.sa-east-1.rds.amazonaws.com;dbname=senairunner;charset=utf8", $dbuser, $dbpass);

            self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  

        } catch(PDOException $e) {

            echo '{"error":{"text":'. $e->getMessage() .'}}'; 

        }
    }

    public static function execute($sql){

        if(self::$db == null){
            self::connect();
        }

        return self::$db->query($sql);
    }

    public static function select($sql){
        
        if(self::$db == null){
           self::connect();
        }
        $stmt = self::$db->query($sql);
        
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
    
    public static function selectOne($sql){
        
        if(self::$db == null){
           self::connect();
        }
        $stmt = self::$db->query($sql);
        
        return $stmt->fetch(PDO::FETCH_OBJ);
    }
} 

