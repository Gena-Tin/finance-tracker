<?php
header('Content-Type: application/json');
// header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Origin: finance-tracker-mu-sepia.vercel.app"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db.php';

try {
    // $stmt = $pdo->query("SELECT id, name, icon FROM categories");
    $stmt = $pdo->query("SELECT id, name, icon, is_system FROM categories ORDER BY is_system DESC, name ASC");
    echo json_encode($stmt->fetchAll(), JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
