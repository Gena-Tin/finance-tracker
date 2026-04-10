<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

$method = $_SERVER['REQUEST_METHOD'];

try {
    // Получение всех категорий (с полем is_system)
    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT id, name, icon, is_system FROM categories ORDER BY is_system DESC, name ASC");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC), JSON_UNESCAPED_UNICODE);
    }

// Добавление новой категории
    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (empty($data['name'])) {
            throw new Exception("Название категории не может быть пустым");
        }

        // Явно указываем false для is_system, чтобы избежать проблем с дефолтами
        $sql = "INSERT INTO categories (name, icon, is_system) VALUES (:name, :icon, :is_system)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'name' => $data['name'],
            'icon' => $data['icon'] ?? '💰',
            'is_system' => 0 // В PHP для boolean в PDO лучше передавать 0 или 1
        ]);
        
        echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
    }

    // Редактирование категории
    elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE categories SET name = :name, icon = :icon WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['name' => $data['name'], 'icon' => $data['icon'], 'id' => $data['id']]);
        echo json_encode(['status' => 'success']);
    }

    // Удаление категории с проверками
    elseif ($method === 'DELETE') {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];

        // 1. Проверка на системность
        $checkSystem = $pdo->prepare("SELECT is_system FROM categories WHERE id = ?");
        $checkSystem->execute([$id]);
        if ($checkSystem->fetchColumn()) {
            http_response_code(403);
            echo json_encode(['error' => 'Системную категорию нельзя удалить']);
            exit;
        }

        // 2. Проверка на наличие транзакций
        $checkUsage = $pdo->prepare("SELECT COUNT(*) FROM transactions WHERE category_id = ?");
        $checkUsage->execute([$id]);
        if ($checkUsage->fetchColumn() > 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Нельзя удалить: в категории есть записи. Сначала перенесите их.']);
            exit;
        }

        $stmt = $pdo->prepare("DELETE FROM categories WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['status' => 'success']);
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}