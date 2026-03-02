import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '../store/useAppStore'

const STEP_DURATION = 3000 // ms per step for mock animation

export default function ProcessingPage() {
    const navigate = useNavigate()
    const { reelUrl, pipelineSteps, advanceStep, completeProcessing } = useAppStore()
    const stepIndexRef = useRef(0)

    useEffect(() => {
        // If no URL, redirect to home
        if (!reelUrl) {
            navigate('/')
            return
        }

        const stepIds = pipelineSteps.map(s => s.id)
        stepIndexRef.current = 0

        // Advance through steps
        advanceStep(stepIds[0])

        const interval = setInterval(() => {
            stepIndexRef.current += 1
            if (stepIndexRef.current < stepIds.length) {
                advanceStep(stepIds[stepIndexRef.current])
            } else {
                clearInterval(interval)
                completeProcessing()
                // Navigate to results after a brief pause
                setTimeout(() => navigate('/results'), 500)
            }
        }, STEP_DURATION)

        return () => clearInterval(interval)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const completedCount = pipelineSteps.filter(s => s.status === 'completed').length
    const activeIndex = pipelineSteps.findIndex(s => s.status === 'active')
    const progress = ((completedCount + (activeIndex >= 0 ? 0.5 : 0)) / pipelineSteps.length) * 100
    const remaining = Math.max(0, Math.round((pipelineSteps.length - completedCount) * (STEP_DURATION / 1000)))

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center noise-overlay" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="relative z-10 w-full max-w-xl px-6 text-center">
                {/* Title */}
                <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '48px', color: 'var(--fg-primary)', marginBottom: '12px' }}>
                    ANALYZING REEL
                </h1>

                {/* URL */}
                <p className="t7-mono-body mb-16" style={{ color: 'var(--fg-secondary)' }}>
                    {reelUrl ? (reelUrl.length > 50 ? reelUrl.substring(0, 50) + '...' : reelUrl) : 'No URL provided'}
                </p>

                {/* Pipeline Steps */}
                <div className="text-left mb-16 space-y-6">
                    {pipelineSteps.map((step) => (
                        <div key={step.id} className="flex items-center gap-4 t7-mono-body" style={{ minHeight: '24px' }}>
                            {step.status === 'completed' && (
                                <span style={{ color: 'var(--accent-green)', width: '20px', textAlign: 'center' }}>✓</span>
                            )}
                            {step.status === 'active' && (
                                <span className="cursor-blink" style={{ color: 'var(--accent-yellow)', width: '20px', textAlign: 'center' }}>▌</span>
                            )}
                            {step.status === 'pending' && (
                                <span style={{ color: 'var(--border-default)', width: '20px', textAlign: 'center' }}>—</span>
                            )}
                            <span style={{
                                color: step.status === 'completed' ? 'var(--fg-primary)'
                                    : step.status === 'active' ? 'var(--accent-yellow)'
                                        : 'var(--border-default)',
                            }}>
                                {step.status === 'active' ? `${step.label}...` : step.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full mb-4" style={{ height: '2px', backgroundColor: 'var(--bg-tertiary)' }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        backgroundColor: 'var(--accent-yellow)',
                        transition: 'width 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                </div>

                {/* Time Remaining */}
                <p className="t6-mono-label" style={{ color: '#555555', fontSize: '13px' }}>
                    EST. {remaining} SECONDS REMAINING
                </p>
            </div>
        </div>
    )
}
