'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
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
{ name: 'voting-system-store',
  storage: createJSONStorage(()=>localStorage),
  skipHydration: true,
}
)
)