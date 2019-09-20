# Chat-space

グループでチャットをするアプリケーションです。
![chat-space](https://gyazo.com/ab78edeb6098e471146a973b5fd8eb04.png)

## 機能
- 新規登録機能
- グループ内でのチャット機能
- 複数人によるグループチャット機能
- チャット相手の検索機能
- チャットグループへのユーザー招待機能
- チャットの履歴表示機能
- 画像送信機能（carrierwave)
- チャットの自動更新
- 単体テスト
- 統合テスト

## 開発環境

- Ruby (2.5.1)
- Rails (5.0.7)
- JavaScript
- jQuery
- MySQL
- AWS(EC2,S3)
- RSpec

# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

### Index
- name

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

### Index
- name

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
