<?php	
	header('Access-Control-Allow-Origin:*');  
	header('Access-Control-Allow-Methods:POST');  
	header('Access-Control-Allow-Headers:x-requested-with,content-type');  
    
    
    $csvFile = file('albums_info.csv');
    $files = [];
    foreach ($csvFile as $line) {
        $files[] = str_getcsv($line);
    }
    

    $files = array_slice($files, 1);
    shuffle($files);

	$results = array();
    for ($i = 0; $i < count($files); $i++) {
        $lines = $files[$i];
        $result = array("no" => $lines[0], "title" => $lines[10], "date" => $lines[3], "location" => $lines[4], "city" => $lines[5],
                        "state" => $lines[6], "country" => $lines[7], "camera" => $lines[8], "lens" => $lines[9]);

        array_push($results, $result);
    }
	header("Content-type: application/json");
    print(json_encode($results));


?>
