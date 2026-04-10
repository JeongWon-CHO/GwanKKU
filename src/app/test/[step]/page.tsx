import { TestStepView } from '@/components/test/TestStepView'

export default async function TestStepPage({
  params,
}: {
  params: Promise<{ step: string }>
}) {
  const { step } = await params
  const stepNumber = parseInt(step, 10)

  return <TestStepView step={stepNumber} />
}
