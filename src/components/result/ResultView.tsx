"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTestStore } from "@/store/useTestStore";
import { useAuth } from "@/hooks/useAuth";
import { calcGuardianType } from "@/lib/calcGuardianType";
import { signInWithGoogle } from "@/lib/auth";
import {
  savePendingGuardian,
  getPendingGuardian,
  clearPendingGuardian,
  saveGuardianToServer,
} from "@/lib/profiles";
import { GUARDIAN_TYPE_MAP } from "@/constants/guardian-types";
import type { GuardianType } from "@/types/guardian";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function ResultView() {
  const router = useRouter();
  const { answers, reset } = useTestStore();
  const { user, loading: authLoading } = useAuth();
  const [guardian, setGuardian] = useState<GuardianType | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const hasResumedRef = useRef(false);

  const [isResume] = useState(
    () =>
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("resume") === "1",
  );

  // 일반 진입: answers → guardian 계산
  useEffect(() => {
    if (isResume) return;
    if (Object.keys(answers).length === 0) {
      router.replace("/test");
      return;
    }
    const key = calcGuardianType(answers);
    setGuardian(GUARDIAN_TYPE_MAP[key] ?? null);
  }, [answers, isResume, router]);

  // OAuth 복귀: pending guardian 복원 + 서버 저장 자동 실행
  useEffect(() => {
    if (!isResume || authLoading || hasResumedRef.current) return;
    hasResumedRef.current = true;

    if (!user) {
      clearPendingGuardian();
      router.replace("/test");
      return;
    }

    const pendingKey = getPendingGuardian();
    if (!pendingKey) {
      router.replace("/test");
      return;
    }

    const guardianInfo = GUARDIAN_TYPE_MAP[pendingKey] ?? null;
    setGuardian(guardianInfo);
    setSaveStatus("saving");

    saveGuardianToServer(user.id, pendingKey)
      .then(() => {
        setSaveStatus("saved");
        clearPendingGuardian();
      })
      .catch(() => {
        setSaveStatus("error");
        clearPendingGuardian();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResume, authLoading, user]);

  async function handleSaveGuardian() {
    if (!guardian || saveStatus === "saving" || saveStatus === "saved") return;

    if (!user) {
      savePendingGuardian(guardian.key);
      signInWithGoogle("/result?resume=1");
      return;
    }

    setSaveStatus("saving");
    try {
      await saveGuardianToServer(user.id, guardian.key);
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }

  function handleRetake() {
    reset();
    router.push("/test/1");
  }

  if (!guardian) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-16">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        {/* 수호캐릭터 정보 */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-body">당신의 수호캐릭터</p>
          <h1 className="text-3xl font-semibold tracking-tight text-primary">
            {guardian.name}
          </h1>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm leading-relaxed text-body">
            {guardian.description}
          </p>

          <div className="relative h-56 w-56">
            <Image
              src={guardian.imagePath}
              alt={guardian.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          <p className="text-base italic text-primary">
            &ldquo;{guardian.firstLine}&rdquo;
          </p>
        </div>

        {/* CTA 영역 */}
        <div className="flex w-full max-w-xs flex-col gap-3">
          {/* 저장하기 — 인라인 피드백 */}
          {saveStatus === "saved" ? (
            <p className="py-3 text-center text-sm text-body">
              수호캐릭터가 저장됐어요
            </p>
          ) : (
            <button
              onClick={handleSaveGuardian}
              disabled={saveStatus === "saving"}
              className="rounded-full border border-line px-8 py-3 text-sm text-body transition-opacity hover:opacity-70 disabled:opacity-50"
            >
              {saveStatus === "saving"
                ? "저장 중..."
                : saveStatus === "error"
                  ? "저장 실패, 다시 시도"
                  : "이 수호캐릭터 저장하기"}
            </button>
          )}

          {/* 관 꾸미러 가기 — 항상 표시 */}
          <Link
            href="/select"
            className="rounded-full bg-accent px-8 py-3 text-center text-sm font-medium text-accent-fg transition-opacity hover:opacity-80"
          >
            관 꾸미러 가기
          </Link>
        </div>
      </div>

      {/* 하단 보조 */}
      <button
        onClick={handleRetake}
        className="text-xs text-caption hover:opacity-70"
      >
        다시 테스트하기
      </button>
    </main>
  );
}
