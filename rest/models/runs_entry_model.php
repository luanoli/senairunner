<?php 

namespace Models;

use Libs\Database\Db;

class RunsEntry {

    public static function getAll(){
        $sql = "SELECT i.id, ca.nome as corrida,co.nome as corredor, i.status_pagamento "; 
        $sql .= "FROM inscricoes i ";
        $sql .= "LEFT JOIN corredor co ON i.corredor = co.id ";
        $sql .= "LEFT JOIN corrida ca ON i.corrida = ca.id ";
        
        return Db::select($sql);	
    }   
    
    public static function getById($id){
        $sql = "SELECT * FROM inscricoes WHERE id = " . $id;
        return Db::selectOne($sql);
    }  
    
    public static function insert($runEntry){                
        $sql = "INSERT INTO inscricoes (corrida, corredor, status_pagamento) VALUES ('" . 
        $runEntry['corrida'] . "', '" . 
        $runEntry['corredor'] . "', '" .         
        $runEntry['status_pagamento'] . "')";

        Db::execute($sql);
    }

    public static function update($runEntry){    
        print_r($runEntry);
        $sql = "UPDATE inscricoes SET " .
                "status_pagamento = " . $runEntry->status_pagamento .
                " WHERE id = " . $runEntry->id;
        
        if(Db::execute($sql)){
            return true;
        }else{
            return false;
        }
    }

    public static function delete($id){
        $sql = "DELETE FROM inscricoes WHERE id = " . $id;

        if(Db::execute($sql)){
            return true;
        }else{
            return false;
        }
    }
    
}