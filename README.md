# 鈴木工務店サイト（HTML・CSS整理版）

2026年9月24日に取得した公開HTMLをもとに、見た目を維持して整理したローカル版です。

## Docker・VS Codeでの作業

1. Docker Desktopを起動し、VS Codeでこのフォルダを開く（ターミナルなら `code .`）。
2. VS Codeで `Ctrl+Shift+B`、またはターミナルで `docker compose up -d` を実行。
3. [http://localhost:8081](http://localhost:8081) を開く。
4. HTML・CSSを編集して保存し、ブラウザーを更新する。コンテナの再起動・ビルドは不要。
5. 終了時は「ターミナル → タスクの実行 → サイトを停止」、または `docker compose down`。

初回のみNginxイメージをダウンロードします。8080番の別プロジェクトと併用できます。HTMLの追加はルートに `example.html` のような英数字・ハイフン・アンダースコアの名前で保存してください。公開対象はHTMLと `css/`・`js/`・`images/` です。行数を維持するためVS Codeの保存時自動整形は無効にしています。

構成は[Docker Compose](https://docs.docker.com/reference/compose-file/services/)と[VS Code Tasks](https://code.visualstudio.com/docs/debugtest/tasks)の公式仕様に基づきます。NginxでHTML・CSSを配信する環境のためPHPは実行しません。

## ファイルと検証

- `index.html` をブラウザーで開くと、5ページを閲覧できます。外部フォント・jQueryの読み込みにはインターネット接続が必要です。
- `css/creative.css`：元のルールと順序を維持し、コメント・空行を除去して原則1ルール1行に整理。
- `js/site.js`：全ページ共通のメニュー処理。5項目のホバー処理を1つに集約。
- `images/`：既存サイトの画像22点。存在しなかったfaviconへの参照は削除。
- HTML：不要コメント・空のauthorを削除し、本文・全角スペース・要素構成を維持。ローカルリンクは `.html`、外部リソースはHTTPSに統一。
- 元の取得資料は `SITE_CRAWL.md` と `docs/site-crawl/` に保存。

HTML・CSSの合計は1,918行から578行へ削減（約70％、末尾空行を除く）。共通JavaScriptは10行です。

本番サイトへの反映は行っていません。サーバー側のPHPソースは取得できないため、問い合わせ送信に必要な `mail.php` は含まれません。フォームの送信先・フィールド名は既存のままです。本番導入時は既存PHP処理との接続とURLの扱いを確認してください。

検証：`node scripts/verify.mjs`。このCodex環境の同梱Playwright・PNG比較ライブラリとMicrosoft Edgeを使用します。5ページを1440px／390pxで比較し、CSSルール、本文、要素位置、画像差分、メニュー、内部リンクを確認します。結果は `docs/verification/results.json`、比較画像は同じフォルダに保存します。画像比較の色差閾値は0.01です。
