import EncountersAPI from '@/api/encounters'
import Vue from 'vue'
import Encounter from '@/models/Encounter'
import { SET_ENCOUNTERS, UPDATE_ENCOUNTER, SET_ENCOUNTER, SET_ENCOUNTER_STATE, SET_PATIENT_CURRENT_ENCOUNTER, SET_PATIENT_CURRENT_ENCOUNTER_OVERRIDE } from './mutation-types'

export default {
  async refresh({ commit }) {
    commit(SET_ENCOUNTERS, [])
    commit(SET_ENCOUNTER, {})
    commit(SET_PATIENT_CURRENT_ENCOUNTER, {})
  },

  async initSinglePatientEncounterInformation({dispatch}, {encounter, patient }) {
    await dispatch('getEncounter', encounter)
    dispatch('visits/getPatientCurrentVisits', {patient, status: 'arrived'}, { root:true })
    await dispatch('patients/getPatient', patient, { root:true })
    dispatch('setCurrentEncounterState')
    dispatch('patients/getServiceRequests', patient, { root:true })
    dispatch('patients/getMedicationRequests', { patient }, { root:true })
    dispatch('patients/getObservations', { refresh: true, filters: { patient }}, { root: true })
    dispatch('patients/getDiagnosis', patient, { root:true })
    dispatch('patients/getNotes', patient, { root:true })
    dispatch('diagnostic/getDiagnosticReports', patient , { root:true })
    dispatch('resources/getEncounterStatuses', null, { root:true })
    dispatch('patients/getReferrals', {patient} , { root:true })
    dispatch('patientAllergies/getAllergies', patient , { root:true })
    dispatch('resources/getObservationUnitTypes', null, { root:true })
    dispatch('resources/getObservationInterpretationTypes', null, { root:true })
    dispatch('resources/getVitalsUnitTypes', null, { root:true })
    dispatch('resources/getSocialHistoryUnitTypes', null, { root:true })
    dispatch('resources/getSystemExamUnitTypes', null, { root:true })
    dispatch('resources/getEncounterPriorities', null, { root:true })
  },

  async getEncounters({ commit, rootState }, params) {
    try {
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.list(provider.id, params)
      commit(SET_ENCOUNTERS, data)
      commit(SET_ENCOUNTER, data.find(encounter => encounter.status === 'in-progress') || data[0])
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  async getVisitEncounter({ commit, rootState, rootGetters }, params) {
    try {
      const provider = rootState.auth.provider
      params.visit = rootGetters['visits/visitId']
      if (!params.visit) return
      const { data } = await EncountersAPI.list(provider.id, params)
      commit(SET_ENCOUNTER, data.find(encounter => encounter.status === 'in-progress') || data[0])
      commit(SET_PATIENT_CURRENT_ENCOUNTER, data.find(encounter => encounter.status === 'in-progress') || data[0])
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  setCurrentEncounter({commit, state}, id) {
    commit(SET_ENCOUNTER, state.encounters.find(encounter => encounter.id === id))
  },

  setVitalsEncounter({commit}, encounter) {
    commit(SET_ENCOUNTER, encounter)
  },

  setEncounterFromUpcomingEncounters({commit}, encounters) {
    commit(SET_ENCOUNTER, encounters.find(encounter => encounter.status === 'in-progress' || encounter.status === 'planned'))
  },

  async setPatientCurrentEncounter({ commit, rootState, dispatch }, encounter) {
    const provider = rootState.auth.provider

    const {data} = await EncountersAPI.get(provider.id, encounter.id)
    commit(SET_PATIENT_CURRENT_ENCOUNTER, data)
    dispatch(
      'patients/getServiceRequests',
      { encounter: encounter.id, patient: encounter.patient },
      { root: true },
    )
    dispatch(
      'diagnostic/getDiagnosticReports',
      { encounter: encounter.id, patient: encounter.patient },
      { root: true },
    )
    dispatch(
      'patients/getMedicationRequests',
      { encounter: encounter.id, patient: encounter.patient },
      { root: true },
    )
  },

  setPatientCurrentEncounterOverride({commit}, status) {
    commit(SET_PATIENT_CURRENT_ENCOUNTER_OVERRIDE, status)
  },

  async getEncounter({ commit, rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.get(provider.id, id)
      commit(SET_ENCOUNTER, data)
      return
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  // eslint-disable-next-line no-unused-vars
  async createEncounter({ commit, rootState, rootGetters }, payload) {
    try {
      const provider = rootState.auth.provider
      // TODO
      let appointment = rootGetters['appointments/patientNextAppointment']
      let visit = rootGetters['visits/visitId']
      let user = rootState.auth.provider
      let location = rootState.global.location
      const encounter = new Encounter(payload).getCreateView(user,location, appointment )
      const { data } = await EncountersAPI.create(provider.id, { ... encounter, visit, service_provider: provider.id })
      commit(UPDATE_ENCOUNTER, data)
      commit(SET_ENCOUNTER, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateEncounter({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, payload)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
    } catch ({ response: { data: error } }) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async startEncounter({ commit, rootState }, encounterId) {
    try {
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.start(provider.id, encounterId)
      commit(SET_ENCOUNTER, data.data)
      commit(UPDATE_ENCOUNTER, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async endEncounter({ commit, state, rootState }, currentEncounter = state.currentEncounter) {
    try {
      const encounter = new Encounter(currentEncounter).getEndView()
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
      commit(SET_ENCOUNTER_STATE, 0)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createDiagnosis({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_diagnosis.push(payload)
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createNote({ commit, state, rootState, dispatch }, payload) {
    try {
      let encounter = state.currentEncounter

      const provider = rootState.auth.provider
      encounter.encounter_patient_notes.push({ ...payload })
      const { data } = await EncountersAPI.update(provider.id, encounter)

      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
      dispatch('patients/getNotes', rootState.patients.currentPatient.id, { root:true })
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async recordEncounterAction({ commit, rootState }, payload) {
    try {
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.encounterActions(provider.id, payload)

      commit(SET_ENCOUNTER, data.data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateNote({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_patient_notes = encounter.encounter_patient_notes.map(a => {
        if (a.id === payload.id) return payload
        return a
      })

      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)

    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async removeNote({ commit, state, rootState }, id) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_patient_notes = encounter.encounter_patient_notes.filter((es) => es.id !== id)

      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)

    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async createCarePlan({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter

      const provider = rootState.auth.provider
      encounter.encounter_care_plan.push(payload)
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
      commit(UPDATE_ENCOUNTER, data)
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async updateCarePlan({ commit, state, rootState }, payload) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_care_plan = encounter.encounter_care_plan.map(a => {
        if (a.id === payload.id) return payload
        return a
      })

      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)

    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error
    }
  },

  async exportPrescription({ rootState }, id) {
    try {
      const provider = rootState.auth.provider
      const data = await EncountersAPI.printPrescription(provider.id, id)

      return data
    } catch (error) {
      Vue.prototype.$utils.error(error)
      throw error.data || error
    }
  },

  async deleteCarePlan({ commit, state, rootState}, id) {
    try {
      let encounter = state.currentEncounter
      encounter.encounter_care_plan = encounter.encounter_care_plan.filter((es) => es.id !== id)

      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.update(provider.id, encounter)
      commit(SET_ENCOUNTER, data)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },



  async updateDiagnosis({ commit, state, rootState}, payload) {
    try {
      let encounter = state.currentEncounter
      const provider = rootState.auth.provider
      const { data } = await EncountersAPI.updateDiagnosis(provider.id, payload)
      const diagnostic = encounter.encounter_diagnosis.find(el => el.id == payload.id)
      diagnostic.role = data.role
      diagnostic.condition = data.condition
      diagnostic.note = data.note
      commit(SET_ENCOUNTER, encounter)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },


  async deleteDiagnosis({ commit, state, rootState}, id) {
    try {
      let encounter = state.currentEncounter
      const provider = rootState.auth.provider
      await EncountersAPI.deleteDiagnosis(provider.id, id)
      const index = encounter.encounter_diagnosis.findIndex(el => el.id == id)
      encounter.encounter_diagnosis.splice(index, 1)
      commit(SET_ENCOUNTER, encounter)
    } catch ({ response: { data: error } }) {
      throw error
    }
  },

  setCurrentEncounterState({ commit, state }) {
    commit(SET_ENCOUNTER_STATE, state.encounterState+1)
  },

}
