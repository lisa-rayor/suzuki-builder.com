<?php
$pageTitle = '施工事例　';
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <?php require __DIR__ . '/includ/head.php'; ?>
  </head>
  <body id="sub_page" class="works">
    <section class="sub_menu">
      <?php require __DIR__ . '/includ/header.php'; ?>
      <div class="wrap">
        <div class="title">
          <h1>WORKS</h1>
          <p>施工事例</p>
        </div>
      </div>
    </section>

    <section class="work">
      <div class="frame wrap">
        <div class="three_box">
          <a class="work-link" href="works-detail.php?id=1">
            <img src="images/works01.jpg" alt="施工事例">
            <h2>外観をスタイリッシュにリフォーム</h2>
            <span>兵庫県 S様邸</span>
          </a>
          <a class="button button_black work-detail-button" href="works-detail.php?id=1" aria-label="外観をスタイリッシュにリフォームの詳細を見る">詳細を見る</a>
        </div>
        <div class="three_box">
          <a class="work-link" href="works-detail.php?id=2">
            <img src="images/works02.jpg" alt="施工事例">
            <h2>家の全てを支える基礎工事</h2>
            <span>兵庫県 S様邸</span>
          </a>
          <a class="button button_black work-detail-button" href="works-detail.php?id=2" aria-label="家の全てを支える基礎工事の詳細を見る">詳細を見る</a>
        </div>
        <div class="three_box">
          <a class="work-link" href="works-detail.php?id=3">
            <img src="images/works03.jpg" alt="施工事例">
            <h2>家づくりの後半、建方・棟上げ</h2>
            <span>兵庫県 S様邸</span>
          </a>
          <a class="button button_black work-detail-button" href="works-detail.php?id=3" aria-label="家づくりの後半、建方・棟上げの詳細を見る">詳細を見る</a>
        </div>
      </div>
      <div class="frame wrap">
        <div class="three_box">
          <a class="work-link" href="works-detail.php?id=4">
            <img src="images/works04.jpg" alt="施工事例">
            <h2>ウッドデッキ</h2>
          </a>
          <a class="button button_black work-detail-button" href="works-detail.php?id=4" aria-label="ウッドデッキの詳細を見る">詳細を見る</a>
        </div>
        <div class="three_box">
          <a class="work-link" href="works-detail.php?id=5">
            <img src="images/works05.jpg" alt="施工事例">
            <h2>居酒屋</h2>
          </a>
          <a class="button button_black work-detail-button" href="works-detail.php?id=5" aria-label="居酒屋の詳細を見る">詳細を見る</a>
        </div>
        <div class="three_box">
          <a class="work-link" href="works-detail.php?id=6">
            <img src="images/works06.jpg" alt="施工事例">
            <h2>喫茶店</h2>
          </a>
          <a class="button button_black work-detail-button" href="works-detail.php?id=6" aria-label="喫茶店の詳細を見る">詳細を見る</a>
        </div>
      </div>
      <div class="frame wrap">
        <div class="three_box">
          <a class="work-link" href="works-detail.php?id=7">
            <img src="images/works07.jpg" alt="施工事例">
            <h2>増築</h2>
          </a>
          <a class="button button_black work-detail-button" href="works-detail.php?id=7" aria-label="増築の詳細を見る">詳細を見る</a>
        </div>
      </div>
    </section>

    <?php require __DIR__ . '/includ/footer.php'; ?>
  </body>
</html>
