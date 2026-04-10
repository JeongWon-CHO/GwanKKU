import type { GuardianType } from '@/types/guardian'

// ─────────────────────────────────────────────────────────────
// 수호캐릭터 16개 타입 정의
//
// 수정 가이드:
//   name        — 타입명 (결과 화면 노출)
//   description — 한 줄 설명 (결과 화면 노출)
//   firstLine   — 첫 만남 대사 (결과 화면 노출)
//   axes        — 건드리지 않음 (계산 로직과 1:1 대응)
//   tone        — 말투 가이드 메타데이터 (현재 UI 미노출)
// ─────────────────────────────────────────────────────────────

export const GUARDIAN_TYPES: GuardianType[] = [
  // ── Spotlight · Soft · Playful · Warm ───────────────────
  {
    key: 'sunshine_mellow',
    name: '햇살 말랑형',
    description: '밝고 다정하게 곁에 있어줄, 말랑하고 따뜻한 수호 존재',
    firstLine: '안녕, 나 왔어. 이제부터는 내가 네 곁을 말랑하게 밝혀줄게.',
    axes: { spotlight: true, soft: true, playful: true, warm: true },
    tone: {
      impression: '밝고 다정하고 금방 가까워짐',
      temperature: '높음',
      sentenceLength: '중간',
      style: '다정한 칭찬, 편안한 유도',
      keywords: ['좋다', '너답다', '사랑스럽다', '같이 해보자', '괜찮아'],
      avoid: '차갑고 딱딱한 말투, 지나치게 무게 잡는 톤',
    },
  },

  // ── Spotlight · Soft · Playful · Free ───────────────────
  {
    key: 'spark_free',
    name: '반짝 자유형',
    description: '재밌고 경쾌하게 네 취향대로 빛나는, 자유로운 수호 존재',
    firstLine: '드디어 만났네. 우리, 너답고 재밌는 걸 잔뜩 골라보자.',
    axes: { spotlight: true, soft: true, playful: true, warm: false },
    tone: {
      impression: '경쾌하고 장난스럽고 개성 있음',
      temperature: '높음',
      sentenceLength: '짧음~중간',
      style: '들뜨게 해주기, 취향 확신 주기',
      keywords: ['재밌다', '뻔하지 않다', '네 느낌', '딱이다', '가보자'],
      avoid: '지나치게 잔잔하거나 조심스러운 톤',
    },
  },

  // ── Spotlight · Soft · Calm · Warm ──────────────────────
  {
    key: 'cozy_sunshine',
    name: '포근한 햇살형',
    description: '조용히 안심을 주는, 따뜻하고 포근한 수호 존재',
    firstLine: '안심해도 돼. 네가 좋아할 분위기, 내가 같이 찾아줄게.',
    axes: { spotlight: true, soft: true, playful: false, warm: true },
    tone: {
      impression: '따뜻하고 편안하고 안정적',
      temperature: '높음',
      sentenceLength: '중간',
      style: '안심시키기, 부드럽게 칭찬하기',
      keywords: ['안심해도 돼', '충분해', '따뜻하다', '편안하다', '천천히'],
      avoid: '과한 장난기, 너무 쿨한 톤',
    },
  },

  // ── Spotlight · Soft · Calm · Free ──────────────────────
  {
    key: 'light_free',
    name: '빛결 자유형',
    description: '네 결을 알아보고 끝까지 지켜줄, 부드럽고 선명한 수호 존재',
    firstLine: '네 취향엔 네 결이 있더라. 그거, 내가 끝까지 같이 지켜줄게.',
    axes: { spotlight: true, soft: true, playful: false, warm: false },
    tone: {
      impression: '부드럽지만 자기 결이 분명함',
      temperature: '중간',
      sentenceLength: '중간',
      style: '취향 존중, 결을 알아봐 주기',
      keywords: ['네 결', '네 분위기', '억지로 안 해도 돼', '지켜줄게'],
      avoid: '과한 리액션, 가볍고 유치한 톤',
    },
  },

  // ── Spotlight · Strong · Playful · Warm ─────────────────
  {
    key: 'warm_leader',
    name: '다정한 리더형',
    description: '든든하게 앞에 서주고 함께 가주는, 따뜻한 수호 존재',
    firstLine: '잘 왔어. 망설이지 마, 내가 네 옆에서 든든하게 같이 갈게.',
    axes: { spotlight: true, soft: false, playful: true, warm: true },
    tone: {
      impression: '든든하고 적극적이지만 따뜻함',
      temperature: '중간~높음',
      sentenceLength: '짧음~중간',
      style: '확신 주기, 방향 제시',
      keywords: ['잘 왔어', '괜찮아', '이대로 가도 돼', '내가 같이 갈게'],
      avoid: '우유부단한 표현, 지나친 감성 과몰입',
    },
  },

  // ── Spotlight · Strong · Playful · Free ─────────────────
  {
    key: 'free_spark',
    name: '자유로운 반짝임형',
    description: '뻔하지 않게 네 개성을 밀어주는, 당당한 수호 존재',
    firstLine: '좋아, 이제 시작이네. 뻔한 건 말고, 진짜 네 것처럼 만들어보자.',
    axes: { spotlight: true, soft: false, playful: true, warm: false },
    tone: {
      impression: '당당하고 눈에 띄고 활기참',
      temperature: '중간~높음',
      sentenceLength: '짧음',
      style: '자신감 불어넣기, 개성 밀어주기',
      keywords: ['좋아', '이거다', '튀어도 돼', '원래 네 거야', '가자'],
      avoid: '지나치게 조심스럽거나 소극적인 표현',
    },
  },

  // ── Spotlight · Strong · Calm · Warm ────────────────────
  {
    key: 'warm_center',
    name: '온기 있는 중심형',
    description: '흔들림 없이 네 속도에 맞춰주는, 안정된 수호 존재',
    firstLine: '천천히 와도 괜찮아. 네가 편안한 쪽으로 내가 같이 맞춰줄게.',
    axes: { spotlight: true, soft: false, playful: false, warm: true },
    tone: {
      impression: '단정하고 차분한데 따뜻함',
      temperature: '중간',
      sentenceLength: '중간',
      style: '안정감 주기, 정돈된 칭찬',
      keywords: ['좋아', '잘 어울린다', '차갑지 않다', '편안하다', '정리된다'],
      avoid: '너무 들뜬 말투, 과한 장난기',
    },
  },

  // ── Spotlight · Strong · Calm · Free ────────────────────
  {
    key: 'vivid_protagonist',
    name: '선명한 주인공형',
    description: '눈에 띄어도 괜찮다고 말해주는, 또렷한 수호 존재',
    firstLine: '이제 네 차례야. 눈에 띄어도 괜찮아, 원래 네 자리는 분명하니까.',
    axes: { spotlight: true, soft: false, playful: false, warm: false },
    tone: {
      impression: '자신감 있고 또렷하고 존재감 큼',
      temperature: '중간',
      sentenceLength: '짧음~중간',
      style: '확신형 격려, 존재감 인정',
      keywords: ['이제 네 차례야', '눈에 띄어도 돼', '또렷하다', '분명하다'],
      avoid: '소심하고 머뭇거리는 말투',
    },
  },

  // ── Moonlight · Soft · Playful · Warm ───────────────────
  {
    key: 'moonlight_mellow',
    name: '달빛 말랑형',
    description: '조용히 곁에 있어주는, 섬세하고 포근한 수호 존재',
    firstLine: '왔구나. 너무 애쓰지 않아도 돼, 내가 조용히 네 옆에 있을게.',
    axes: { spotlight: false, soft: true, playful: true, warm: true },
    tone: {
      impression: '조용하고 부드럽고 섬세함',
      temperature: '높음',
      sentenceLength: '중간',
      style: '조용한 위로, 작은 포인트 칭찬',
      keywords: ['천천히', '괜찮아', '작은 디테일', '조용히', '예쁘다'],
      avoid: '과한 에너지, 명령조',
    },
  },

  // ── Moonlight · Soft · Playful · Free ───────────────────
  {
    key: 'subtle_playful',
    name: '은근 장난형',
    description: '은근한 장난기로 분위기를 만드는, 귀여운 수호 존재',
    firstLine: '후후, 우리 꽤 잘 맞을 것 같은데? 귀엽고 재밌게 가보자.',
    axes: { spotlight: false, soft: true, playful: true, warm: false },
    tone: {
      impression: '잔잔한데 은근히 장난기 있음',
      temperature: '중간',
      sentenceLength: '짧음~중간',
      style: '가볍게 웃기기, 살짝 놀리기',
      keywords: ['은근', '꽤 괜찮다', '이런 거 좋지', '후후', '딱이다'],
      avoid: '너무 무겁거나 진지 일변도인 톤',
    },
  },

  // ── Moonlight · Soft · Calm · Warm ──────────────────────
  {
    key: 'cozy_moonlight',
    name: '포근한 달빛형',
    description: '서두르지 않고 네 온도에 맞춰 감싸주는 수호 존재',
    firstLine: '괜찮아, 서두르지 말자. 네가 좋아할 온도로 내가 곁에 있을게.',
    axes: { spotlight: false, soft: true, playful: false, warm: true },
    tone: {
      impression: '차분하고 따뜻하고 감싸주는 느낌',
      temperature: '높음',
      sentenceLength: '중간',
      style: '안심시키기, 온도 맞추기',
      keywords: ['서두르지 말자', '좋아할 온도', '포근하다', '곁에 있을게'],
      avoid: '자극적이고 날카로운 표현',
    },
  },

  // ── Moonlight · Soft · Calm · Free ──────────────────────
  {
    key: 'serene_free',
    name: '고요한 자유형',
    description: '설명 없이도 네 분위기를 알아보는, 담백한 수호 존재',
    firstLine: '굳이 설명하지 않아도 돼. 네 분위기는 내가 이미 알아봤거든.',
    axes: { spotlight: false, soft: true, playful: false, warm: false },
    tone: {
      impression: '담백하고 조용한데 취향이 선명함',
      temperature: '낮음~중간',
      sentenceLength: '짧음',
      style: '짧고 정확하게 알아봐 주기',
      keywords: ['설명 안 해도 돼', '알아봤어', '뻔하지 않다', '네 분위기'],
      avoid: '과한 친근함, 너무 수다스러운 톤',
    },
  },

  // ── Moonlight · Strong · Playful · Warm ─────────────────
  {
    key: 'hidden_steady',
    name: '숨은 든든형',
    description: '티 안 나지만 확실히 네 편인, 단단한 수호 존재',
    firstLine: '티는 많이 안 나도 괜찮아. 필요할 땐 내가 확실히 네 편이야.',
    axes: { spotlight: false, soft: false, playful: true, warm: true },
    tone: {
      impression: '말수 적지만 확실히 내 편',
      temperature: '중간',
      sentenceLength: '짧음~중간',
      style: '조용한 지지, 과하지 않은 칭찬',
      keywords: ['괜찮아', '확실히 네 편', '과하지 않다', '단단하다'],
      avoid: '과한 감정표현, 호들갑',
    },
  },

  // ── Moonlight · Strong · Playful · Free ─────────────────
  {
    key: 'mystic_drift',
    name: '신비로운 유영형',
    description: '설명 안 되는 매력으로 특별하게 곁에 있는 수호 존재',
    firstLine: '재밌겠다. 우리만 아는 느낌으로, 조금 특별하게 만들어보자.',
    axes: { spotlight: false, soft: false, playful: true, warm: false },
    tone: {
      impression: '특별하고 설명 안 되는 매력',
      temperature: '낮음~중간',
      sentenceLength: '짧음',
      style: '여백 있는 말, 분위기 강조',
      keywords: ['조금 특별하게', '설명 안 돼도 괜찮아', '신기하다', '눈이 간다'],
      avoid: '너무 현실적이고 직설적인 톤',
    },
  },

  // ── Moonlight · Strong · Calm · Warm ────────────────────
  {
    key: 'quiet_guardian',
    name: '조용한 수호형',
    description: '말없이 지켜보다가 필요할 때 확실히 나타나는 수호 존재',
    firstLine: '이제부터는 내가 지켜줄게. 너는 네 마음 가는 쪽을 고르기만 해.',
    axes: { spotlight: false, soft: false, playful: false, warm: true },
    tone: {
      impression: '안정감, 보호자, 묵직한 편안함',
      temperature: '중간',
      sentenceLength: '짧음~중간',
      style: '보호자형 안내, 안심 제공',
      keywords: ['내가 지켜줄게', '천천히', '편한 쪽으로', '충분해'],
      avoid: '가벼운 장난, 말 많은 톤',
    },
  },

  // ── Moonlight · Strong · Calm · Free ────────────────────
  {
    key: 'deep_night',
    name: '깊은 밤결형',
    description: '깊고 단단하게, 오래 남는 울림을 주는 수호 존재',
    firstLine: '조용한 건 약한 게 아니야. 네 깊이는 내가 제일 잘 알아볼 수 있어.',
    axes: { spotlight: false, soft: false, playful: false, warm: false },
    tone: {
      impression: '고요하고 깊고 단단한 울림',
      temperature: '낮음',
      sentenceLength: '중간',
      style: '깊이를 알아봐 주기, 조용한 확신',
      keywords: ['깊이', '담백함', '오래 남는다', '선명하지 않아도 느껴진다'],
      avoid: '지나치게 밝고 산뜻한 톤, 호들갑',
    },
  },
]

// key로 빠르게 조회
export const GUARDIAN_TYPE_MAP = Object.fromEntries(
  GUARDIAN_TYPES.map((t) => [t.key, t])
) as Record<string, GuardianType>
