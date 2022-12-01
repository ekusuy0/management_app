/* global localStorage */

const time = document.getElementById('time');
const startButton = document.getElementById('start');
const breakButton = document.getElementById('break');
const stopButton = document.getElementById('stop');
const saveButton = document.getElementById('save');
const result = document.getElementById("result");
const close = document.getElementById("close-button");
const container = document.getElementById('modal-container');
const save = document.getElementById('savebutton');
const result_display = document.getElementById('result-display');
var error = "";


//　開始時間
let startTime;
//　停止時間
let stopTime = 0;
//　タイムアウトID
let timeoutID;
//  経過時間
let elapsed_time;
//  終了時間
let end_time;

let check;

// localStorageにstarted_atが保存されていた時の処理（保存されてるのは開始を押したままページを離れるかリロードしたとき）
if (localStorage.getItem('started_at') && !localStorage.getItem('stopped_at')) {

  // ここでページを読み込んだときの処理をしている
  window.addEventListener("load", function(){
    startButton.style.display = "none";
    breakButton.style.display = "inline";
    stopButton.style.display = "inline";
    // localStorageからstarted_atを取得してstartTimeに代入後、時間を表示する関数を呼び出す処理
    startTime = Number(localStorage.getItem('started_at'));
    displayTime();
  })
}

// localStorageにstopped_atとstarted_atが保存されているときの処理（休憩を押した後にページを離れるかリロードしたとき）
if (localStorage.getItem('stopped_at') && localStorage.getItem('started_at') && !localStorage.getItem('check')) {
  // ここでページを読み込んだ時の処理をしている
  window.addEventListener("load", function() {

    stopTime = Number(localStorage.getItem('stopped_at'));


    // 休憩ボタンを押下したときの表示されている数字をlocalStorageから取得してそれぞれ代入する
    const H = localStorage.getItem('h');
    const M = localStorage.getItem('m');
    const S = localStorage.getItem('s');
    const MS = localStorage.getItem('ms');

    time.textContent = H + ':' + M + ':' + S + '.' + MS;
  })
}

// localStorageにstopped_atとstarted_atが保存されているときの処理（再開ボタンを押した後にページを離れるかリロードしたとき）
if (localStorage.getItem('stopped_at') && localStorage.getItem('count') && localStorage.getItem('check')) {
  window.addEventListener("load", function() {
    startButton.style.display = "none";
    breakButton.style.display = "inline";
    stopButton.style.display = "inline";

    startTime = Number(localStorage.getItem('started_at'));
    stopTime = Number(localStorage.getItem('stopped_at'));
    displayTime();
  })
}


console.log(localStorage.getItem('stopped_at'));

if (localStorage.getItem('elapsed_time') && localStorage.getItem('end_time') && localStorage.getItem('start_time')) {
  window.addEventListener("load", function() {
    if (document.getElementById("item_elapsed_time")) {
        document.getElementById("item_elapsed_time").value = localStorage.getItem('elapsed_time');
        document.getElementById("item_end_time").value = localStorage.getItem('end_time');
        document.getElementById("item_start_time").value = localStorage.getItem('start_time');
    }
  })
}

// 結果がリロードしても消えないよう
if (localStorage.getItem('result')) {
  window.addEventListener("load", function() {
    result.innerHTML = localStorage.getItem('result');
    if (save) {
      save.style.display = 'inline';
    }
  })
} else {
  if (save) {
    save.style.display = 'none';
  }
}

//　時間を表示する関数
function displayTime() {

  const currentTime = new Date(Date.now() - startTime + stopTime);

  // padStart()メソッドは、文字列が指定した長さになるように延長する。
  const h = String(currentTime.getHours() - 9).padStart(2, '0');
  const m = String(currentTime.getMinutes()).padStart(2, '0');
  const s = String(currentTime.getSeconds()).padStart(2, '0');
  const ms = String(currentTime.getMilliseconds()).padStart(3, '0');


  // localStorageから削除する
  localStorage.removeItem('h');
  localStorage.removeItem('m');
  localStorage.removeItem('s');
  localStorage.removeItem('ms');

  // localStorageに保存する
  localStorage.setItem('h', h);
  localStorage.setItem('m', m);
  localStorage.setItem('s', s);
  localStorage.setItem('ms', ms);

  time.textContent = h + ':' + m + ':' + s + '.' + ms;
  // setTimeout関数は1つ目の引数に指定した時間経過後に実行するプログラムを持たせる。
  // 2つ目の引数にはプログラムの実行を開始するまでの時間を持たせる。時間はミリ秒単位。
  timeoutID = setTimeout(displayTime, 10);
}

