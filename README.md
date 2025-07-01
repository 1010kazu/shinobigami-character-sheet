# シノビガミ公式風キャラクターシート

このリポジトリは、TRPG「シノビガミ」用のキャラクターシートをWebブラウザ上で作成・管理できるReact + TypeScript製のアプリケーションです。公式シート風のデザインで、直感的な操作が可能です。

## 主な特徴
- **公式シート風の美しいUI**（PC/タブレット/スマホ対応
- **キャラクター基本情報の入力**
  - 名前、プレイヤー名、年齢、性別、流派（プルダウン）、階級、流儀（自動入力）、仇敵（自動入力）、表の顔、信念（プルダウン）、功績、背景（多行テキスト）
- **能力値表**
  - 12行6列の技能表からクリックで能力値を選択
  - ヘッダー（器術・体術・忍術・謀術・戦術・妖術）は1つだけ選択可能
- **忍法管理**
  - 忍法名、タイプ（攻撃/サポート/装備）、指定特技、間合い、コスト、効果を入力
  - 追加後はカード形式で横並び表示（3行構成）
- **忍具管理**
  - 兵糧丸・神通丸・遁甲符の個数を入力
- **ローカル保存**（自動保存）
- **JSON形式でのエクスポート・インポート**
- **レスポンシブデザイン**（PC/タブレット/スマホ対応）

## 使い方

### 1. 必要な環境
- Node.js（v16以上推奨）
- npm
- またはDocker

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

### 4. Dockerで起動する場合
```bash
$ docker build -t shinobigami-character-sheet .
$ docker run --rm -p 3000:3000 shinobigami-character-sheet
```

## ディレクトリ構成
```
shinobigami-character-sheet/
├── src/
│   ├── components/
│   ├── types/
│   └── ...
├── public/
├── package.json
├── Dockerfile
├── .dockerignore
└── ...
```

---

### 作者
- [1010kazu (GitHub)](https://github.com/1010kazu)

---


