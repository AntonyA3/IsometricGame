[<?php
    header("Access-Control-Allow-Origin: *");

    if(array_key_exists('roomid',$_REQUEST)){
        $id = $_REQUEST['roomid'];
        $filename = "assets/leveldata/room{$id}.json";
        $data =file_get_contents($filename);
        echo json_encode( 
            array(
                "data" => $data,
                "id" => $id
            )
        );  
    }

    if(array_key_exists('roomtransitionid',$_REQUEST)){
        $id = $_REQUEST['roomtransitionid'];
        $filename = "assets/leveldata/roomTransitionData/roomTransition{$id}.json";
        $data =file_get_contents($filename);
        echo json_encode( 
            array(
                "data" => $data,
                "id" => $id
            )
        );  

    }
    
    
?> 