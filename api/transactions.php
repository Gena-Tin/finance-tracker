<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
// header("Access-Control-Allow-Origin: https://finance-tracker-mu-sepia.vercel.app"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $query = "SELECT t.*, 
                         c.name as category_name, c.icon as category_icon,
                         p.name as project_name, p.icon as project_icon
                  FROM transactions t 
                  JOIN categories c ON t.category_id = c.id 
                  LEFT JOIN projects p ON t.project_id = p.id
                  ORDER BY t.created_at DESC";
        echo json_encode($pdo->query($query)->fetchAll(PDO::FETCH_ASSOC), JSON_UNESCAPED_UNICODE);
    } 
    
    elseif ($method === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) throw new Exception("Нет данных");

        // Добавили project_id в SQL и параметры
        $sql = "INSERT INTO transactions (category_id, project_id, amount, description, type, created_at) 
                VALUES (:cat_id, :proj_id, :amount, :desc, :type, :created_at)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            'cat_id'     => $data['category_id'],
            'proj_id'    => $data['project_id'] ?? 1, // По умолчанию 1, если не передали
            'amount'     => $data['amount'],
            'desc'       => $data['description'],
            'type'       => $data['type'],
            'created_at' => $data['created_at']
        ]);

        echo json_encode(['status' => 'success', 'id' => $pdo->lastInsertId()]);
    }

    elseif ($method === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'] ?? null;

        if ($id) {
            // Добавили project_id в UPDATE
            $sql = "UPDATE transactions 
                    SET category_id = :cat_id, 
                        project_id = :proj_id,
                        amount = :amount, 
                        description = :desc, 
                        type = :type, 
                        created_at = :created_at 
                    WHERE id = :id";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                'cat_id'     => $data['category_id'],
                'proj_id'    => $data['project_id'] ?? 1,
                'amount'     => $data['amount'],
                'desc'       => $data['description'],
                'type'       => $data['type'],
                'created_at' => $data['created_at'],
                'id'         => $id
            ]);

            echo json_encode(['status' => 'success']);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'ID не указан']);
        }
    }

    elseif ($method === 'DELETE') {
        $data = json_decode(file_get_contents('php://input'), true);
        $ids = $data['ids'] ?? [];

        if (!empty($ids)) {
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            $sql = "DELETE FROM transactions WHERE id IN ($placeholders)";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute($ids);

            echo json_encode(['status' => 'success', 'deleted_count' => $stmt->rowCount()]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'No IDs provided']);
        }
    }

    elseif ($method === 'PATCH') {
    $data = json_decode(file_get_contents('php://input'), true);
    $ids = $data['ids'] ?? [];
    $targetId = $data['targetProjectId'] ?? null;

    if (!empty($ids) && $targetId) {
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        // Добавляем ID проекта в параметры
        $params = array_merge([$targetId], $ids);
        
        $sql = "UPDATE transactions SET project_id = ? WHERE id IN ($placeholders)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode(['status' => 'success']);
    }
}

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}