import { create } from 'zustand'
import { createCandidateStore } from './candidatos'
import { useAuthStore } from './user'
import { createJuntasReceptoras } from './juntasReceptoras'
import { createActa } from './acta'

export const useStore = create((...a) => ({
    ...useAuthStore(...a),
    ...createCandidateStore(...a),
    ...createJuntasReceptoras(...a),
    ...createActa(...a),
}))