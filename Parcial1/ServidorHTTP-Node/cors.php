<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


$data = ["mensaje" => "Hola, este es un mensaje desde el servidor PHP"];
echo json_encode($data);
?>
