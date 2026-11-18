// 상태 변수
let wornDigits = [];
let isRunning = false;
let stopRequested = false;
let calculatedTotalCases = 0n;

// DOM 엘리먼트
const keypad = document.getElementById("keypad");
const wornBadges = document.getElementById("worn-badges");
const targetPwInput = document.getElementById("target-password");
const validationMsg = document.getElementById("validation-msg");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");

const statK = document.getElementById("stat-k");
const statLenRange = document.getElementById("stat-len-range");
const statTotalCases = document.getElementById("stat-total-cases");

const currentCandidateEl = document.getElementById("current-candidate");
const attemptCountEl = document.getElementById("attempt-count");
const progressPercentEl = document.getElementById("progress-percent");
const progressBarEl = document.getElementById("progress-bar");
const elapsedTimeEl = document.getElementById("elapsed-time");
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

// 닳아있는 번호 기반 총 경우의 수 계산 함수 (시작 버튼 클릭 시 호출)
function computeTotalPossibleCases(k) {
  const minLen = Math.max(4, k);
  const maxLen = 12;
  let total = 0n;

  for (let L = minLen; L <= maxLen; L++) {
    total += calculateValidPermutations(k, L);
  }
  return total;
}

// 2. 키패드 클릭 이벤트 (닳은 번호 선택)
keypad.addEventListener("click", (e) => {
  if (isRunning) return; // 실행 중에는 변경 불가

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
  if (wornDigits.length === 0) {
    wornBadges.innerHTML = `<span class="placeholder-text">번호를 선택하세요</span>`;
    return;
  }
  wornBadges.innerHTML = wornDigits
    .map((d) => `<span class="badge">${d}</span>`)
    .join("");
}

// 번호 선택 변경 시 기본 정보 갱신 (총 경우의 수는 시작 버튼 누를 때 계산)
function updateUIOnConfigChange() {
  const k = wornDigits.length;
  statK.textContent = `${k}개`;

  if (k === 0) {
    statLenRange.textContent = "-";
  } else if (k > 12) {
    statLenRange.textContent = "불가능 (12개 초과)";
  } else {
    const minLen = Math.max(4, k);
    statLenRange.textContent = `${minLen}자리 ~ 12자리`;
  }

  // 시작 버튼을 누르기 전까지는 대기 문구 표시
  statTotalCases.textContent = "시작 버튼을 누르면 계산됩니다";
  calculatedTotalCases = 0n;

  validateInputs();
}

// 3. 비밀번호 유효성 검사
targetPwInput.addEventListener("input", validateInputs);

function validateInputs() {
  const pw = targetPwInput.value.trim();
  const k = wornDigits.length;
  let isValid = false;

  if (k === 0) {
    showValidation("먼저 닳아있는 번호를 1개 이상 선택해 주세요.", false);
  } else if (k > 12) {
    showValidation("닳아있는 번호는 최대 12개까지만 가능합니다.", false);
  } else if (!pw) {
    showValidation("테스트할 진짜 비밀번호를 입력해 주세요.", false);
  } else if (!/^\d+$/.test(pw)) {
    showValidation("비밀번호는 숫자만 입력 가능합니다.", false);
  } else if (pw.length < Math.max(4, k) || pw.length > 12) {
    showValidation(`비밀번호 길이는 ${Math.max(4, k)}자리 이상 12자리 이하여야 합니다.`, false);
  } else {
    const pwDigits = new Set(pw.split(""));
    const wornSet = new Set(wornDigits);

    const hasExtra = [...pwDigits].some((d) => !wornSet.has(d));
    const hasMissing = [...wornSet].some((d) => !pwDigits.has(d));

    if (hasExtra) {
      showValidation("닳아있지 않은 숫자가 비밀번호에 포함되어 있습니다.", false);
    } else if (hasMissing) {
      showValidation("닳아있는 모든 숫자가 적어도 1번 이상 사용되어야 합니다.", false);
    } else {
      showValidation("유효한 비밀번호입니다. [시작] 버튼을 눌러주세요!", true);
      isValid = true;
    }
  }

  btnStart.disabled = !isValid || isRunning;
  return isValid;
}

function showValidation(msg, isSuccess) {
  validationMsg.textContent = msg;
  validationMsg.className = `validation-msg ${isSuccess ? "success" : "error"}`;
}

// 4. 비동기 브루트포스 시뮬레이터 (시작 버튼을 누르면 총 경우의 수 계산 후 탐색)
btnStart.addEventListener("click", startCracking);
btnStop.addEventListener("click", () => { stopRequested = true; });

async function startCracking() {
  if (!validateInputs()) return;

  const targetPw = targetPwInput.value.trim();
  const k = wornDigits.length;
  const minLen = Math.max(4, k);
  const maxLen = 12;

  // [핵심 변경] 시작 버튼을 눌렀을 때 가능한 총 경우의 수 계산
  statTotalCases.textContent = "계산 중...";
  await new Promise((r) => setTimeout(r, 60)); // 계산 중 체감 UI 갱신

  calculatedTotalCases = computeTotalPossibleCases(k);
  statTotalCases.textContent = `${calculatedTotalCases.toLocaleString()} 가지`;

  // UI 상태 변경
  isRunning = true;
  stopRequested = false;
  btnStart.style.display = "none";
  btnStop.style.display = "block";
  resultBox.style.display = "none";
  targetPwInput.disabled = true;

  const startTime = performance.now();
  let attempts = 0n;
  let matched = false;

  const totalCasesNum = Number(calculatedTotalCases);
  let lastCandidateStr = "";

  // 자리수 순차 탐색 (minLen -> maxLen)
  for (let L = minLen; L <= maxLen; L++) {
    if (stopRequested || matched) break;

    const indices = new Array(L).fill(0);
    let hasMore = true;

    while (hasMore && !stopRequested && !matched) {
      const CHUNK_SIZE = 5000; // 한 틱(배치)에 처리할 연산량

      for (let i = 0; i < CHUNK_SIZE; i++) {
        let candidate = "";
        let countMask = 0;

        for (let j = 0; j < L; j++) {
          const idx = indices[j];
          candidate += wornDigits[idx];
          countMask |= (1 << idx);
        }

        // 모든 닳아있는 숫자가 적어도 1회 이상 포함되었는지 비트마스크로 검사
        if (countMask === (1 << k) - 1) {
          attempts++;
          lastCandidateStr = candidate;

          if (candidate === targetPw) {
            matched = true;
            break;
          }
        }

        // 다음 중복 순열 계산
        let pos = L - 1;
        while (pos >= 0) {
          indices[pos]++;
          if (indices[pos] < k) break;
          indices[pos] = 0;
          pos--;
        }
        if (pos < 0) {
          hasMore = false;
          break;
        }
      }

      // 화면 업데이트
      const currentElapsed = (performance.now() - startTime) / 1000;
      attemptCountEl.textContent = attempts.toLocaleString();
      elapsedTimeEl.textContent = `${currentElapsed.toFixed(2)}초`;
      currentCandidateEl.textContent = lastCandidateStr || "SEARCHING...";

      if (totalCasesNum > 0) {
        const percent = Math.min(100, (Number(attempts) / totalCasesNum) * 100);
        progressPercentEl.textContent = `${percent.toFixed(2)}%`;
        progressBarEl.style.width = `${percent}%`;
      }

      // 브라우저 렌더링 프레임 확보
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  const finalElapsed = (performance.now() - startTime) / 1000;

  // 종료 및 복구 처리
  isRunning = false;
  btnStart.style.display = "block";
  btnStop.style.display = "none";
  btnStart.disabled = false;
  targetPwInput.disabled = false;

  if (matched) {
    currentCandidateEl.textContent = targetPw;
    resultBox.style.display = "block";
    document.getElementById("result-pw").textContent = targetPw;
    document.getElementById("result-attempts").textContent = attempts.toLocaleString();
    document.getElementById("result-total").textContent = calculatedTotalCases.toLocaleString();
    
    const ratio = totalCasesNum > 0 ? ((Number(attempts) / totalCasesNum) * 100).toFixed(4) : "0";
    document.getElementById("result-ratio").textContent = ratio;
    document.getElementById("result-time").textContent = finalElapsed.toFixed(3);
  } else if (stopRequested) {
    currentCandidateEl.textContent = "STOPPED";
  }
}
