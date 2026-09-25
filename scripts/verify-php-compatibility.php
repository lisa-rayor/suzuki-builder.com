<?php
// PHP 7.1と開発用PHPの両方で、追加ページの出力と不正IDを確認します。
error_reporting(E_ALL);
set_error_handler(function ($severity, $message, $file, $line) {
  throw new ErrorException($message, 0, $severity, $file, $line);
});

function verifyPage($file, $query, $status, $expected) {
  $_GET = $query;
  http_response_code(200);
  ob_start();
  require dirname(__DIR__) . '/' . $file;
  $html = ob_get_clean();
  if (http_response_code() !== $status || strpos($html, $expected) === false) {
    throw new RuntimeException('Unexpected page response: ' . $file . ' ' . json_encode($query));
  }
  if ($escape('<script>"&') !== '&lt;script&gt;&quot;&amp;') {
    throw new RuntimeException('HTML escaping failed: ' . $file);
  }
}

verifyPage('products.php', [], 200, '木製スツール');
$products = require dirname(__DIR__) . '/includ/products-data.php';
foreach ($products as $id => $product) {
  verifyPage('product-detail.php', ['id' => (string) $id], 200, $product['name']);
}
$works = require dirname(__DIR__) . '/includ/works-data.php';
foreach ($works as $id => $work) {
  verifyPage('works-detail.php', ['id' => (string) $id], 200, $work['title']);
}
foreach (['product-detail.php', 'works-detail.php'] as $file) {
  foreach (['999', ['1'], '<script>'] as $id) {
    verifyPage($file, ['id' => $id], 404, '見つかりません');
  }
}
echo 'PASS PHP ' . PHP_VERSION . ': listing, 10 details, invalid IDs and HTML escaping' . PHP_EOL;
