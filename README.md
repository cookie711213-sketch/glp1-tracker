# GLP-1 Tracker

위고비(Wegovy, 세마글루타이드) / 마운자로(Mounjaro, 티르제파타이드) 같은 GLP-1 비만 치료제를
스스로 관리하기 위한 단일 사용자용 웹앱.

## 기능

- **주사 로그** – 날짜·약물·용량·부위·메모. 마지막 기록 기반 다음 권장일(7일) 표시
- **체중 / 신체치수** – 체중·허리·체지방률, Recharts 라인 차트, 시작 대비 변화 요약
- **식단 / 칼로리** – 일시·이름·kcal·메모, 일자별 그룹과 일일 합계
- **컨디션 / 부작용 메모** – 기분(1~5), 부작용 칩 다중 선택, 자유 메모
- **대시보드** – 다음 주사일, 현재 체중, 오늘 식단/메모 요약, 최근 7일 체중 차트

## 기술 스택

- Next.js 16 (App Router) + TypeScript + Turbopack
- Tailwind CSS v4
- Recharts (차트)
- date-fns (날짜)
- 데이터는 **브라우저 localStorage**에만 저장 (서버 없음, 단일 디바이스)

## 실행

```bash
pnpm install   # 최초 1회
pnpm dev       # http://localhost:3000
pnpm build     # 프로덕션 빌드
pnpm start     # 빌드 결과 실행
```

## 데이터 위치

- 키: `glp1.injections`, `glp1.weights`, `glp1.meals`, `glp1.notes`
- 위치: 브라우저 DevTools → Application → Local Storage
- 백업: 위 키들의 값을 JSON으로 복사/붙여넣기

## 의도적으로 하지 않는 것

서버, 인증, 멀티 디바이스 동기화, PWA, AI 코치, 사진 업로드, 약물 상호작용 분석.
필요해지면 그때 SQLite 또는 Supabase로 마이그레이션한다.

> ⚠️ 이 앱은 의료 자문을 대체하지 않습니다. 처방·용량 변경은 반드시 담당 의사와 상의하세요.
