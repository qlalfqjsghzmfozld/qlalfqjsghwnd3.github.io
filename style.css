* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f1f5f9;
  color: #1e293b;
  min-height: 100vh;
  padding: 32px 16px;
  display: flex;
  justify-content: center;
}

.container {
  width: 100%;
  max-width: 1040px;
}

/* 헤더 영역 */
header {
  text-align: center;
  margin-bottom: 28px;
}

.header-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 9999px;
  background-color: #e0f2fe;
  color: #0284c7;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

header h1 {
  font-size: 2.1rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 6px;
}

.subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

/* 그리드 레이아웃 */
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 820px) {
  .grid-layout {
    grid-template-columns: 1fr;
  }
}

/* 카드 스타일 (화사한 화이트 테마) */
.card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 28px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.02);
}

.card h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
}

.guide-text {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 20px;
}

/* 도어락 키패드 */
.doorlock-keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 250px;
  margin: 0 auto 20px;
}

.key-btn {
  aspect-ratio: 1;
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  color: #334155;
  font-size: 1.45rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.key-btn:hover:not(.disabled) {
  background-color: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.key-btn.selected {
  background-color: #2563eb;
  border-color: #1d4ed8;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
}

.key-btn.selected::after {
  content: "🐾";
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 0.75rem;
}

.key-btn.disabled {
  background-color: #f1f5f9;
  border-color: #f1f5f9;
  color: #cbd5e1;
  cursor: not-allowed;
}

/* 선택된 번호 배지 */
.selected-badge-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px 14px;
  background-color: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.badge-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
  white-space: nowrap;
}

.badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.badge {
  background-color: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
  padding: 3px 9px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
}

.placeholder-text {
  font-size: 0.85rem;
  color: #94a3b8;
}

hr {
  border: 0;
  height: 1px;
  background-color: #e2e8f0;
  margin: 22px 0;
}

/* 입력 필드 */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
}

.input-group input {
  padding: 12px 16px;
  border-radius: 10px;
  border: 1.5px solid #cbd5e1;
  background-color: #ffffff;
  color: #0f172a;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 2px;
  transition: all 0.2s;
}

.input-group input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.validation-msg {
  font-size: 0.85rem;
  min-height: 22px;
  margin-bottom: 18px;
  font-weight: 500;
}

.validation-msg.error {
  color: #dc2626;
}

.validation-msg.success {
  color: #059669;
}

/* 버튼 */
.button-group {
  margin-top: 4px;
}

.btn {
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
}

.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.25);
}

.btn-danger:hover {
  background-color: #dc2626;
}

/* 우측 분석 & 모니터 섹션 */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.stat-card {
  background-color: #f8fafc;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.stat-card.full-width {
  grid-column: span 2;
  background-color: #eff6ff;
  border-color: #bfdbfe;
}

/* 시간 통계 카드 (노란빛 하이라이트) */
.stat-card.time-stat-card {
  background-color: #fefce8;
  border-color: #fef08a;
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-value.highlight {
  font-size: 1.25rem;
  color: #1d4ed8;
}

.stat-value.text-accent,
.text-accent {
  color: #b45309;
  font-weight: 800;
}

/* 디지털 화면 */
.display-panel {
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 16px;
  padding: 18px 20px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.35);
}

.display-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 6px;
  font-weight: 600;
}

.display-screen {
  font-family: "Courier New", Courier, monospace;
  font-size: 2.2rem;
  font-weight: 800;
  color: #38bdf8;
  letter-spacing: 6px;
  text-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 프로그레스 바 */
.progress-box {
  margin-bottom: 20px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 8px;
}

.text-blue {
  color: #2563eb;
}

.progress-bar-bg {
  width: 100%;
  height: 10px;
  background-color: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-bar-fill {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #10b981);
  transition: width 0.1s linear;
}

.time-info {
  font-size: 0.85rem;
  color: #64748b;
  text-align: right;
  font-weight: 500;
}

/* 결과 창 */
.result-box {
  background-color: #f0fdf4;
  border: 1.5px solid #86efac;
  padding: 20px;
  border-radius: 14px;
  margin-top: 10px;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.result-header h3 {
  color: #15803d;
  font-size: 1.15rem;
  font-weight: 700;
}

.result-pw-display {
  font-size: 1.05rem;
  color: #1e293b;
  font-weight: 600;
  margin-bottom: 14px;
}

.text-success {
  color: #16a34a;
  font-size: 1.45rem;
  letter-spacing: 2px;
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: #ffffff;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #dcfce7;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #334155;
}

.detail-row.highlight-row {
  background-color: #fefce8;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #fef08a;
  font-weight: 600;
}

.detail-row strong {
  color: #0f172a;
}
