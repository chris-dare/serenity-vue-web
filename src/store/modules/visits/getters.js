export default {
  visitId: (state) => state.currentVisit?.id,

  visitCount: (state) => state.visitsTotal || state.visits.length,
}
