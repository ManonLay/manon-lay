<?php
    
if(isset($_POST["register"])){
    fopen("./nac.base/config.json", "a");

    $arr = array(
            array(
            "login" => array(
                crypt($_POST["id"]) => crypt($_POST["pwd"])
            ),
            "info" => array(
                "nom" => crypt($_POST["nom"]),
                "prenom" => crypt($_POST["prenom"])
            )
        )
    );

    if(file_put_contents("./nac.base/config.json", json_encode($arr))){
        header("location: ./login.php");
    }
}

?>