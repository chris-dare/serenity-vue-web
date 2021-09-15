import Patient from '@/models/Patient'
export default {
  patients: state => {
    return state.patients.map(pat => {
      const patient = new Patient(pat).getNormalizedView()
      return patient
    })
  },

  cartItemCount: state => state.cart.length,

  cartItemIds: state => state.cart.map(el => el.id),

  cartTotal: state => state.cart.reduce((acc, el) => {return acc + el.selling_price}, 0),
}
