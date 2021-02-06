<?php
	class Dao {
		private static $pdo;

		/**
		 * コンストラクタ、PDOを生成しDBコネクションを確立する。
		 */
		private function __construct() {
			// DBコネクションを取得
			self::$pdo = new PDO('mysql:dbname=mysql;host=localhost', 'root', '');
		}

		/**
		 * インスタンスを取得する、外部から、コンストラクタは使用させない。
		 */
		public static function getInstance() {
			if (isset($pdo) == false) {
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
			$statement = self::$pdo->prepare("select * from usertable where user_name = :user and password = :password");
			$statement->bindValue('user', $user);
			$statement->bindValue('password', $password);

			$statement->execute();

			$userData = null;
			try {
				$userData = $statement->fetch();
				if ($userData == false) {
					$userData = 'Error';
				}
			} catch(Exception $e) {
				$userData = $e->getMessage();
			}
			return $userData;
		}
	}
?>