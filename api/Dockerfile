# 1. Используем официальный образ PHP с Apache
FROM php:8.5-apache

# 2. Устанавливаем системные зависимости для PostgreSQL и Composer (unzip)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# 3. Устанавливаем расширения PHP для работы с БД
RUN docker-php-ext-install pdo pdo_pgsql

# 4. Устанавливаем Composer из официального образа
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Копируем файлы проекта в папку сервера
COPY . /var/www/html/

# 6. Устанавливаем PHP-зависимости (Swagger и др.)
WORKDIR /var/www/html
RUN composer install --no-interaction --optimize-autoloader

# 7. Выставляем права доступа
RUN chown -R www-data:www-data /var/www/html/

# 8. Включаем Apache Rewrite (полезно для API)
RUN a2enmod rewrite

EXPOSE 80