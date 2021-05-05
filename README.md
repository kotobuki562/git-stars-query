## このアプリについて

![GHQ](https://user-images.githubusercontent.com/67810971/117091924-c7484000-ad97-11eb-9eaf-c769ca7ec2de.png)


GitHubのスター登録したものをクエリ出来るアプリです。
GitHub標準のスターフィルターもあるのですが、少々使いにくさを感じることがあったり、モバイルアプリ版ではそもそもフィルター機能がなかったりするので作りました。

私はしばしば電車や移動の時に様々なGitHubリポジトリを見るのが好きで、よくスター登録機能を活用します。手軽に自分がスター登録したものを閲覧できるように作成しました。

👉 https://git-stars-query.vercel.app/

## 使い方

主に機能は3つ有ます

1. ユーザーIDで自身のスター登録したリポジトリを取得
2. 言語ごとでのクエリ
3. リポジトリネームでクエリ

画像付きで詳細を綴ります。

| ![localhost_3000_(iPhone 6_7_8) (1)](https://user-images.githubusercontent.com/67810971/117090970-cbbf2980-ad94-11eb-90c1-cc982b8ffaf0.png) | ![localhost_3000_(iPhone 6_7_8) (2)](https://user-images.githubusercontent.com/67810971/117090995-dd083600-ad94-11eb-9ec8-658ae1cd9240.png) |
| ------------- | ------------- |
| まずは一番上の入力フォームに自身のGitHubアカウントIDを入力します。入力後に右のアカウントボタンを押します。  | アカウントボタンを押すと入力されたGitHubアカウントIDに紐づいたスター登録したリポジトリ一覧が表示されます。  |


| ![localhost_3000_(iPhone 6_7_8) (3)](https://user-images.githubusercontent.com/67810971/117091270-b1d21680-ad95-11eb-9309-f3117289363c.png) | ![localhost_3000_(iPhone 6_7_8) (4)](https://user-images.githubusercontent.com/67810971/117091290-bac2e800-ad95-11eb-89c1-69d403582413.png) |
| ------------- | ------------- |
| 続いて言語ごとのクエリです。「languages」というセレクタの状態は全てのstarを取得します。画像では「Dart」を指定しているのでDart言語のスター登録済みのリポジトリ一覧画面取得されます。  | 最後にリポジトリネームでのクエリです。リポジトリネームに含まれる単語を入力すれば取得できます。 画像では「supa」と入力することでsupabaseに関連するリポジトリが多く取得されています。 |

## 注意事項

APIの仕様上、一回のリクエストに対して100件のデータ取得までとなります。100件以降は「Next」ボタンを押すことで次の100件を取得できます。
また、1時間あたり5000件以上のリクエストが行われると制限がかかりますのでご注意ください。
制限中はデータを取得できないので、私が登録しているスターを表示させています。制限が開始して1時間経つと再びデータ取得が可能になります。

## こだわりポイント

UI/UXを既存のGitHubよりも優れたものにできたと思います。

1. スマホ画面では1画面で最大6件のリポジトリが見られるところ。
2. リポジトリのホームページがあればリンク先へ飛ぶことができるリンクボタンがある(クリップのようなアイコン)

## 改善点

クエリの種類がまだ少ないため、機能補充を検討中。
