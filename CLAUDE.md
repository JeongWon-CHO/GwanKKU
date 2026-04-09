@AGENTS.md

# 관꾸 (Gwankku)

1인 셀프 장례 준비형 꾸미기 웹 서비스. 성향 테스트 → 수호캐릭터 결과 → 꾸미기 대상 선택 → 에디터 → 완성/공유 퍼널로 구성된 모바일 우선 Next.js 앱.

## 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 검사
```

## 디렉터리 구조

퍼널 순서: `/ → /test → /test/[step] → /result → /select → /editor → /complete`

현재 생성된 구조:

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                   # 랜딩
│   └── test/
│       ├── page.tsx               # 테스트 소개
│       └── [step]/page.tsx        # 테스트 진행 (동적 라우트)
└── lib/utils.ts                   # cn() 유틸
```

목표 구조 (퍼널 구현 단계에서 순차 생성):

```
src/
├── app/
│   ├── result/page.tsx            # 수호캐릭터 결과
│   ├── select/page.tsx            # 꾸미기 대상 선택
│   ├── editor/page.tsx            # 에디터 (MVP 단일 라우트)
│   └── complete/page.tsx          # 완성 미리보기 + 저장/공유 CTA
├── components/
│   ├── ui/                        # 공통 컴포넌트
│   ├── test/
│   ├── guardian/
│   └── editor/
├── store/
│   ├── useTestStore.ts            # 테스트~결과 구간 상태
│   └── useEditorStore.ts          # 선택~완성 구간 상태 (target 포함)
├── constants/
│   ├── questions.ts
│   ├── guardian-types.ts
│   ├── editor-categories.ts
│   └── editor-presets.ts          # target별 objectImage + allowedCategories
└── types/
    ├── test.ts
    ├── guardian.ts
    └── editor.ts
```

## 코드 스타일

- 언어: TypeScript. `any`는 가능한 피한다
- export: page/layout은 `export default`, 그 외 컴포넌트/유틸은 named export 우선
- CSS: Tailwind CSS 우선. 조건부 클래스 조합 시 `cn()` 사용 (`src/lib/utils.ts`)
- 컴포넌트: 재사용 컴포넌트는 `components/` 하위에 배치. 페이지 전용 소규모 보조 컴포넌트는 같은 파일 내 허용
- 상태: 전역 상태가 필요해지면 Zustand 스토어를 퍼널 구간 기준으로 분리해 생성
- 타입: 필요해지는 시점에 `types/` 하위 도메인별 파일로 분리
- preset: 에디터 target 분기 시 `constants/editor-presets.ts`에서 관리. target별 차이는 `objectImage`와 `allowedCategories` 기준

## 중요 주의사항

MUST: 작업 전에 짧은 plan을 먼저 제안한다.

MUST: 모바일 우선으로 설계하되, 데스크톱 최적화는 현재 우선순위가 아니다.

MUST: 새 파일은 실제로 필요한 시점에 최소한으로 생성한다. 미리 만들어두는 placeholder 파일 금지.

MUST: 요청한 범위 안에서만 구현을 완성한다. 범위가 예상보다 커지면 계속하기 전에 확인을 구한다.

MUST: MVP에서는 작은 단위로 구현하고 단계마다 결과를 공유한 뒤 진행한다.

IMPORTANT: `framer-motion`은 현재 사용하지 않는다. 애니메이션이 실제로 필요한 시점에 추가한다.

IMPORTANT: `next-pwa`는 현재 사용하지 않는다. PWA 확장은 명시적 요청 시점에 진행한다.

IMPORTANT: `/editor`는 MVP 단계에서 단일 라우트로 유지한다. 레이아웃과 로직은 공통으로 두고, 추후 `/editor/[target]`으로 확장 가능하게 설계한다.

IMPORTANT: 라우트(`result`, `select`, `editor`, `complete`)는 퍼널 구현 단계에 맞춰 순차적으로 생성한다.

IMPORTANT: 커밋은 명시적 요청 시에만 진행한다.

IMPORTANT: 서비스 톤은 감성적이고 부드럽게 유지한다. 장례를 무겁게 강조하기보다 취향과 자기표현이 드러나는 방향으로 문구와 UI를 작성한다.
