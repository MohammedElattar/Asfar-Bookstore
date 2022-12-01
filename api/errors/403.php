<?php
http_response_code(403);
return json_encode([
    "data" => [] ,
    "msg" => "This page is forbidden" ,
    "code" => 403,
    "type" => "error"
]);
