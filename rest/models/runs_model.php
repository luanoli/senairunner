<?php

namespace Models;

use Libs\Database\Db;

class Runs {

    public static function getAll(){
        $sql = "SELECT * FROM corrida";
        return Db::select($sql);	
    }

    public static function getById($id){
        $sql = "SELECT * FROM corrida WHERE id = " . $id;
        return Db::selectOne($sql);
    }
    
    public static function getRunnersByRun($id){
        $sql = "SELECT co.* FROM inscricoes i ";
        $sql .= "LEFT JOIN corredor co ON i.corredor = co.id ";
        $sql .= "WHERE i.corrida = " . $id;        
        
        return Db::select($sql);
    }

    public static function insert($run){
        $sql = "INSERT INTO corrida (nome, data, descricao, cidade, estado, valor_inscricao) VALUES ('" . 
        $run['nome'] . "', '" . 
        $run['data'] . "', '" . 
        $run['descricao'] . "', '" . 
        $run['cidade'] . "', '" .
        $run['estado'] . "', " .
        $run['valor_inscricao'] . ")";

        Db::execute($sql);
    }

    public static function update($run){   
        
        $run->status = empty($run->status) ? "false" : "true";
        
        $sql = "UPDATE corrida SET " .
                "nome = '" . $run->nome . "', " .
                "data = '" . $run->data . "', " .
                "descricao = '" . $run->descricao . "', " .
                "cidade = '" . $run->cidade . "', " .
                "estado = '" . $run->estado . "', " .
                "valor_inscricao = " . $run->valor_inscricao . ", " .
                "status = " . $run->status .
                " WHERE id = " . $run->id;
        
        if(Db::execute($sql)){
            return true;
        }else{
            return false;
        }
    }

    public static function delete($id){
        $sql = "DELETE FROM corrida WHERE id = " . $id;

        if(Db::execute($sql)){
            return true;
        }else{
            return false;
        }
    }
    
}