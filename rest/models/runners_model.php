<?php

namespace Models;

use \Libs\Database\Db;

class Runners {

    public static function getAll(){
        $sql = "SELECT * FROM corredor";
        return Db::select($sql);	
    }

    public static function getById($id){
        $sql = "SELECT * FROM corredor WHERE id = " . $id;
        return Db::selectOne($sql);
    }

    public static function insert($runner){
        $sql = "INSERT INTO corredor (nome, data_nasc, cidade, estado) VALUES ('" . 
        $runner['nome'] . "', '" . 
        $runner['data_nasc'] . "', '" .         
        $runner['cidade'] . "', '" .
        $runner['estado'] . "')";

        Db::execute($sql);
    }

    public static function update($runner){    
        $sql = "UPDATE corredor SET " .
                "nome = '" . $runner->nome . "', " .
                "data_nasc = '" . $runner->data_nasc . "', " .                
                "cidade = '" . $runner->cidade . "', " .
                "estado = '" . $runner->estado . "'" .
                " WHERE id = " . $runner->id;
        
        if(Db::execute($sql)){
            return true;
        }else{
            return false;
        }
    }

    public static function delete($id){
        $sql = "DELETE FROM corredor WHERE id = " . $id;

        if(Db::execute($sql)){
            return true;
        }else{
            return false;
        }
    }
    
}