let count = 0;


// 開始ボタンが押されたときの処理
startButton.addEventListener('mousedown', () => {
  startButton.style.display = "none";
  breakButton.style.display = "inline";
  stopButton.style.display = "inline";

  // itemモデルのstart_timeに代入
  // 開始ボタンを押した最初の一回だけ処理してほしいので前に定義したcountを使う
  if (localStorage.getItem('count') == null) {
    const start_time = new Date(Date.now());
    if (time.childNodes.length != 0){
      if (document.getElementById("item_start_time")) {
        var repty = confirm('保存せずに開始を押すと前回の結果が消えてしまいます。よろしいですか？');
        if (repty) {
          localStorage.clear();
          if (save) {
            save.style.display = 'none';
          }
        } else {
          startButton.style.display = "inline";
          breakButton.style.display = "none";
          stopButton.style.display = "none";
          console.log(a);
        }
      } else {
        localStorage.clear();
      }
    }
    localStorage.setItem('start_time', start_time);
    if (document.getElementById("item_start_time")) {
      document.getElementById("item_start_time").value = start_time;
    }
  }
  startTime = Date.now();

  check = "true";
  localStorage.setItem('check', check);

  // localStorageにstartTimeを保存する
  localStorage.setItem('started_at', startTime);
  // localStorage.removeItem('stopped_at');
  displayTime();
});

// 休憩ボタンを押したときの処理
breakButton.addEventListener('mousedown', () => {

  startButton.style.display = "inline";
  breakButton.style.display = "none";
  stopButton.style.display = "none";

  // 休憩ボタンを押したとき開始ボタンを再開ボタンに変更する処理
  document.getElementById("start").value = "再開";

  // TimeoutIDを初期値に戻す
  clearTimeout(timeoutID);
  stopTime += (Date.now() - startTime);

  localStorage.setItem('stopped_at', stopTime);
  // localStorage.removeItem('started_at');
  count += 1;
  localStorage.setItem('count', count);
  localStorage.removeItem('check');
});

// 終了ボタンを押したときの処理
stopButton.addEventListener('mousedown', () => {
  startButton.style.display = "inline";
  breakButton.style.display = "none";
  stopButton.style.display = "none";

  elapsed_time = new Date(Date.now() - startTime + stopTime);
  localStorage.setItem('elapsed_time', elapsed_time);
  elapsed_time.setHours(elapsed_time.getHours() - 9);


  // 終了時に経過時間を表示するための処理

  const h = String(elapsed_time.getHours()).padStart(2, '0');
  const m = String(elapsed_time.getMinutes()).padStart(2, '0');
  const s = String(elapsed_time.getSeconds()).padStart(2, '0');

  const text = h + '時間' + m + '分' + s + '秒';
  localStorage.setItem('result', text);
  result.innerHTML = text;

  // form_withのf.hidden_fieldのvalueに経過時間と終了時間を追加する処理
  if (document.getElementById("item_elapsed_time")) {
    document.getElementById("item_elapsed_time").value = elapsed_time;
  }
  end_time = new Date(Date.now());
  localStorage.setItem('end_time', end_time);

  if (document.getElementById("item_end_time")) {
    document.getElementById("item_end_time").value = end_time;
  }

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

  // localStorageから削除する
  localStorage.removeItem('h');
  localStorage.removeItem('m');
  localStorage.removeItem('s');
  localStorage.removeItem('ms');
  localStorage.removeItem('count');

  if (error != "") {
    return false;
  } else {
    container.classList.add("active");
    return false;
  }
});

close.addEventListener('mousedown', () => {
  container.classList.remove("active");
  if (localStorage.getItem('result')) {
    if (save) {
      save.style.display = 'inline';
    }
    if (result_display) {
      result_display.style.display = "inline";
    }
  }
});

if (save) {
  save.addEventListener('click', () => {
    container.classList.add("active");
  })
}

if (result_display) {
  result_display.addEventListener('click', () => {
    container.classList.add("active");
  })
}

// if (saveButton) {
//   saveButton.addEventListener('mousedown', () => {
//     localStorage.clear();
//   });
// }
