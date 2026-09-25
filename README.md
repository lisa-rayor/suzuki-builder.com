# 鈴木工務店サイト（PHP構成）

2026年9月24日に取得した公開HTMLをもとに、見た目を維持して整理したローカル版です。

## Docker・VS Codeでの作業

1. Docker Desktopを起動し、VS Codeでこのフォルダを開く（ターミナルなら `code .`）。
2. VS Codeで `Ctrl+Shift+B`、またはターミナルで `docker compose up -d` を実行。
3. [http://localhost:8081](http://localhost:8081) を開く。
4. PHP・CSSを編集して保存し、ブラウザーを更新する。コンテナの再起動・ビルドは不要。
5. 終了時は「ターミナル → タスクの実行 → サイトを停止」、または `docker compose down`。

初回のみ[公式PHP 8.4＋Apacheイメージ](https://hub.docker.com/_/php)をダウンロードします。8080番の別プロジェクトと併用できます。PHPファイルは直接開かず、上記URLで確認してください。コードはスペース2文字で字下げし、構造や処理ごとに改行しています。保存時の自動整形は、PHP対応フォーマッターを未設定のため無効にしています。

構成は[Docker Compose](https://docs.docker.com/reference/compose-file/services/)と[VS Code Tasks](https://code.visualstudio.com/docs/debugtest/tasks)を使用しています。

## ファイルと検証

- ページ：`index.php`・`company.php`・`service.php`・`works.php`・`contact.php`。外部フォント・jQueryの読み込みにはインターネット接続が必要です。
- `includ/head.php`：共通メタ情報・ページタイトル・CSSや外部ライブラリの読み込み。
- `includ/header.php`：共通ロゴ・PC／スマホメニュー・`js/site.js` の読み込み。
- `includ/footer.php`：共通問い合わせエリア・フッター。
- `works-detail.php?id=1`：施工事例詳細の共通テンプレート。一覧順に数値ID `1`〜`7` を割り当て、各事例の詳細へ移動できます。
- `includ/works-data.php`：事例ごとのタイトル・分類・所在地・Before／After画像・コメント。画像は `images/` 内のファイル名を指定します。現在の写真・コメントは仮内容で、実際の施工前後を示しません。
- `css/creative.css`：元のルールと順序を維持し、プロパティごとに改行。ルール間には空行を入れています。
- `products.php`：商品一覧と、発送・ご注文の案内。`includ/product-grid.php` を2回読み込み、仮商品3点を2段（計6枠）表示します。
- `product-detail.php?id=1`：商品詳細の共通テンプレート。数値ID `1`（スツール）・`2`（サイドテーブル）・`3`（シェルフ）の3商品を用意しています。
- `includ/products-data.php`：商品名・商品番号・税込価格・画像ファイル名・説明・素材・サイズ。現在はすべて仮データです。
- `includ/product-guide.php`：一覧・詳細で共通の発送案内と4段階の注文の流れ。電話相談後に総額・送料・納期・支払い条件を確認する案内です。
- `js/site.js`：全ページ共通のメニュー処理。6項目のホバー処理を1つに集約。
- `images/`：既存サイトの画像22点と、AI生成の仮商品写真3点。生成内容は `docs/product-images.md` に記録しています。
- 各ページから `require __DIR__ . '/includ/header.php';` のように共通部品を読み込みます。`includ` を修正すると全ページに反映されます。
- 元の取得資料は `SITE_CRAWL.md` と `docs/site-crawl/` に保存。

ページ追加時は既存の下層 `.php` をコピーし、冒頭の `$pageTitle`（例：`'会社概要　'`）、本文、bodyのclassを編集します。会社名以降の共通タイトルは `includ/head.php` で付加します。メニューに追加するときは `includ/header.php` と `includ/footer.php` を編集してください。

本番サイトへの反映は行っていません。今回のPHPは取得したHTMLを共通化したもので、元サイトのサーバー側ソースではありません。問い合わせ送信に必要な `mail.php` は未取得のため含まれません。フォームの送信先・フィールド名は既存のままです。

検証：Docker起動後に `node scripts/verify.mjs`。このCodex環境の同梱Playwright・PNG比較ライブラリとMicrosoft Edgeを使用します。実際にPHPが出力した5ページを1440px／390pxで元サイトと比較し、CSSルール、本文、タイトル、要素位置、画像差分、メニュー、内部リンクを確認します。結果は `docs/verification/results.json`、比較画像は同じフォルダに保存します。画像比較の色差閾値は0.01です。

詳細ページの検証は `node scripts/verify-work-details.mjs`。一覧→詳細→一覧の操作、7事例の表示、不正IDの404、PCの左右配置とスマホの縦配置を確認します。

商品ページの検証は `node scripts/verify-products.mjs`。1440px／768px／390pxで、3商品の一覧→詳細→一覧、価格・写真・発送案内・注文の流れ、メニュー、横はみ出し、不正IDの404を確認します。既存ページ比較では追加メニューと施工事例ボタンを除き、既存部分のデザインを照合します。

トップの `.top_main` は既存写真3枚のスライドショーです。`index.php` の `.top-slideshow__slides` 内で写真を変更できます。`js/slideshow.js` の `interval` で切替間隔（現在4秒）、`css/creative.css` の `transition` でフェード時間（現在4秒）を設定します。操作ボタンは表示せず、非表示タブや「動きを減らす」設定では自動再生を停止します。JavaScriptが無効な場合は最初の写真を表示します。

スライドショーの検証は `node scripts/verify-slideshow.mjs`。PC・スマホで操作ボタンがないこと、3枚の循環、動きを減らす設定、文字位置の維持、メニュー操作、JavaScript無効時の表示を確認します。

PHP互換性：テストサーバーはPHP 7.1.33、ローカルDockerはPHP 8.4です。追加ページのエスケープ処理はPHP 7.1でも動く無名関数を使用しています。`php scripts/verify-php-compatibility.php` で、一覧・全詳細・不正ID・HTMLエスケープを検証できます。PHP 7.1の環境では `fn` 構文を使用しないでください。
