<?php
require_once 'db.php';

// код вывода данных
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $stmt = $pdo->query("SELECT id, name, icon FROM categories");
    echo json_encode($stmt->fetchAll(), JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
