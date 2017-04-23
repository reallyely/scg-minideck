<?php
header("Access-Control-Allow-Origin: *");
$request = $_SERVER['REQUEST_URI'];

// $input = json_decode(file_get_contents('php://input'), true);
$parts = parse_url($request, PHP_URL_PATH);
$basename = basename($request);

 // connect to the mysql database
$db = mysqli_connect('45.56.114.155', 'db_user', '0Y8RusveQ5n1rGfwixtI', 'db');
mysqli_set_charset($db,'utf8');

$query;

if (preg_match('/decks$/', $basename)) {
  // get all decks
  $query = "SELECT deck_id as id, deck_name as name, deck_format as format FROM decks ORDER BY name";
  // echo json_encode($out2);
} elseif (preg_match('/\/decks\/\d+$/', $request)) {
  // # get specific deck
  $query = '
    SELECT
      dc.qty as quantity,
      c.card_id as id,
      c.card_name as name,
      c.card_type as type,
      c.card_image as image
    FROM cards c
    JOIN decks_to_cards dc
      ON dc.card_id = c.card_id
    WHERE dc.deck_id = '.intval($basename);
}

$result = mysqli_query($db, $query);
if (!$result) {
  http_response_code(404);
  die(mysqli_error($db));
}
$out = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($out);

mysqli_close($db);