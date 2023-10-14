import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createCandidateSlice } from './candidatos'
import { createUserSlice } from './user'
import { createJuntasReceptorasSlice } from './juntasReceptoras'
import { createActaSlice } from './acta'

export const useVotingSystemStore = create(persist((...a) => ({
    ...createUserSlice(...a),
    ...createCandidateSlice(...a),
    ...createJuntasReceptorasSlice(...a),
    ...createActaSlice(...a),
}),
{ name: 'voting-system-store' }
)
)