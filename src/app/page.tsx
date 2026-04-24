import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-16">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-tight text-primary">
            관꾸
          </h1>
          <p className="text-base leading-relaxed text-body">
            내가 준비하는 나의 마지막
            <br />
            마지막은 마음대로 해도 괜찮아요
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-body">
          <span>✦ 성향 테스트로 나의 수호캐릭터를 찾고</span>
          <span>✦ 취향에 맞게 나만의 공간을 꾸며보세요</span>
        </div>

        <div className="mt-4 flex w-full max-w-xs flex-col gap-3">
          <Link
            href="/test"
            className="rounded-full bg-accent px-8 py-3 text-center text-sm font-medium text-accent-fg transition-opacity hover:opacity-80"
          >
            내 관 꾸미기
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-line px-8 py-3 text-center text-sm text-body transition-opacity hover:opacity-70"
          >
            온라인 관짝함 둘러보기
          </Link>
        </div>
      </div>

      <p className="text-xs text-caption">관꾸 · 나를 위한 작은 준비</p>
    </main>
  );
}

// 컬러 토큰에 bg-primary가 없는데 저걸 쓰고 있다. 그래서 버튼쪽 css가 다 날라감
/*  왜 접근되냐

@theme inline에서

--color-primary: var(--text-primary);

를 선언했기 때문에, Tailwind 쪽에서 primary라는 컬러 토큰으로 인식해서
bg-primary, text-primary, border-primary 같은 클래스가 만들어질 수 있다.

즉, 없는 게 아니라 있긴 있음.
다만 네가 의도한 primary가 배경용 대표색이 아니라 텍스트 대표색이라는 게 문제
*/

// 버튼용 디자인 토큰을 만들어야 될 듯
