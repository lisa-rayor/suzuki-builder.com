<?php
$pageTitle = 'お問い合わせ　';
?>
<!DOCTYPE html>
<html lang="ja">
  <head>
    <?php require __DIR__ . '/includ/head.php'; ?>
  </head>
  <body id="sub_page" class="contact">
    <section class="sub_menu">
      <?php require __DIR__ . '/includ/header.php'; ?>
      <div class="wrap">
        <div class="title">
          <h1>CONTACT</h1>
          <p>お問い合わせ</p>
        </div>
      </div>
    </section>

    <section class="wrap">
      <p class="center">
        増改築・建て替えに関するご質問・ご相談は、下記フォームよりお気軽にお問い合わせ下さい。<br>
        メールでのお問い合わせについては、確認後お返事まで少々お時間をいただく場合がございますので、ご了承下さい。
      </p>
      <form method="post" action="mail.php">
        <table>
          <tr>
            <th><span class="red">必須</span>お名前</th>
            <td><input type="text" class="inp" name="お名前"></td>
          </tr>
          <tr>
            <th>TEL</th>
            <td><input type="tel" class="inp" name="TEL"></td>
          </tr>
          <tr>
            <th><span class="red">必須</span>MAIL</th>
            <td><input type="email" class="inp" name="メールアドレス"></td>
          </tr>
          <tr>
            <th><span class="red">必須</span>お問い合わせ内容</th>
            <td><textarea name="お問い合わせ内容"></textarea></td>
          </tr>
        </table>
        <button type="submit" class="button button_black center"><i class="fa fa-envelope"></i>送信する</button>
      </form>
    </section>

    <?php require __DIR__ . '/includ/footer.php'; ?>
  </body>
</html>
