<?php
$works = require __DIR__ . '/includ/works-data.php';
$id = $_GET['id'] ?? '1';
$work = is_string($id) ? ($works[$id] ?? null) : null;

if (!$work) {
  http_response_code(404);
}

$pageTitle = ($work['title'] ?? '施工事例が見つかりません') . '　';
$escape = static function ($value) {
  return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
};
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <?php require __DIR__ . '/includ/head.php'; ?>
  </head>
  <body id="sub_page" class="work-detail-page">
    <section class="sub_menu">
      <?php require __DIR__ . '/includ/header.php'; ?>
      <div class="wrap">
        <div class="title">
          <h1>WORKS</h1>
          <p>施工事例</p>
        </div>
      </div>
    </section>

    <main class="work-detail wrap">
      <nav class="work-detail__breadcrumb" aria-label="パンくずリスト">
        <a href="works.php">施工事例一覧</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">施工事例詳細</span>
      </nav>

      <?php if ($work): ?>
        <div class="work-detail__heading">
          <p class="work-detail__category"><?= $escape($work['category']) ?></p>
          <h2 class="work-detail__title"><?= $escape($work['title']) ?></h2>
          <?php if ($work['location']): ?>
            <p class="work-detail__location"><?= $escape($work['location']) ?></p>
          <?php endif; ?>
        </div>

        <p class="work-detail__notice">※写真・コメントはデザイン確認用の仮内容です。実際の施工前後を示すものではありません。</p>

        <div class="work-detail__photos" aria-label="施工前と施工後の写真">
          <figure>
            <figcaption>
              <span class="work-detail__label">BEFORE</span>
              <span>施工前</span>
            </figcaption>
            <img src="images/<?= $escape($work['before']) ?>" alt="<?= $escape($work['title']) ?>：施工前の仮画像" width="320" height="200">
          </figure>
          <figure>
            <figcaption>
              <span class="work-detail__label work-detail__label--after">AFTER</span>
              <span>施工後</span>
            </figcaption>
            <img src="images/<?= $escape($work['after']) ?>" alt="<?= $escape($work['title']) ?>：施工後の仮画像" width="320" height="200">
          </figure>
        </div>

        <div class="work-detail__description">
          <div>
            <p class="work-detail__eyebrow">ABOUT THE WORK</p>
            <h3>施工について</h3>
          </div>
          <div class="work-detail__comment">
            <p><?= $escape($work['comment']) ?></p>
            <p class="work-detail__comment-note">掲載内容はサンプルです。施工の背景やお客様のご要望、工事のポイントをご紹介するスペースです。</p>
          </div>
        </div>
      <?php else: ?>
        <div class="work-detail__heading">
          <h2 class="work-detail__title">施工事例が見つかりませんでした。</h2>
          <p>施工事例一覧からご覧になりたい事例をお選びください。</p>
        </div>
      <?php endif; ?>

      <div class="work-detail__back">
        <a class="button button_black" href="works.php">施工事例一覧へ戻る</a>
      </div>
    </main>

    <?php require __DIR__ . '/includ/footer.php'; ?>
  </body>
</html>
