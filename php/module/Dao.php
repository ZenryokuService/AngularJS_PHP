<?php
	class {
		private $pdo;

		/**
		 * コンストラクタ、PDOを生成しDBコネクションを確立する。
		 */
		private function __construct() {
			// DBコネクションを取得
			$this->pdo = new PDO('mysql:dbname=mysql;host=localhost', 'root', '');
		}

		/**
		 * インスタンスを取得する、外部から、コンストラクタは使用させない。
		 */
		function getInstance() {
			if (isset($this->pdo) == false) {
				return new self();
			}
			return $this;
		}
		/**
		 * ログイン処理
		 * @param user ユーザー名
		 * @param password パスワード
		 * @return String ログイン出来たらユーザーデータ、出来なければ、文字列を返す
		 */
		function login($user, $password) {
			$statement = $this->pdo->prepare("select id from usertable where usern_ame = :user password = :password");
			$statement->bindValue('user', $user);
			$statement->bindValue('password', $password);

			$statement->execute();

			$userData = null;
			try {
				$userData = $statement->fetch();
				if (isset($userData) == false) {
					$userData = "Error";
				}
			} catch(Exception $e) {
				$userData = $e->getMessage();
			}
			return $userData;
		}
	}
?>