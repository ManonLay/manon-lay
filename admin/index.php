<?php
    if(!file_exists("./nac.base/config.json")) header('location: ./start.php');
        else header('location: ./login.php');
?>