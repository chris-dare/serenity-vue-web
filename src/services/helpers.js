import Vue from 'vue'
import { format } from 'date-fns'
export function createPatients(number = 10) {
    let patients = []
    for (let index = 0; index < number; index++) {
        patients.push({
            ...Vue.faker().helpers.createCard(),
            name: Vue.faker().name.findName(),
            gender: Vue.faker().random.boolean() ? 'male' : 'female',
            phone: Vue.faker().phone.phoneNumber(),
            recent: format(Vue.faker().date.recent(), 'yyyy-MM-dd HH:mm'),
            dob: format(Vue.faker().date.past(), 'yyyy-MM-dd'),
            email: Vue.faker().internet.email(),
            address: Vue.faker().address.streetAddress(),
            age: createRandom(100),
            weight: createRandom(100),
            height: createRandom(200),
            emergency_contact: Vue.faker().helpers.userCard(),
            avatar: Vue.faker().image.avatar(),
            image: Vue.faker().image.image(),
            time: format(Vue.faker().date.recent(), 'HH:mm a'),
            id: Vue.faker().random.uuid(),
        })
    }
    return patients
}

export function createAppointments(number = 10) {
    let appointments = []
    for (let index = 0; index < number; index++) {
        appointments.push({
            ...Vue.faker().helpers.createCard(),
            name: Vue.faker().name.findName(),
            gender: Vue.faker().random.boolean() ? 'male' : 'female',
            phone: Vue.faker().phone.phoneNumber(),
            recent: format(Vue.faker().date.recent(), 'yyyy-MM-dd HH:mm'),
            dob: format(Vue.faker().date.past(), 'yyyy-MM-dd'),
            email: Vue.faker().internet.email(),
            address: Vue.faker().address.streetAddress(),
            age: createRandom(100),
            weight: createRandom(100),
            height: createRandom(200),
            emergency_contact: Vue.faker().helpers.userCard(),
            avatar: Vue.faker().image.avatar(),
            image: Vue.faker().image.image(),
            time: format(Vue.faker().date.recent(), 'HH:mm a'),
            id: Vue.faker().random.uuid(),
        })
    }
    return appointments
}

export function createDoctors(number = 10) {
    let appointments = []
    for (let index = 0; index < number; index++) {
        appointments.push({
            ...Vue.faker().helpers.createCard(),
            name: Vue.faker().name.findName(),
            specialty: 'General practitioner',
            gender: Vue.faker().random.boolean() ? 'male' : 'female',
            phone: Vue.faker().phone.phoneNumber(),
            recent: format(Vue.faker().date.recent(), 'yyyy-MM-dd HH:mm'),
            dob: format(Vue.faker().date.past(), 'yyyy-MM-dd'),
            email: Vue.faker().internet.email(),
            address: Vue.faker().address.streetAddress(),
            age: createRandom(100),
            weight: createRandom(100),
            height: createRandom(200),
            emergency_contact: Vue.faker().helpers.userCard(),
            avatar: Vue.faker().image.avatar(),
            image: Vue.faker().image.image(),
            time: format(Vue.faker().date.recent(), 'HH:mm a'),
            id: Vue.faker().random.uuid(),
        })
    }
    return appointments
}

export function createRandom(number = 10) {
    return Math.floor(Math.random() * number) + 1
}

