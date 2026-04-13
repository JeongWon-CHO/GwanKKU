"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SELECT_TARGETS } from "@/constants/select-targets";
import { cn } from "@/lib/utils";

export function SelectView() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col px-6 py-16">
      {/* 헤더 */}
      <div className="mb-10 flex flex-col gap-2">
        <p className="text-xs text-body">무엇을 꾸밀까요</p>
        <h1 className="text-2xl font-semibold tracking-tight text-primary">
          나만의 방식으로
          <br />
          마지막을 준비해요.
        </h1>
      </div>

      {/* 카드 목록 */}
      <ul className="flex flex-col gap-3">
        {SELECT_TARGETS.map((target) => {
          const isEnabled = target.enabled;

          return (
            <li key={target.id}>
              <button
                onClick={() => isEnabled && router.push(target.href)}
                disabled={!isEnabled}
                aria-disabled={!isEnabled}
                className={cn(
                  "group w-full rounded-2xl border px-5 py-5 text-left transition-colors",
                  isEnabled
                    ? "border-line bg-background hover:border-primary"
                    : "border-line bg-background opacity-45 cursor-default",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "text-base font-medium",
                        isEnabled ? "text-primary" : "text-body",
                      )}
                    >
                      {target.title}
                    </span>
                    <span className="text-sm text-body">
                      {target.description}
                    </span>
                  </div>

                  {!isEnabled && (
                    <span className="mt-0.5 shrink-0 rounded-full border border-line px-2.5 py-0.5 text-xs text-caption">
                      준비 중
                    </span>
                  )}

                  {isEnabled && (
                    <ArrowRight
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-body transition-transform group-hover:translate-x-0.5"
                    />
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* 하단 보조 문구 */}
      <p className="mt-10 text-center text-xs text-caption">
        지금은 관 꾸미기만 이용 가능해요.
      </p>
    </main>
  );
}
