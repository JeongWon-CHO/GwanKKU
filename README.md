# 관꾸

1인 셀프 장례 준비형 꾸미기 웹 서비스. 나만의 장례를 미리 꾸미고 기록하는 감성 경험을 제공합니다.

## 핵심 퍼널

```
랜딩 → 성향 테스트 → 수호캐릭터 결과 → 꾸미기 대상 선택 → 에디터 → 완성 미리보기 / 저장 / 공유
```

## 기술 스택

| 항목       | 내용                    |
| ---------- | ----------------------- |
| 프레임워크 | Next.js 16 (App Router) |
| 언어       | TypeScript              |
| 스타일     | Tailwind CSS            |
| 상태관리   | Zustand                 |
| 애니메이션 | 추후 Framer Motion      |
| PWA        | 추후 next-pwa           |

## 폴더 구조

```
src/
├── app/
│   ├── page.tsx                   # 랜딩
│   ├── test/
│   │   ├── page.tsx               # 테스트 소개
│   │   └── [step]/page.tsx        # 테스트 진행
│   ├── result/page.tsx            # 수호캐릭터 결과
│   ├── select/page.tsx            # 꾸미기 대상 선택
│   ├── editor/page.tsx            # 관꾸 에디터
│   └── complete/page.tsx          # 완성 미리보기 + 공유
├── components/
│   ├── ui/                        # 공통 UI
│   ├── test/                      # 테스트 컴포넌트
│   ├── guardian/                  # 수호캐릭터 컴포넌트
│   └── editor/                    # 에디터 컴포넌트
├── store/
│   ├── useTestStore.ts
│   └── useEditorStore.ts
├── constants/
│   ├── questions.ts
│   ├── guardian-types.ts
│   ├── editor-categories.ts
│   └── editor-presets.ts
├── types/
│   ├── test.ts
│   ├── guardian.ts
│   └── editor.ts
└── lib/
    └── utils.ts
```

## 실행 방법

```bash
npm install
npm run dev
```

로컬 개발 서버: http://localhost:3000
