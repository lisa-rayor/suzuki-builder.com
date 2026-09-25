<?php
$products = require __DIR__ . '/includ/products-data.php';
$id = $_GET['id'] ?? '1';
$product = is_string($id) ? ($products[$id] ?? null) : null;

if (!$product) {
  http_response_code(404);
}

$pageTitle = ($product['name'] ?? '商品が見つかりません') . '　';
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
          <p>商品詳細</p>
        </div>
      </div>
    </section>

    <main class="product-main wrap">
      <nav class="product-breadcrumb" aria-label="パンくずリスト">
        <a href="products.php">商品一覧</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page"><?= $escape($product['name'] ?? '商品が見つかりません') ?></span>
      </nav>

      <?php if ($product): ?>
        <p class="product-notice">※写真・価格・仕様・説明は、デザイン確認用の仮内容です。</p>
        <article class="product-detail">
          <img class="product-detail__image" src="images/<?= $escape($product['image']) ?>" alt="<?= $escape($product['name']) ?>の仮写真" width="1254" height="1254">
          <div class="product-detail__info">
            <p class="product-code">商品番号：<?= $escape($product['code']) ?></p>
            <h2 class="product-detail__title"><?= $escape($product['name']) ?></h2>
            <p class="product-detail__price">¥<?= number_format($product['price']) ?><small>（税込・仮価格）</small></p>
            <p class="product-detail__lead"><?= $escape($product['lead']) ?></p>
            <p><?= $escape($product['description']) ?></p>
            <dl class="product-specs">
              <div>
                <dt>素材・仕上げ（仮）</dt>
                <dd><?= $escape($product['material']) ?></dd>
              </div>
              <div>
                <dt>サイズ（仮）</dt>
                <dd><?= $escape($product['size']) ?></dd>
              </div>
              <div>
                <dt>送料・納期</dt>
                <dd>ご注文前にご案内します。<a href="#shipping">発送について</a></dd>
              </div>
            </dl>
            <a class="button button_black product-detail__consult" href="tel:0663911382">電話で商品について相談する</a>
            <p class="product-detail__phone">06-6391-1382<br>商品名・商品番号をお伝えください。</p>
          </div>
        </article>
      <?php else: ?>
        <h2 class="product-detail__title">商品が見つかりませんでした。</h2>
        <p>商品一覧からご覧になりたい商品をお選びください。</p>
      <?php endif; ?>

      <div class="product-back">
        <a class="button button_black" href="products.php">商品一覧へ戻る</a>
      </div>

      <?php if ($product) require __DIR__ . '/includ/product-guide.php'; ?>
    </main>

    <?php require __DIR__ . '/includ/footer.php'; ?>
  </body>
</html>
