<?php
$pageTitle = '';
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <?php require __DIR__ . '/includ/head.php'; ?>
    <script src="js/slideshow.js" defer></script>
  </head>
  <body id="top_page" class="index">
    <section class="top_main relative top-slideshow">
      <div class="top-slideshow__slides" aria-hidden="true">
        <img class="is-active" src="images/top_main.jpg" alt="" width="1920" height="900" fetchpriority="high">
        <img src="images/top_company.jpg" alt="" width="920" height="600">
        <img src="images/service_img.jpg" alt="" width="1050" height="400">
      </div>
      <?php require __DIR__ . '/includ/header.php'; ?>
      <div class="top_main_catch wrap">
        <span>
          Professionals<br>
          who shape customer's<br>
          thoughts.
        </span>
        <p>鈴木工務店はお客様の思いを形にするプロフェッショナルです。</p>
      </div>
      <div class="logo_box">
        <img src="images/logo_icon.svg" alt="ロゴ">
      </div>
    </section>

    <section class="top_company relative">
      <img src="images/top_company.jpg" alt="会社概要写真">
      <div class="bg_black">
        <div class="wrap">
          <div class="title">
            <h1>COMPANY</h1>
          </div>
          <h2>「鈴木工務店」が目指すところは</h2>
          <p>
            家族と過ごす心地良い空間の家づくり。<br>
            こだわりが詰まった特別なリノベーション。<br>
            私たちはお客様の思いを形にするプロフェッショナルです。
          </p>
          <a class="button" href="company.php">MORE</a>
        </div>
      </div>
    </section>

    <section class="work">
      <div class="wrap">
        <div class="title">
          <h1>WORKS</h1>
          <p>施工事例</p>
        </div>
        <div class="frame">
          <div class="three_box">
            <img src="images/works01.jpg" alt="施工事例">
            <h2>外観をスタイリッシュにリフォーム</h2>
            <span>兵庫県 S様邸</span>
          </div>
          <div class="three_box">
            <img src="images/works02.jpg" alt="施工事例">
            <h2>家の全てを支える基礎工事</h2>
            <span>兵庫県 S様邸</span>
          </div>
          <div class="three_box">
            <img src="images/works03.jpg" alt="施工事例">
            <h2>家づくりの後半、建方・棟上げ</h2>
            <span>兵庫県 S様邸</span>
          </div>
        </div>
        <a class="button button_black center" href="works.php">MORE</a>
      </div>
    </section>

    <?php require __DIR__ . '/includ/footer.php'; ?>
  </body>
</html>
