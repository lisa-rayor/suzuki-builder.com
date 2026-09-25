<?php
$pageTitle = '商品一覧　';
$products = require __DIR__ . '/includ/products-data.php';
$escape = static function ($value) {
  return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
};
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <?php require __DIR__ . '/includ/head.php'; ?>
  </head>
  <body id="sub_page" class="products-page">
    <section class="sub_menu">
      <?php require __DIR__ . '/includ/header.php'; ?>
      <div class="wrap">
        <div class="title">
          <h1>PRODUCTS</h1>
          <p>商品一覧</p>
        </div>
      </div>
    </section>

    <main class="product-main wrap">
      <div class="product-intro">
        <h2>暮らしに馴染む、木のあるかたち。</h2>
        <p>木のぬくもりを感じる、シンプルな家具をご紹介します。</p>
        <p class="product-notice">※掲載の写真・価格・商品情報は、デザイン確認用の仮内容です。</p>
      </div>

      <?php require __DIR__ . '/includ/product-grid.php'; ?>
      <?php require __DIR__ . '/includ/product-grid.php'; ?>

      <?php require __DIR__ . '/includ/product-guide.php'; ?>
    </main>

    <?php require __DIR__ . '/includ/footer.php'; ?>
  </body>
</html>
