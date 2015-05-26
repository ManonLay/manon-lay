<?php
    
if(isset($_POST["login"])){
    if(file_exists("./nac.base/config.json")){
        $arr = json_decode(file_get_contents("./nac.base/config.json", true));

        /*if($arr[0]["login"][0] == crypt($_POST["id"]) && $arr[0]["login"][0] == crypt($_POST["pwd"])){
            
        }*/
    }
}

?>