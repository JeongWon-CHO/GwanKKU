"use client";

import { cn } from "@/lib/utils";
import type { PlacedDecoration } from "@/types/editor";

type Props = {
  inactive: boolean;
  placed: PlacedDecoration | null;
  isSelecting: boolean;
  interactive: boolean;
  lightPanel: boolean;
  onTap: () => void;
};

export function GridCell({
  inactive,
  placed,
  isSelecting,
  interactive,
  lightPanel,
  onTap,
}: Props) {
  if (inactive) {
    return <div className="h-full w-full" aria-hidden />;
  }

  // 미리보기 모드
  if (!interactive) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        {placed && (
          <span className="select-none text-2xl leading-none">
            {placed.emoji}
          </span>
        )}
      </div>
    );
  }

  const isPlaceable = isSelecting && !placed; // 선택 중 + 빈 셀: 배치 가능
  const isRemovable = isSelecting && !!placed; // 선택 중 + 채워진 셀: 탭 시 삭제

  return (
    <button
      onClick={onTap}
      className={cn(
        "relative flex h-full w-full items-center justify-center transition-colors active:bg-white/10",
        isPlaceable &&
          (lightPanel
            ? "bg-black/5 ring-1 ring-inset ring-black/25"
            : "bg-white/10 ring-1 ring-inset ring-white/30"),
        isRemovable && (lightPanel ? "bg-black/[0.06]" : "bg-white/[0.06]"),
      )}
    >
      {placed && (
        <span
          key={placed.itemId}
          className={cn(
            "select-none text-2xl leading-none animate-pop",
            isRemovable && "opacity-50",
          )}
        >
          {placed.emoji}
        </span>
      )}

      {/* 삭제 힌트 오버레이 — clipPath 내에서 항상 보이도록 셀 중앙 배치
      {isRemovable && (
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-full text-[11px] leading-none",
              lightPanel ? "bg-black/25 text-white" : "bg-white/30 text-black/80",
            )}
          >
            ×
          </span>
        </span>
      )} */}
    </button>
  );
}
