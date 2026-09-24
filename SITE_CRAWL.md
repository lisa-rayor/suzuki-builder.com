# 鈴木工務店株式会社｜既存ホームページ クロール資料

取得日：2026年9月24日（日本時間）  
対象：[https://suzuki-builder.com/](https://suzuki-builder.com/)  
目的：追加ページを制作する際に、既存サイトの掲載内容・構成・共通要素を参照するための資料。

## 1. 調査範囲と取得結果

- トップページを起点に、同一ホストのHTML内にある公開リンクを順に取得した。
- HTMLは6 URLで取得成功（すべてHTTP 200）。トップの `/` と `/index.php` は取得したHTMLが一致したため、内容としては5ページに整理した。
- 発見した対象内部リンクはすべて巡回済み。リンクされていないページ、サーバー内のファイル、管理画面の存在までは確認できない。
- `/robots.txt` はHTTP 200。取得内容に `Disallow`・`Sitemap` の指定はなかった。`/sitemap.xml` はHTTP 404。
- 共通CSS `/css/creative.css` も取得した。
- Instagramなど外部サイトへのリンクは記録のみ。フォーム送信、電話発信は実施していない。`mail.php` はフォームの送信先として記録し、ページとして巡回していない。
- 画像は参照URLを記録した。画像ファイルの取得・表示確認、ブラウザーでのレイアウト検証、フォームの動作検証は今回の対象外。
- 本文は公開ページの表記を基本的に維持し、見出し・表・改行をMarkdown向けに整理した。共通ヘッダーとフッターは第3章へ集約した。
- 会社情報や許可番号はサイトの掲載内容であり、実際の最新情報との照合は行っていない。

取得したHTML・リンク・時刻の記録：[crawl-data.json](docs/site-crawl/crawl-data.json)  
取得したスタイルシート：[creative.css](docs/site-crawl/creative.css)

## 2. ページ一覧とサイト構成

| ページ | メニュー表記 | URL | 主な掲載内容 |
| --- | --- | --- | --- |
| トップ | HOME／トップ | [トップ](https://suzuki-builder.com/) | キャッチコピー、会社紹介、施工事例3件、問い合わせ導線 |
| 会社概要 | COMPANY／会社概要 | [company.php](https://suzuki-builder.com/company.php) | 会社の思い、代表者、許可、沿革、連絡先 |
| 事業内容 | SERVICE／事業内容 | [service.php](https://suzuki-builder.com/service.php) | 対応方針、工事メニュー6分類 |
| 施工事例 | WORKS／施工事例 | [works.php](https://suzuki-builder.com/works.php) | 写真と見出しによる施工事例7件 |
| お問い合わせ | CONTACT／お問い合わせ | [contact.php](https://suzuki-builder.com/contact.php) | 案内文、問い合わせフォーム |

トップには別URLとして [index.php](https://suzuki-builder.com/index.php) が存在し、サイト内のHOMEリンクはこのURLを使用している。

```text
トップ（/ または /index.php）
├── 会社概要（/company.php）
├── 事業内容（/service.php）
├── 施工事例（/works.php）
└── お問い合わせ（/contact.php）
    └── フォーム送信先：/mail.php（POST・未送信）
```

全ページに同じ5項目のヘッダー／フッターメニューがある。今回取得したHTMLでは、施工事例の個別詳細リンク、記事一覧、ページ送り、サイト内検索は確認できなかった。

## 3. 全ページの共通要素

### ヘッダー

- ロゴから `/index.php` へリンク。
- パソコン用メニュー：HOME / COMPANY / SERVICE / WORKS / CONTACT。
- HTML内のスクリプトでは、パソコン用メニューのホバー時に日本語名へ切り替える処理がある。
- スマートフォン用メニュー：トップ / 会社概要 / 事業内容 / 施工事例 / お問い合わせ。
- スマートフォン用メニューボタンの開閉処理がある。実操作は未検証。

### 共通お問い合わせエリア

見出し：CONTACT／お問い合わせ

> リフォームの流れや費用、お見積もりなどご質問、ご相談等お気軽にお問い合わせください。

| 導線 | 現在の表示 | リンク先 |
| --- | --- | --- |
| 電話 | 06-6391-1382 | `tel:0663911382` |
| 問い合わせページ | CONTACT FROM | `/contact.php` |

`CONTACT FROM` は公開HTMLの表記をそのまま記録している。

### フッターの連絡先

| 項目 | 掲載内容 |
| --- | --- |
| 郵便番号 | 532-0005 |
| 所在地 | 大阪市淀川区西三国3-11-30 |
| TEL | 06-6391-1382 / 06-6391-4716 |
| FAX | 06-6391-4736 |
| Instagram | [suzuki.koumutenn](https://www.instagram.com/suzuki.koumutenn/) |
| 著作権表示 | ©suzuki-builder.com |

出典：[トップページ](https://suzuki-builder.com/)および各下層ページの共通ヘッダー／フッター。

## 4. トップページの掲載内容

出典：[トップページ](https://suzuki-builder.com/)

### メインビジュアル

> Professionals  
> who shape customer's  
> thoughts.

> 鈴木工務店はお客様の思いを形にするプロフェッショナルです。

背景画像はCSSから参照される `images/top_main.jpg`。

### COMPANY

#### 「鈴木工務店」が目指すところは

家族と過ごす心地良い空間の家づくり。  
こだわりが詰まった特別なリノベーション。  
私たちはお客様の思いを形にするプロフェッショナルです。

導線：MORE → [会社概要](https://suzuki-builder.com/company.php)

### WORKS／施工事例

| 順序 | 見出し | 掲載補足 | 画像 |
| --- | --- | --- | --- |
| 1 | 外観をスタイリッシュにリフォーム | 兵庫県 S様邸 | `images/works01.jpg` |
| 2 | 家の全てを支える基礎工事 | 兵庫県 S様邸 | `images/works02.jpg` |
| 3 | 家づくりの後半、建方・棟上げ | 兵庫県 S様邸 | `images/works03.jpg` |

導線：MORE → [施工事例](https://suzuki-builder.com/works.php)

## 5. 会社概要ページの掲載内容

出典：[会社概要](https://suzuki-builder.com/company.php)  
ページ見出し：COMPANY／会社概要

### 鈴木工務店の思い

今も昔も、家を建て・修理するのは『大工』です。  
当社の[四代目・五代目大工]がお客さまの想いを真心こめて【カタチ】にします。  
ちょっとした工夫で大切な住まいが広く・快適な空間に生まれ変わる。  
鈴木工務店ならではのご提案をします。  
当社の一貫した設計‣施工、管理で中間コストを削減し、より良い『お家』へ。

### 会社概要

| 項目 | 掲載内容 |
| --- | --- |
| 会社名 | 鈴木工務店株式会社 |
| 代表者 | 鈴木 敬二 |
| 建設業許可 | 建築工事業／とび・土工工事業／内装仕上工事業 |
| 許可番号 | 大阪府知事許可(般-2)第154200号 |
| 創業 | 昭和34年 4月 |
| 設立 | 令和2年 6月 |
| 住所 | 〒532-0005 大阪市淀川区西三国3-11-30 |
| TEL | 06-6391-1382 / 06-6391-4716 |
| FAX | 06-6391-4736 |

## 6. 事業内容ページの掲載内容

出典：[事業内容](https://suzuki-builder.com/service.php)  
ページ見出し：SERVICE／事業内容

### 冒頭の案内

鈴木工務店は家の修理から企画設計施工まで  
誠実・格安・迅速に対応致します。

大小に関わらずご予算・ご要望にあわせたプランをご提案致します。  
大切な住まいのリフォームは、経験・技術力共に豊富な鈴木工務店のプロフェッショナルにお任せ下さい。  
マンション内外装・店舗;設計‣施工・工場等あらゆる建物に対応致します。

※「店舗;設計‣施工」等の表記は取得した本文のまま。

### 工事メニュー

| 分類 | 掲載されている説明 | アイコン |
| --- | --- | --- |
| 木工事 | 耐震補強工事間取り模様替え、家屋建方造作一切 | `images/service_icon01.svg` |
| 内装・左官工事 | クロス、カーペット張替、クローゼット取付、外部モルタル塗など | `images/service_icon02.svg` |
| 屋根工事 | 雨漏り修理、瓦(和・洋)ふき替え、各種屋根工事全般 | `images/service_icon03.svg` |
| 外壁・塗装工事 | 各部補修、各種サイディング貼、各種吹付け、ペンキ塗替え、室内塗装など | `images/service_icon04.svg` |
| 建具工事 | 各アルミサッシ取付加工、木・鉄製建具、襖、シャッターなど | `images/service_icon05.svg` |
| エクステリア | 門扉、門柱、石工事、フェンス、カーポート、ベランダなど | `images/service_icon06.svg` |

各工事メニューに個別詳細ページへのリンクは付いていない。

## 7. 施工事例ページの掲載内容

出典：[施工事例](https://suzuki-builder.com/works.php)  
ページ見出し：WORKS／施工事例

| 順序 | 見出し | 所在地・施主の掲載 | 画像URL |
| --- | --- | --- | --- |
| 1 | 外観をスタイリッシュにリフォーム | 兵庫県 S様邸 | [works01.jpg](https://suzuki-builder.com/images/works01.jpg) |
| 2 | 家の全てを支える基礎工事 | 兵庫県 S様邸 | [works02.jpg](https://suzuki-builder.com/images/works02.jpg) |
| 3 | 家づくりの後半、建方・棟上げ | 兵庫県 S様邸 | [works03.jpg](https://suzuki-builder.com/images/works03.jpg) |
| 4 | ウッドデッキ | 記載なし | [works04.jpg](https://suzuki-builder.com/images/works04.jpg) |
| 5 | 居酒屋 | 記載なし | [works05.jpg](https://suzuki-builder.com/images/works05.jpg) |
| 6 | 喫茶店 | 記載なし | [works06.jpg](https://suzuki-builder.com/images/works06.jpg) |
| 7 | 増築 | 記載なし | [works07.jpg](https://suzuki-builder.com/images/works07.jpg) |

取得したページには、工期・費用・施工年月・面積・詳しい工事説明・個別詳細へのリンクは掲載されていない。最初の3件はトップページにも掲載されている。

## 8. お問い合わせページの掲載内容

出典：[お問い合わせ](https://suzuki-builder.com/contact.php)  
ページ見出し：CONTACT／お問い合わせ

### 案内文

増改築・建て替えに関するご質問・ご相談は、下記フォームよりお気軽にお問い合わせ下さい。  
メールでのお問い合わせについては、確認後お返事まで少々お時間をいただく場合がございますので、ご了承下さい。

### フォーム

| 表示項目 | 必須の表示 | HTMLの入力種別 | 送信フィールド名 |
| --- | --- | --- | --- |
| お名前 | 必須 | `input type="text"` | `お名前` |
| TEL | なし | `input type="tel"` | `TEL` |
| MAIL | 必須 | `input type="email"` | `メールアドレス` |
| お問い合わせ内容 | 必須 | `textarea` | `お問い合わせ内容` |

- ボタン：送信する。
- 送信方式：POST。
- 送信先：`https://suzuki-builder.com/mail.php`。
- 「必須」は画面用ラベルの記録。取得した入力要素にはHTMLの `required` 属性がなく、送信先での検証内容は未確認。
- このページのHTML内には、公開メールアドレス、営業時間、返信日数の具体的な記載、プライバシーポリシーへのリンク、個人情報の同意チェック欄は確認できなかった。

## 9. SEO・ページメタデータ

### title

| ページ | HTMLのtitle |
| --- | --- |
| トップ | 鈴木工務店株式会社 リフォーム 増改築 建て替え リノベーション 内装工事 塗装 外壁 新築 大阪 淀川区 東三国 |
| 会社概要 | 会社概要　鈴木工務店株式会社 リフォーム 増改築 建て替え リノベーション 内装工事 塗装 外壁 新築 大阪 淀川区 東三国 |
| 事業内容 | 事業内容　鈴木工務店株式会社 リフォーム 増改築 建て替え リノベーション 内装工事 塗装 外壁 新築 大阪 淀川区 東三国 |
| 施工事例 | 施工事例　鈴木工務店株式会社 リフォーム 増改築 建て替え リノベーション 内装工事 塗装 外壁 新築 大阪 淀川区 東三国 |
| お問い合わせ | お問い合わせ　鈴木工務店株式会社 リフォーム 増改築 建て替え リノベーション 内装工事 塗装 外壁 新築 大阪 淀川区 東三国 |

### 全ページ共通のdescription

> 鈴木工務店株式会社ならではのプランで、お客様の思いを素敵な空間にリノベーションします。

### 全ページ共通のkeywords

```text
住宅リノベーション,鈴木工務店株式会社,リフォーム,大阪,淀川区,増改築,建て替え,内装工事,塗装,外壁,造園,耐震補強,住宅ローン
```

### その他の確認事項

- 言語：`ja`。文字コード：UTF-8。
- viewport：`width=device-width, initial-scale=1`。
- 取得したHTMLにはcanonical、OGP、Twitter Card、JSON-LDの設定を確認できなかった。
- トップはCOMPANY・WORKS・共通CONTACTにそれぞれ `h1` がある。下層ページもページ見出しと共通CONTACTに `h1` がある。
- キーワードに記載があることだけでは、サービスの具体的な提供内容や対応地域の範囲を確定できない。

出典：各ページのHTML `head` および見出し要素。詳細は取得記録を参照。

## 10. 既存ページ制作に関わるスタイル・構造

以下は公開HTMLと[共通CSS](https://suzuki-builder.com/css/creative.css)の記述から確認した内容。実画面の見た目を検証した結果ではない。

| 項目 | 現在の記述 |
| --- | --- |
| URL形式 | `/company.php` などのPHP拡張子 |
| 共通CSS | `/css/creative.css` |
| 本文文字色／背景 | `#1a1a1a`／`#fff` |
| 主な補助色 | `#333`、`#666`、`#999`、`#ccc`、`#f2f2f2` |
| 本文フォント指定 | `futura-pt`、`source-han-sans-japanese`、ヒラギノ、游ゴシック、メイリオ等の順 |
| 外部フォントの読み込み | Google Fonts：Noto Sans JP（500・900）、Lato |
| 英字見出し | `.title h1` にLato |
| コンテンツ幅 | `.wrap` は最大1050px、幅96%、左右中央配置 |
| 基本文字サイズ | 標準設定16pxを前提に本文約16px、h1約40px、h2約20px |
| モバイル切り替え | `max-width: 767px` |
| カード配置 | パソコンでは基本3列、モバイルでは1列 |
| ボタン | 通常幅250px、白黒の背景・枠・文字、ホバー時に色変更 |
| 下層ページ | `body id="sub_page"` とページ別class、`.sub_menu` に英字見出し＋日本語名 |
| 下層見出し装飾 | `.title h1::after` に横罫線 |
| 共通部品 | ヘッダー、スマートフォンメニュー、CONTACTエリア、フッター |
| JavaScript | jQuery 1.12.4の読み込み、メニュー開閉、メニューの英日表示切り替え |
| アイコン | Font Awesome 5.0.6のCSSとSVG画像 |

公開されたHTMLから、サーバー側のPHPテンプレート分割、CMSの有無、管理画面、メール処理の実装は確認できない。今回の作業開始時点では作業フォルダにサイトの実装ファイルはなかった。

## 11. 画像・素材の参照先

画像の表示内容そのものではなく、HTMLの参照箇所・alt属性・CSSから用途を整理している。

| 用途 | 参照URL |
| --- | --- |
| ヘッダーロゴ | [logo.svg](https://suzuki-builder.com/images/logo.svg) |
| フッターロゴ | [logo_white.svg](https://suzuki-builder.com/images/logo_white.svg) |
| ロゴマーク | [logo_icon.svg](https://suzuki-builder.com/images/logo_icon.svg) |
| Instagramアイコン | [insta_icon.svg](https://suzuki-builder.com/images/insta_icon.svg) |
| ファビコン | [favicon.ico](https://suzuki-builder.com/images/favicon.ico) |
| トップの背景（CSS参照） | [top_main.jpg](https://suzuki-builder.com/images/top_main.jpg) |
| トップの会社紹介 | [top_company.jpg](https://suzuki-builder.com/images/top_company.jpg) |
| 事業内容のメイン画像 | [service_img.jpg](https://suzuki-builder.com/images/service_img.jpg) |
| 木工事アイコン | [service_icon01.svg](https://suzuki-builder.com/images/service_icon01.svg) |
| 内装・左官工事アイコン | [service_icon02.svg](https://suzuki-builder.com/images/service_icon02.svg) |
| 屋根工事アイコン | [service_icon03.svg](https://suzuki-builder.com/images/service_icon03.svg) |
| 外壁・塗装工事アイコン | [service_icon04.svg](https://suzuki-builder.com/images/service_icon04.svg) |
| 建具工事アイコン | [service_icon05.svg](https://suzuki-builder.com/images/service_icon05.svg) |
| エクステリアアイコン | [service_icon06.svg](https://suzuki-builder.com/images/service_icon06.svg) |
| 施工事例の背景（CSS参照） | [bg_works.jpg](https://suzuki-builder.com/images/bg_works.jpg) |
| 共通問い合わせエリア画像 | [bg_contact.jpg](https://suzuki-builder.com/images/bg_contact.jpg) |

施工事例写真7点のURLは第7章に掲載。

## 12. 追加ページを検討するための現状整理

ここでは新しい内容を補わず、今回の公開ページから確認できる範囲を整理する。

| 検討対象 | 既存サイトにある情報 | 今回取得したページには見当たらない情報 |
| --- | --- | --- |
| 会社の特徴 | 四代目・五代目大工、設計・施工・管理の一貫対応、中間コスト削減という説明 | 職人個別の紹介、資格詳細、詳しい沿革 |
| 工事内容 | 6分類の工事メニューと短い説明 | 工事種別ごとの詳細ページ、工程、費用目安 |
| 施工実績 | 写真7点と見出し、一部の所在地・施主表記 | 施工詳細、工期、費用、前後比較の説明、お客様の声 |
| 相談方法 | 電話と問い合わせフォーム | 相談から引き渡しまでの具体的な流れ、FAQ、営業時間 |
| 対応地域 | 所在地は大阪市淀川区、事例の一部は兵庫県 | 対応エリアの明確な一覧・境界 |
| 個人情報の取り扱い | 問い合わせフォームで氏名・電話・メール・本文を入力 | プライバシーポリシーへの公開リンク、同意欄 |

新規ページで料金、保証、対応地域、資格、補助金、営業時間などを記載する場合は、既存サイトだけでは裏付けられないため別途実情報が必要となる。

## 13. 取得URLの記録

| URL | 結果 | この資料での扱い |
| --- | --- | --- |
| `https://suzuki-builder.com/` | 200 | トップ本文 |
| `https://suzuki-builder.com/index.php` | 200 | トップとHTMLが同一 |
| `https://suzuki-builder.com/company.php` | 200 | 会社概要本文 |
| `https://suzuki-builder.com/service.php` | 200 | 事業内容本文 |
| `https://suzuki-builder.com/works.php` | 200 | 施工事例本文 |
| `https://suzuki-builder.com/contact.php` | 200 | 問い合わせ本文・フォーム項目 |
| `https://suzuki-builder.com/robots.txt` | 200 | クロール指定の確認 |
| `https://suzuki-builder.com/sitemap.xml` | 404 | サイトマップを取得できず |
| `https://suzuki-builder.com/css/creative.css` | 200 | 共通スタイルの確認 |

`crawl-data.json` は上記のうち6つのHTML URLの取得記録。robots.txtとsitemap.xmlの結果はこの表に記録し、CSSは別ファイルで保存している。
