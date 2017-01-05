# dash_sleep_mac

Amazon dash buttonを使って、Macをスリープ状態にするボタンを作ってみた。

##動作確認環境
* Macbook Pro 13 Retina 2014
* macos Siera 10.12.2
* node.js 4.4.6
* node-dash-button 0.6.1

## 事前準備
1. [Amazon Dash ButtonをただのIoTボタンとして使う \- Qiita](http://qiita.com/jsoizo/items/3b8bba4160f41aef20f4#%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97)などを参考にAmazon dash buttonのセットアップ
2. [Amazon Dash ButtonをただのIoTボタンとして使う \- Qiita](http://qiita.com/jsoizo/items/3b8bba4160f41aef20f4#%E3%83%9C%E3%82%BF%E3%83%B3%E3%81%AEmac%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%E3%82%92%E7%9F%A5%E3%82%8B)をなどを参考にAmazon dash buttonのMAC Addressを取得する
2. [macでNode\.jsの環境設定 \- Qiita](http://qiita.com/tagosaku324/items/bf1fe149c38c99728c72)などを参考にnode.js環境をセットアップ

## dash\_sleep\_macのセットアップ
1. dash\_sleep\_macをインストールする

	```sh
	bash-3.2$ gitclone https://github.com/katsuyuki-nakamura/dash_sleep_mac.git
	bash-3.2$ cd dash_sleep_mac
	bash-3.2$ npm install
	```
2. config/config.jsonにAmazon dash buttonのMAC Addressを設定する
	
	```json
	{
	  "address":"88:71:e5:fc:8d:91"
	}
	```

## 実行
1. dash\_sleep\_macを起動する

	```bash
	bash-3.2$ cd dash_sleep_mac
	bash-3.2$ sudo npm run start
	Password:
	
	> dash_sleep_mac@1.0.0 start /Users/katsuyuki/work/amazon_dash/dash_sleep_mac
	> node index.js
	
	If 88:71:e5:fc:8d:91 is pressed, mac goes to sleep
	```

2. Amazon dash button を押す

	```bash
	88:71:e5:fc:8d:91 is pressed.
	Sleeping now...
	```

## 仕組み
1. node-dash-buttonでAmazon dash buttonのプッシュを検出
2. child_process#exec経由で、pmsetコマンドを実行する。

	```javascript
	var config = require('./config/config.json');
	var dash_button = require('node-dash-button');
	var exec = require('child_process').exec;
	
	console.log('If ' + config.address + ' is pressed, mac goes to sleep');
	
	var dash = dash_button(config.address);
	dash.on("detected", function() {
	    console.log(config.address + ' is pressed.');
	    var child = exec('pmset sleepnow', function(error, stdout, stderr) {
	        console.log(stdout);
	        console.log(stderr);
	        if (error !== null) {
	            console.log('exec error: ' + error);
	        }
	    });
	});
	```


##参考
* [macでNode\.jsの環境設定 \- Qiita](http://qiita.com/tagosaku324/items/bf1fe149c38c99728c72)
* [Amazon Dash ButtonをただのIoTボタンとして使う \- Qiita](http://qiita.com/jsoizo/items/3b8bba4160f41aef20f4)
* [hortinstein/node\-dash\-button: A small module to emit events when an Amazon Dash Button is pressed](https://github.com/hortinstein/node-dash-button)
* [Child Process Node\.js v0\.11\.11 Manual & Documentation](http://nodejs.jp/nodejs.org_ja/api/child_process.html#child_process_child_process_exec_command_options_callback)