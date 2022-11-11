
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

// 開始ボタンが押されたときの処理
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  breakButton.disabled = false;
  stopButton.disabled = false;

  startTime = Date.now();
  displayTime();
});

// 休憩ボタンを押したときの処理
breakButton.addEventListener('click', () => {
  startButton.disabled = false;
  breakButton.disabled = true;
  stopButton.disabled = false;

  clearTimeout(timeoutID);
  stopTime += (Date.now() - startTime);
});

// 終了ボタンを押したときの処理
stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  breakButton.disabled = true;
  stopButton.disabled = true;

  time.textContent = '00:00:00.000';
  clearTimeout(timeoutID);
  stopTime += (Date.now() - startTime);
  stopTime = 0;
})