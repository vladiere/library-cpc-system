import { defineStore } from 'pinia';
import { IRecommendedInstructor, IRecommendPersonal } from 'src/utils/recommendation';

export const useRecommendationStore = defineStore('recommendation', {
  state: () => ({
    recommendation: [] as Array<IRecommendedInstructor>,
    personalize: [] as Array<IRecommendPersonal>,
    all_recommendations: [] as Array<IRecommendedInstructor>,
  }),

  getters: {
    getRecommendations: (state) => state.recommendation,
    getPersonalize: (state) => state.personalize,
    getAllRecommendations: (state) => state.all_recommendations,
  },

  actions: {
    initAllRecommendations (all_recommendations) {
      this.all_recommendations = all_recommendations;
    },
    addRecommendation (recommendation) {
      this.recommendation.push(recommendation);
    },
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
    clearAll () {
      this.recommendation = [];
      this.personalize = [];
      this.all_recommendations = [];
    },
    // setVisibility ()
  }
});
