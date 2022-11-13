/* global localStorage */


const time = document.getElementById('time');
const startButton = document.getElementById('start');
const breakButton = document.getElementById('break');
const stopButton = document.getElementById('stop');



//　開始時間
let startTime;
//　停止時間
let stopTime = 0;
//　タイムアウトID
let timeoutID;
//  経過時間
let elapsed_time
//  終了時間
let end_time

// localStorageにstarted_atが保存されていた時の処理（保存されてるのは開始を押したままページを離れるかリロードしたとき）
if (localStorage.getItem('started_at') && !localStorage.getItem('stopped_at')) {
  // ここでページを読み込んだときの処理をしている
  window.addEventListener("load", function(){
    // localStorageからstarted_atを取得してstartTimeに代入後、時間を表示する関数を呼び出す処理
    startTime = localStorage.getItem('started_at');
    displayTime();
  })
}

// localStorageにstopped_atが保存されていてstarted_atが保存されてないときの処理（停止を押した後にページを離れるかリロードしたとき）
if (localStorage.getItem('stopped_at') && !localStorage.getItem('started_at')) {
  // ここでページを読み込んだ時の処理をしている
  window.addEventListener("load", function() {
    // localStorageからstopped_atを取得してstopTimeに代入
    stopTime = localStorage.getItem('stopped_at');

    // const currentTime = new Date(Date.now() - startTime + stopTime);
    // // padStart()メソッドは、文字列が指定した長さになるように延長する。
    // const h = String(currentTime.getHours() - 9).padStart(2, '0');
    // const m = String(currentTime.getMinutes()).padStart(2, '0');
    // const s = String(currentTime.getSeconds()).padStart(2, '0');
    // const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

    // time.textContent = h + ':' + m + ':' + s + '.' + ms;
  })
}

console.log(localStorage.getItem('stopped_at'));

if (localStorage.getItem('elapsed_time') && localStorage.getItem('end_time') && localStorage.getItem('start_time')) {
  window.addEventListener("load", function() {
      document.getElementById("item_elapsed_time").value = localStorage.getItem('elapsed_time');
      document.getElementById("item_end_time").value = localStorage.getItem('end_time');
      document.getElementById("item_start_time").value = localStorage.getItem('start_time');
  })
}

//　時間を表示する関数
function displayTime() {


  const currentTime = new Date(Date.now() - startTime + stopTime);
  // padStart()メソッドは、文字列が指定した長さになるように延長する。
  const h = String(currentTime.getHours() - 9).padStart(2, '0');
  const m = String(currentTime.getMinutes()).padStart(2, '0');
  const s = String(currentTime.getSeconds()).padStart(2, '0');
  const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

  time.textContent = h + ':' + m + ':' + s + '.' + ms;
  // setTimeout関数は1つ目の引数に指定した時間経過後に実行するプログラムを持たせる。
  // 2つ目の引数にはプログラムの実行を開始するまでの時間を持たせる。時間はミリ秒単位。
  timeoutID = setTimeout(displayTime, 10);
}

let count = 0;

// 開始ボタンが押されたときの処理
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  breakButton.disabled = false;
  stopButton.disabled = false;

  // itemモデルのstart_timeに代入
  // 開始ボタンを押した最初の一回だけ処理してほしいので前に定義したcountを使う
  if (count == 0) {
    const start_time = new Date(Date.now());
    localStorage.removeItem('start_time');
    localStorage.removeItem('end_time');
    localStorage.removeItem('elapsed_time');
    localStorage.setItem('start_time', start_time);
    document.getElementById("item_start_time").value = start_time;
  }
  startTime = Date.now();

  // localStorageにstartTimeを保存する
  localStorage.setItem('started_at', startTime);
  displayTime();
});

// 休憩ボタンを押したときの処理
breakButton.addEventListener('click', () => {
  startButton.disabled = false;
  breakButton.disabled = true;
  stopButton.disabled = true;

  // 休憩ボタンを押したとき開始ボタンを再開ボタンに変更する処理
  document.getElementById("start").value = "再開";

  // TimeoutIDを初期値に戻す
  clearTimeout(timeoutID);
  stopTime += (Date.now() - startTime);
  localStorage.setItem('stopped_at', stopTime);
  // localStorage.removeItem('started_at');
  count += 1;
});

// 終了ボタンを押したときの処理
stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  breakButton.disabled = true;
  stopButton.disabled = true;

  elapsed_time = new Date(Date.now() - startTime + stopTime);
  localStorage.setItem('elapsed_time', elapsed_time);
  elapsed_time.setHours(elapsed_time.getHours() - 9);


  // 終了時に経過時間を表示するための処理
  const result = document.getElementById("result");

  const h = String(elapsed_time.getHours()).padStart(2, '0');
  const m = String(elapsed_time.getMinutes()).padStart(2, '0');
  const s = String(elapsed_time.getSeconds()).padStart(2, '0');

  h1 = document.createElement("h1");
  h1.textContent =  h + '時間' + m + '分' + s + '秒';
  result.appendChild(h1);

  // form_withのf.hidden_fieldのvalueに経過時間と終了時間を追加する処理
  document.getElementById("item_elapsed_time").value = elapsed_time;
  end_time = new Date(Date.now());
  localStorage.setItem('end_time', end_time);

  document.getElementById("item_end_time").value = end_time;

  localStorage.removeItem('started_at');
  localStorage.removeItem('stopped_at');

  // 終了ボタンを押したときに初期値に戻す処理
  time.textContent = '00:00:00.000';
  // timeoutIDを初期値に戻す
  clearTimeout(timeoutID);
  stopTime = 0;

  // 再開ボタンを開始ボタンに戻す
  document.getElementById("start").value = "開始";

  count = 0;
});
