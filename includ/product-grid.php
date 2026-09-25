<div class="product-grid">
  <?php foreach ($products as $id => $product): ?>
    <article class="product-card">
      <a class="product-card__link" href="product-detail.php?id=<?= $id ?>">
        <img src="images/<?= $escape($product['image']) ?>" alt="<?= $escape($product['name']) ?>の仮写真" width="1254" height="1254">
        <p class="product-code"><?= $escape($product['code']) ?></p>
        <h2><?= $escape($product['name']) ?></h2>
      </a>
      <p class="product-card__price">¥<?= number_format($product['price']) ?><small>（税込・仮価格）</small></p>
      <a class="button button_black product-button" href="product-detail.php?id=<?= $id ?>" aria-label="<?= $escape($product['name']) ?>の詳細を見る">詳細を見る</a>
    </article>
  <?php endforeach; ?>
</div>
