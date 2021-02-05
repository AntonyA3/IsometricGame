[<?php
    header("Access-Control-Allow-Origin: *");

    $id = $_REQUEST['roomid'];
    $filename = "assets/leveldata/room{$id}.json";
    $data =file_get_contents($filename);
    echo json_encode( 
        array(
            "data" => $data,
            "id" => $id
        )
    );  
    
?> 