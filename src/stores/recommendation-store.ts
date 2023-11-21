import { defineStore } from 'pinia';
import { IRecommendedInstructor } from 'src/utils/recommendation';

export const useRecommendationStore = defineStore('recommendation', {
  state: () => ({
    recommendation: [] as Array<IRecommendedInstructor>,
  }),

  getters: {
    getRecommendations: (state) => state.recommendation,
  },

  actions: {
    initRecommendation (recommendations) {
      this.recommendation = recommendations;
    },
    updateRecommendationStatus (recommendationId: number, newStatus: string) {
      const recommendationIndex = this.recommendation.findIndex(
        rec => rec.recommendation_id === recommendationId
      );

      if (recommendationIndex !== -1) {
        this.recommendation[recommendationIndex].recommendation_status = newStatus;
      }
    },
    // setVisibility ()
  }
});
