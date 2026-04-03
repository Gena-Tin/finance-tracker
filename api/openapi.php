<?php
use OpenApi\Attributes as OA;

#[OA\Info(title: "Finance Tracker API", version: "1.0.0")]
#[OA\Server(url: "http://localhost:8000")]

#[OA\Get(
    path: "/index.php",
    summary: "Получить список категорий",
    tags: ["Categories"],
    responses: [
        new OA\Response(response: 200, description: "Успешный список из БД")
    ]
)]
class OpenApiConfig {}