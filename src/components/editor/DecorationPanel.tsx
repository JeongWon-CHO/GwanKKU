"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEditorStore } from "@/store/useEditorStore";
import { COFFIN_CATEGORIES } from "@/constants/editor-coffin";
import { cn } from "@/lib/utils";

const DECO_PAGE_SIZE = 8;

const backgroundItems =
  COFFIN_CATEGORIES.find((c) => c.id === "background")?.items ?? [];
const decorationItems =
  COFFIN_CATEGORIES.find((c) => c.id === "decoration")?.items ?? [];

type PanelTab = "background" | "decoration";

const TABS: { id: PanelTab; label: string }[] = [
  { id: "background", label: "배경" },
  { id: "decoration", label: "장식" },
];

export function DecorationPanel() {
  const [activeTab, setActiveTab] = useState<PanelTab>("background");
  const [decoPage, setDecoPage] = useState(0);

  const { backgroundColor, activeItemId, setBackgroundColor, setActiveItem } =
    useEditorStore();

  const decoPageCount = Math.ceil(decorationItems.length / DECO_PAGE_SIZE);
  const pagedDecoItems = decorationItems.slice(
    decoPage * DECO_PAGE_SIZE,
    (decoPage + 1) * DECO_PAGE_SIZE,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* 탭 */}
      <div className="flex gap-1 border-b border-line pb-3">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm transition-colors",
              activeTab === tab.id
                ? "bg-primary font-medium text-background"
                : "text-caption",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="h-50 overflow-y-auto overscroll-contain">
        {/* 배경 */}
        {activeTab === "background" && (
          <div className="grid grid-cols-6 gap-3 px-2 py-2">
            {backgroundItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setBackgroundColor(item.value)}
                title={item.label}
                className={cn(
                  "aspect-square rounded-full transition-transform active:scale-90",
                  backgroundColor === item.value
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "ring-1 ring-line",
                )}
                style={{ backgroundColor: item.value }}
              />
            ))}
          </div>
        )}

        {/* 장식 */}
        {activeTab === "decoration" && (
          <div className="flex flex-col gap-3">
            <div className="flex min-h-6 items-center justify-center">
              {activeItemId ? (
                <p className="text-xs text-caption">
                  {decorationItems.find((i) => i.id === activeItemId)?.value}{" "}
                  관을 탭해서 붙여보세요
                </p>
              ) : (
                <p className="text-xs text-caption">
                  장식을 고른 뒤 관을 탭해요
                </p>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {pagedDecoItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setActiveItem(activeItemId === item.id ? null : item.id)
                  }
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-2xl px-2 py-2 transition-colors",
                    activeItemId === item.id
                      ? "bg-inset ring-1 ring-accent/40"
                      : "bg-surface",
                  )}
                >
                  <span className="text-2xl leading-none">{item.value}</span>
                  <span
                    className={cn(
                      "text-xs leading-none",
                      activeItemId === item.id ? "text-body" : "text-caption",
                    )}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {decoPageCount > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDecoPage((p) => Math.max(0, p - 1))}
                  disabled={decoPage === 0}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full transition-colors",
                    decoPage === 0
                      ? "pointer-events-none text-caption/40"
                      : "text-caption hover:text-primary",
                  )}
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: decoPageCount }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setDecoPage(i)}
                      className={cn(
                        "rounded-full transition-all",
                        i === decoPage ? "size-2 bg-primary" : "size-1.5 bg-line",
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={() =>
                    setDecoPage((p) => Math.min(decoPageCount - 1, p + 1))
                  }
                  disabled={decoPage === decoPageCount - 1}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full transition-colors",
                    decoPage === decoPageCount - 1
                      ? "pointer-events-none text-caption/40"
                      : "text-caption hover:text-primary",
                  )}
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
