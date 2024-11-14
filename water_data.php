<?php
// Adatbázis kapcsolat betöltése
require 'connect.php';

// Adatok lekérdezése a táblából
$query = "SELECT * FROM water_production_and_supply";
$result = mysqli_query($dbconn, $query);

if (!$result) {
    // Hiba esetén JSON formátumban adjuk vissza a hibaüzenetet
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Hiba a lekérdezés végrehajtásakor!']);
    exit;
}

// Eredmények összegyűjtése
$water_data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $water_data[] = $row;
}

// JSON válasz visszaadása
header('Content-Type: application/json');
echo json_encode($water_data);

// Adatbázis kapcsolat bezárása
mysqli_close($dbconn);

