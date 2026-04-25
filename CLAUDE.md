@AGENTS.md

# 관꾸 (Gwankku)

1인 셀프 장례 준비형 꾸미기 웹 서비스. 성향 테스트 → 수호캐릭터 부화 → 결과 → 꾸미기 대상 선택 → 에디터 → 완성/공유 퍼널로 구성된 모바일 우선 Next.js 앱.

## 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

## 퍼널 구조 (현재 구현 완료)

```
/ → /test → /test/[step] → /hatch → /result → /select → /editor/coffin → /complete
```

| 라우트 | 파일 | 역할 |
|--------|------|------|
| `/` | `app/page.tsx` | 랜딩 |
| `/test` | `app/test/page.tsx` | 테스트 소개 |
| `/test/[step]` | `app/test/[step]/page.tsx` | 12문항 단계별 진행 |
| `/hatch` | `app/hatch/page.tsx` | 알 부화 인터랙션 (4탭) |
| `/result` | `app/result/page.tsx` | 수호캐릭터 공개 |
| `/select` | `app/select/page.tsx` | 꾸미기 대상 선택 (관만 활성화) |
| `/editor/coffin` | `app/editor/coffin/page.tsx` | 관 꾸미기 에디터 |
| `/complete` | `app/complete/page.tsx` | 완성 미리보기 + 저장/공유 |

## 디렉터리 구조 (현재 상태)

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── test/page.tsx & [step]/page.tsx
│   ├── hatch/page.tsx
│   ├── result/page.tsx
│   ├── select/page.tsx
│   ├── editor/coffin/page.tsx
│   └── complete/page.tsx
├── components/
│   ├── editor/
│   │   ├── EditorView.tsx        # 에디터 전체 레이아웃 + 상태 조율
│   │   ├── CoffinBoard.tsx       # 관 시각화 SVG + CoffinPreviewSmall export
│   │   ├── DecorationPanel.tsx   # 탭 패널 (배경 / 장식 / 문구)
│   │   ├── DecorationGrid.tsx    # 6×3 셀 배치판
│   │   ├── GridCell.tsx          # 단일 셀 (interactive / preview)
│   │   ├── GuardianGuide.tsx     # 수호캐릭터 말풍선
│   │   ├── MessageBand.tsx       # 관 하단 문구 띠
│   │   └── CompleteView.tsx      # 완성 화면
│   ├── test/TestStepView.tsx
│   ├── select/SelectView.tsx
│   ├── result/ResultView.tsx
│   └── hatch/HatchView.tsx
├── store/
│   ├── useEditorStore.ts         # 에디터 구간 전역 상태
│   └── useTestStore.ts           # 테스트 답안 상태
├── constants/
│   ├── editor-coffin.ts          # 관 배경색 6종 + 장식 이모지 12종
│   ├── editor-presets.ts         # target별 프리셋 매핑
│   ├── guardian-types.ts         # 수호캐릭터 16종 정의
│   ├── questions.ts              # 12문항 × 4선택지
│   └── select-targets.ts        # 선택 대상 4종 (관만 활성화)
├── types/
│   ├── editor.ts
│   ├── guardian.ts
│   └── test.ts
└── lib/
    ├── calcGuardianType.ts       # 테스트 점수 → 수호캐릭터 결정
    └── utils.ts                  # cn(), isLight(), deriveFrameColor()
```

## 에디터 구조

### 상태 모델 (`useEditorStore`)

```typescript
{
  target: EditorTarget | null          // 'coffin' | 'urn' | 'funeral' | 'grave'
  backgroundColor: string              // CSS hex
  grid: GridState                      // Record<GridKey, PlacedDecoration>
  activeItemId: string | null          // 선택된 장식 아이템
  message: string                      // 문구 (최대 30자)
}

