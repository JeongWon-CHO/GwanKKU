"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { useTestStore } from "@/store/useTestStore";
import { EDITOR_PRESETS } from "@/constants/editor-presets";
import { ENABLED_FACES, FACE_CONFIGS } from "@/constants/editor-faces";
import { GUARDIAN_TYPE_MAP } from "@/constants/guardian-types";
import { calcGuardianType } from "@/lib/calcGuardianType";
import { CoffinBoard } from "./CoffinBoard";
import { DecorationPanel } from "./DecorationPanel";
import { FaceTabs } from "./FaceTabs";
import { GuardianGuide } from "./GuardianGuide";
import { isLight } from "@/lib/utils";
import type { EditorTarget } from "@/types/editor";

type Props = {
  target: EditorTarget;
};

export function EditorView({ target }: Props) {
  const router = useRouter();
  const { backgroundColor, activeFace, setTarget, setActiveFace } = useEditorStore();
  const { answers } = useTestStore();

  const preset = EDITOR_PRESETS[target];

  const guardian = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;
    const key = calcGuardianType(answers);
    return GUARDIAN_TYPE_MAP[key] ?? null;
  }, [answers]);

  // ── 스와이프 감지 ────────────────────────────────────────────
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const wasSwipeRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    swipeStartRef.current = { x: e.clientX, y: e.clientY };
    wasSwipeRef.current = false;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!swipeStartRef.current) return;
    const dx = e.clientX - swipeStartRef.current.x;
    const dy = e.clientY - swipeStartRef.current.y;
    swipeStartRef.current = null;

    const isHorizontal = Math.abs(dx) > Math.abs(dy) * 1.5;
    if (Math.abs(dx) > 40 && isHorizontal) {
      wasSwipeRef.current = true;
      const idx = ENABLED_FACES.indexOf(activeFace);
      if (dx < 0 && idx < ENABLED_FACES.length - 1) setActiveFace(ENABLED_FACES[idx + 1]);
      if (dx > 0 && idx > 0) setActiveFace(ENABLED_FACES[idx - 1]);
    }
  };

  const handlePointerCancel = () => {
    swipeStartRef.current = null;
    wasSwipeRef.current = false;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (wasSwipeRef.current) {
      e.stopPropagation();
      wasSwipeRef.current = false;
    }
  };

  useEffect(() => {
    setTarget(target);
  }, [target, setTarget]);

  return (
    <main className="flex h-dvh flex-col overflow-hidden">
      {/* 헤더 */}
      <header className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-3">
        <button
          onClick={() => router.back()}
          aria-label="뒤로 가기"
          className="flex size-8 items-center justify-center rounded-full hover:bg-surface"
        >
          <ArrowLeft className="size-4 text-body" />
        </button>
        <h1 className="text-base font-medium text-primary">
          {preset.objectLabel} 꾸미기
        </h1>
      </header>

      {/* 관 보드 영역 — 남는 공간 전체, 보드 수직 중앙 */}
      <section
        className="relative flex min-h-0 flex-1 flex-col transition-colors duration-300"
        style={{
          backgroundColor: isLight(backgroundColor) ? "#c8c2ba" : "#f5f5f4",
        }}
      >
        <FaceTabs activeFace={activeFace} onFaceChange={setActiveFace} />
        <div
          className="flex flex-1 items-center justify-center py-3"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onClickCapture={handleClickCapture}
        >
          <CoffinBoard
            backgroundColor={backgroundColor}
            face={activeFace}
            width={FACE_CONFIGS[activeFace].boardWidth}
            height={FACE_CONFIGS[activeFace].boardHeight}
          />
        </div>

        {/* 수호캐릭터 — 보드 영역 하단 오버레이 */}
        {guardian && (
          <div className="absolute bottom-3 left-4 right-4">
            <GuardianGuide guardian={guardian} lines={guardian.editorLines} />
          </div>
        )}
      </section>

      {/* 하단 편집 패널 */}
      <section className="shrink-0 px-4 py-3">
        <DecorationPanel />
      </section>

      {/* 완료 버튼 */}
      <div className="shrink-0 border-t border-line bg-background px-4 py-3">
        <button
          onClick={() => router.push("/complete")}
          className="w-full rounded-2xl bg-accent py-3.5 text-base font-medium text-accent-fg transition-opacity active:opacity-80"
        >
          완성 보기
        </button>
      </div>
    </main>
  );
}
