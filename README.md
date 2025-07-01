# シノビガミ公式風キャラクターシート

このリポジトリは、TRPG「シノビガミ」用のキャラクターシートをWebブラウザ上で作成・管理できるReact + TypeScript製のアプリケーションです。公式シート風のデザインで、直感的な操作が可能です。

## 主な機能
- **基本情報の入力**（名前、流派、秘密、表の顔、年齢、性別、居所）
- **能力値の設定**（体術・忍術・妖術・謀術・戦術・器術）
  - 公式シート風の欄をクリックして数値を設定
- **生命力の管理**（現在値・最大値）
- **忍法の管理**（追加・削除・編集）
- **忍具の管理**（追加・削除・編集）
- **備考欄**（自由記述）
- **ローカル保存**（自動保存）
- **JSON形式でのエクスポート・インポート**（保存・読み込みボタン）
- **レスポンシブデザイン**（スマホ・PC両対応）

## 実行方法

### 1. 必要な環境
- Node.js（v16以上推奨）
- npm

### 2. セットアップ
```bash
# リポジトリをクローン
$ git clone git@github.com:1010kazu/shinobigami-character-sheet.git
$ cd shinobigami-character-sheet

# 依存パッケージをインストール
$ npm install
```

### 3. 開発サーバーの起動
```bash
$ npm start
```

- ブラウザで `http://localhost:3000` を開くとキャラクターシートが利用できます。

### 4. 本番ビルド
```bash
$ npm run build
```

- `build/` ディレクトリに本番用ファイルが出力されます。

## ディレクトリ構成
```
shinobigami-character-sheet/
├── src/
│   ├── components/         # Reactコンポーネント
│   ├── types/              # 型定義
│   ├── App.tsx             # エントリポイント
│   └── ...
├── public/
├── package.json
├── README.md
└── ...
```

---

### 作者
- [1010kazu (GitHub)](https://github.com/1010kazu)

---