type GridKey = `${number}-${number}`   // 예: "2-1" (row-col)
type PlacedDecoration = {
  itemId: string
  emoji: string
  decorationType: 'ribbon' | 'sticker' | 'flower' | 'symbol'
}
```

### 관 그리드

- 6행 × 3열 = 18셀
- 비활성 셀 5개: 모서리(0-0, 0-2) + 문구 띠 행(5-0, 5-1, 5-2)
- 활성 장식 셀: 13개
- `DecorationGrid` → `GridCell` 단위로 렌더링

### DecorationPanel 탭 구성

| 탭 | 내용 | 비고 |
|----|------|------|
| 배경 | 6색 스와치 | |
| 장식 | 이모지 12종 | 8개씩 페이지네이션 (2페이지) |
| 문구 | 텍스트에어리어 | 최대 30자 |

장식 탭처럼 **아이템이 많아질 경우 탭 내 페이지네이션**으로 처리한다. 탭을 늘리지 않는다.

### CoffinBoard

- 240×360px SVG 기반 관 시각화
- `CoffinBoard`: 에디터 인터랙티브 모드
- `CoffinPreviewSmall`: 완성 화면·썸네일용 비인터랙티브 모드 (동일 파일 export)

## 수호캐릭터 시스템

- 4개 축 × 2극 = 16종 조합
- 축: `spotlight/moonlight`, `soft/strong`, `playful/calm`, `warm/free`
- 12문항으로 각 축 6회 측정 → `calcGuardianType.ts`에서 결정
- 캐릭터별 `editorLines[]`: 에디터 화면에서 말풍선에 순환 표시

## 코드 스타일

- 언어: TypeScript. `any` 사용 금지
- export: page/layout은 `export default`, 컴포넌트/유틸은 named export 우선
- CSS: Tailwind CSS. 조건부 클래스는 `cn()` 사용 (`src/lib/utils.ts`)
- 컴포넌트: 재사용 컴포넌트는 `components/` 하위, 페이지 전용 소규모 컴포넌트는 같은 파일 내 허용
- 상태: Zustand, 퍼널 구간 기준으로 스토어 분리
- 프리셋: target 분기는 `constants/editor-presets.ts`에서 관리

## 1차 범위 정의

관꾸는 장기적으로 관 / 유골함 / 산소 / 추모 공간 등 여러 대상으로 확장된다.
**1차 범위는 "관 꾸미기 경험을 완전하게 완성하는 것"이다.**

- 대상 범위는 줄인다: 관(coffin)만 구현
- 관 경험에 필요한 기능은 충분히 구현한다: 꾸미기 → 저장 → 공유 → 공개 등재 → 보관함 → Auth
- 기능을 "MVP라서" 제외하지 않는다. Auth/보관함/서버 저장은 핵심 기능이다
- 유골함/산소/추모 공간 등 다른 대상 확장은 2차로 미룬다

## 중요 주의사항

MUST: 작업 전에 짧은 plan을 먼저 제안한다.

MUST: 모바일 우선으로 설계한다. 데스크톱 최적화는 현재 우선순위가 아니다.

MUST: 새 파일은 실제로 필요한 시점에만 생성한다. placeholder 파일 금지.

MUST: 요청한 범위 안에서만 구현을 완성한다. 범위가 예상보다 커지면 중단하고 확인한다.

MUST: 작은 단위로 구현하고 단계마다 결과를 공유한 뒤 진행한다.

IMPORTANT: `framer-motion`은 현재 사용하지 않는다. 애니메이션이 실제로 필요한 시점에 추가한다.

IMPORTANT: `next-pwa`는 현재 사용하지 않는다. PWA 확장은 명시적 요청 시점에 진행한다.

IMPORTANT: 에디터는 현재 `/editor/coffin` 단일 라우트. 추후 `/editor/[target]`으로 확장 가능하도록 `EditorView`에 `target` prop을 받는 구조를 유지한다.

IMPORTANT: Auth는 Supabase Google OAuth 기반. 로그인은 "서버에 남기는 행동"(보관함 저장, 공개 등재)에서만 트리거한다. 테스트/에디터/이미지 저장/공유는 비로그인으로 허용한다.

IMPORTANT: 보관함(/archive)은 비로그인 시 localStorage, 로그인 시 Supabase 서버 조회로 분기한다.

IMPORTANT: 커밋은 명시적 요청 시에만 진행한다.

IMPORTANT: 서비스 톤은 감성적이고 부드럽게 유지한다. 장례를 무겁게 강조하기보다 취향과 자기표현이 드러나는 방향으로 문구와 UI를 작성한다.
