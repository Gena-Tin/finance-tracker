<?php

$host = getenv('DB_HOST') ?: 'localhost';
$db   = getenv('DB_NAME') ?: 'finance_db';
$user = getenv('DB_USER') ?: 'postgres';
$pass = getenv('DB_PASS') ?: '123qwe';
$port = getenv('DB_PORT') ?: '5432';

$sslMode = getenv('RENDER') ? ";sslmode=require" : "";

$dsn = "pgsql:host=$host;port=$port;dbname=$db" . $sslMode;


$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Ошибки будут вызывать исключения
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       // Данные возвращаются как ассоциативный массив
    PDO::ATTR_EMULATE_PREPARES   => false,                  // Использовать реальные подготовленные запросы
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}