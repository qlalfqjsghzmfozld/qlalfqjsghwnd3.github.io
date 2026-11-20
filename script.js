// 상태 변수
let wornDigits = [];
let isRunning = false;
let calculatedTotalCases = 0n;

// DOM 엘리먼트
const keypad = document.getElementById("keypad");
const wornBadges = document.getElementById("worn-badges");
const targetPwInput = document.getElementById("target-password");
const validationMsg = document.getElementById("validation-msg");
const btnStart = document.getElementById("btn-start");

const statK = document.getElementById("stat-k");
const statLenRange = document.getElementById("stat-len-range");
const statTotalCases = document.getElementById("stat-total-cases");
const statMaxTime = document.getElementById("stat-max-time");

const currentCandidateEl = document.getElementById("current-candidate");
const resultBox = document.getElementById("result-box");

// 1. 수학 계산: 조합(nCr) 및 포함-배제의 원리 (BigInt 정밀 연산)
function combination(n, r) {
  if (r < 0 || r > n) return 0n;
  if (r === 0 || r === n) return 1n;
  let num = 1n, den = 1n;
  for (let i = 1n; i <= BigInt(r); i++) {
    num *= (BigInt(n) - i + 1n);
    den *= i;
  }
  return num / den;
}

// 길이 L에서 k개 숫자를 모두 사용하는 순열의 수
function calculateValidPermutations(k, L) {
  if (L < k) return 0n;
  let sum = 0n;
  for (let j = 0; j <= k; j++) {
    const sign = (j % 2 === 0) ? 1n : -1n;
    const comb = combination(k, j);
    const power = BigInt(k - j) ** BigInt(L);
    sum += sign * comb * power;
  }
  return sum;
}

// 남은 자릿수 rem에 전체 k개 숫자 풀에서 특정 m개의 숫자가 반드시 포함되도록 채우는 경우의 수
function countWaysWithMustInclude(k, m, rem) {
  if (rem < m) return 0n;
  let sum = 0n;
  for (let j = 0; j <= m; j++) {
    const sign = (j % 2 === 0) ? 1n : -1n;
    const comb = combination(m, j);
    const power = BigInt(k - j) ** BigInt(rem);
    sum += sign * comb * power;
  }
  return sum;
}

// 닳아있는 번호 기반 총 가능한 경우의 수 계산
function computeTotalPossibleCases(k) {
  const minLen = Math.max(4, k);
  const maxLen = 12;
  let total = 0n;

  for (let L = minLen; L <= maxLen; L++) {
    total += calculateValidPermutations(k, L);
  }
  return total;
}

// [핵심] 브루트포스 루프 없이, 수학적 순열 랭킹으로 정답의 순번(시도 횟수)을 즉시 계산
function calculateTargetAttemptRank(wornDigitsSorted, targetPw) {
  const k = wornDigitsSorted.length;
  const minLen = Math.max(4, k);
  const targetLen = targetPw.length;
  let rank = 0n;

  // 1. targetLen보다 짧은 길이의 유효 경우의 수 모두 합산
  for (let L = minLen; L < targetLen; L++) {
    rank += calculateValidPermutations(k, L);
  }

  // 2. targetLen 길이에서 targetPw보다 사전순으로 앞서는 유효 비밀번호 개수 합산
  let currentMask = 0;

  for (let i = 0; i < targetLen; i++) {
    const targetChar = targetPw[i];
    const targetIdx = wornDigitsSorted.indexOf(targetChar);
    const rem = targetLen - 1 - i;

    // 현재 자리에 targetChar보다 작은 숫자(wornDigits[idx])를 놓았을 때의 경우의 수
    for (let idx = 0; idx < targetIdx; idx++) {
      const nextMask = currentMask | (1 << idx);
      // 아직 비밀번호에 한 번도 안 쓰인 필수 숫자의 개수 m
      let m = 0;
      for (let b = 0; b < k; b++) {
        if ((nextMask & (1 << b)) === 0) m++;
      }
      rank += countWaysWithMustInclude(k, m, rem);
    }

    currentMask |= (1 << targetIdx);
  }

  // 자기 자신 순번 포함 (+1번째)
  rank += 1n;
  return rank;
}

// 초당 10,000회 입력 기준 소요 시간 포맷팅 함수 (BigInt 정밀 계산)
function formatDurationFromAttempts(attemptsBigInt) {
  if (attemptsBigInt === 0n) return "0초";

  const OPS_PER_SEC = 10000n; // 초당 10,000회
  const totalSecondsBig = attemptsBigInt / OPS_PER_SEC;
  const remainderAttempts = attemptsBigInt % OPS_PER_SEC;

  // 1초 미만인 경우
  if (totalSecondsBig === 0n) {
    const fraction = Number(remainderAttempts) / 10000;
    if (fraction < 0.001) return "약 0.001초 미만 (순식간)";
    return `약 ${fraction.toFixed(4)}초`;
  }

  // 1초 이상 60초 미만인 경우
  if (totalSecondsBig < 60n) {
    const fraction = Number(totalSecondsBig) + (Number(remainderAttempts) / 10000);
    return `약 ${fraction.toFixed(2)}초`;
  }

  // 60초 이상: 분, 시간, 일, 년 단위 변환
  let s = totalSecondsBig;
  const days = s / 86400n;
  s %= 86400n;
  const hours = s / 3600n;
  s %= 3600n;
  const minutes = s / 60n;
  const seconds = s % 60n;

  if (days >= 365n) {
    const years = days / 365n;
    const remDays = days % 365n;
    return `약 ${years.toLocaleString()}년 ${remDays}일 ${hours}시간`;
  }
  if (days > 0n) {
    return `약 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
  }
  if (hours > 0n) {
    return `약 ${hours}시간 ${minutes}분 ${seconds}초`;
  }
  return `약 ${minutes}분 ${seconds}초`;
}

// 2. 키패드 클릭 이벤트 (닳은 번호 선택)
keypad.addEventListener("click", (e) => {
  if (isRunning) return;

  const btn = e.target.closest(".key-btn");
  if (!btn || btn.classList.contains("disabled")) return;

  const val = btn.dataset.val;
  if (wornDigits.includes(val)) {
    wornDigits = wornDigits.filter((d) => d !== val);
    btn.classList.remove("selected");
  } else {
    wornDigits.push(val);
    wornDigits.sort();
    btn.classList.add("selected");
  }

  renderBadges();
  updateUIOnConfigChange();
});

function renderBadges() {
  if (worn
