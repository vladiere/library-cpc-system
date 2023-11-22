import { defineStore } from 'pinia';
import { IRecommendedInstructor, IRecommendPersonal } from 'src/utils/recommendation';

export const useRecommendationStore = defineStore('recommendation', {
  state: () => ({
    recommendation: [] as Array<IRecommendedInstructor>,
    personalize: [] as Array<IRecommendPersonal>,
  }),

  getters: {
    getRecommendations: (state) => state.recommendation,
    getPersonalize: (state) => state.personalize,
  },

  actions: {
    initRecommendation (recommendations) {
      this.recommendation = recommendations;
    },
    initPersonalize (personalize) {
      this.personalize = personalize
    },
    updateRecommendationStatus (recommendationId: number, newStatus: string) {
      const recommendationIndex = this.recommendation.findIndex(
        rec => rec.recommendation_id === recommendationId
      );

      if (recommendationIndex !== -1) {
        this.recommendation[recommendationIndex].recommendation_status = newStatus;
      }
    },
    updatePersonalize (personalize_id, new_statue) {
      const personalize_index = this.personalize.findIndex(
        personal => personal.recommendation_id === personalize_id
      );

      if (personalize_index === -1) {
        this.personalize[personalize_index].recommendation_status = new_statue;
      }
    },
    // setVisibility ()
  }
});
