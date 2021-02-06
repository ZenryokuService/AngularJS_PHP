<?php
use PHPUnit\Framework\TestCase;
require_once '../php/module/Dao.php';

class StackTest extends TestCase {

    public function testDaoLogin() {
        $dao = Dao::getInstance();
        $this->assertNotNull($dao);

        // test1のログインテスト
        $userData = $dao->login('test1', 'test');
        $this->assertTrue(isset($userData));
        $this->assertEquals('test1', $userData['user_name']);
        $this->assertEquals('test', $userData['password']);

        // test2のログインテスト
        $userData2 = $dao->login('test2', 'test');
        $this->assertTrue(isset($userData2));
        $this->assertEquals('test2', $userData2['user_name']);
        $this->assertEquals('test', $userData2['password']);

    }
}