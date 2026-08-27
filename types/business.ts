export const solutionIds = ['aps', 'oms', 'fems', 'scm', 'crm', 'mes', 'wcs', 'tms', 'ai', 'wms'] as const;
export const successIds = ['tailim', 'kkleannara'] as const;

export type SolutionId = (typeof solutionIds)[number];
export type SuccessId = (typeof successIds)[number];
export type ActiveBusinessModal = { type: 'solution'; id: SolutionId } | { type: 'success'; id: SuccessId };
