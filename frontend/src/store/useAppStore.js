import { create } from 'zustand'

const useAppStore = create((set) => ({
    // ─── URL Input ───
    reelUrl: '',
    setReelUrl: (url) => set({ reelUrl: url }),

    // ─── Pipeline Status ───
    isProcessing: false,
    currentStep: null,
    pipelineSteps: [
        { id: 'fetch', label: 'REEL FETCHED', status: 'pending' },
        { id: 'audio', label: 'AUDIO EXTRACTED', status: 'pending' },
        { id: 'transcript', label: 'TRANSCRIPT GENERATED', status: 'pending' },
        { id: 'hype', label: 'DETECTING HYPE CLAIMS', status: 'pending' },
        { id: 'normalize', label: 'NORMALIZING CONTENT', status: 'pending' },
        { id: 'resources', label: 'DISCOVERING RESOURCES', status: 'pending' },
        { id: 'roadmap', label: 'BUILDING ROADMAP', status: 'pending' },
    ],

    startProcessing: () => set({
        isProcessing: true,
        currentStep: 'fetch',
        pipelineSteps: [
            { id: 'fetch', label: 'REEL FETCHED', status: 'active' },
            { id: 'audio', label: 'AUDIO EXTRACTED', status: 'pending' },
            { id: 'transcript', label: 'TRANSCRIPT GENERATED', status: 'pending' },
            { id: 'hype', label: 'DETECTING HYPE CLAIMS', status: 'pending' },
            { id: 'normalize', label: 'NORMALIZING CONTENT', status: 'pending' },
            { id: 'resources', label: 'DISCOVERING RESOURCES', status: 'pending' },
            { id: 'roadmap', label: 'BUILDING ROADMAP', status: 'pending' },
        ],
    }),

    advanceStep: (stepId) => set((state) => ({
        currentStep: stepId,
        pipelineSteps: state.pipelineSteps.map((step) => {
            const stepIndex = state.pipelineSteps.findIndex(s => s.id === stepId)
            const currentIndex = state.pipelineSteps.findIndex(s => s.id === step.id)
            if (currentIndex < stepIndex) return { ...step, status: 'completed' }
            if (currentIndex === stepIndex) return { ...step, status: 'active' }
            return { ...step, status: 'pending' }
        }),
    })),

    completeProcessing: () => set((state) => ({
        isProcessing: false,
        currentStep: null,
        pipelineSteps: state.pipelineSteps.map(s => ({ ...s, status: 'completed' })),
    })),

    resetPipeline: () => set({
        isProcessing: false,
        currentStep: null,
        reelUrl: '',
        pipelineSteps: [
            { id: 'fetch', label: 'REEL FETCHED', status: 'pending' },
            { id: 'audio', label: 'AUDIO EXTRACTED', status: 'pending' },
            { id: 'transcript', label: 'TRANSCRIPT GENERATED', status: 'pending' },
            { id: 'hype', label: 'DETECTING HYPE CLAIMS', status: 'pending' },
            { id: 'normalize', label: 'NORMALIZING CONTENT', status: 'pending' },
            { id: 'resources', label: 'DISCOVERING RESOURCES', status: 'pending' },
            { id: 'roadmap', label: 'BUILDING ROADMAP', status: 'pending' },
        ],
    }),

    // ─── Results ───
    result: null,
    setResult: (result) => set({ result }),
}))

export default useAppStore
