[<?php
    header("Access-Control-Allow-Origin: *");

    switch($_REQUEST['level']){

        case "level_i":
            $object = file_get_contents("assets/leveldata/level_i.json");
            echo $object;
        

    }
    
?> 