<template>
  <div class="bg-white pb-4">
    <div class="p-4 grid grid-cols-2">
        <div>
            <p class="text-secondary mb-2">Doctor in charge</p>
            <div class="flex items-center">
                <img class="w-10 h-10 rounded-full mr-3" :src="$faker().image.image()" alt="">
                <div>
                    <p class="text-black">Dr. {{ $faker().name.findName() }}</p>
                    <p class="text-sm text-secondary">General practitioner</p>
                </div>
            </div>
        </div>
        <div>
            <p class="text-secondary mb-2">Date and Time of Encounter</p>
            <div class="flex items-center text-primary">
                <p>Thursday, Mar 13, 2020
                8:15 am </p>
            </div>
        </div>
    </div>
    <div>
        <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
            <div slot="title">
                <p class="text-serenity-primary">Diagnosis</p>
            </div>
            <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
        </ToggleList>
        <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
            <div slot="title">
                <p class="text-serenity-primary">Presenting Complaint</p>
            </div>
            <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
        </ToggleList>
        <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
            <div slot="title">
                <p class="text-serenity-primary">History of Presenting Complaint</p>
            </div>
            <p class="text-sm text-gray-500">Bronchitis, not specified as acute or chronic, Esophageal, patient not hospitalised. Read more</p>
        </ToggleList>
        <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
            <div slot="title">
                <p class="text-serenity-primary">Patient Vitals</p>
            </div>
            <EncounterPatientVitals />
        </ToggleList>
        <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
            <div slot="title">
                <p class="text-serenity-primary">Social History</p>
            </div>
        </ToggleList>
        <ToggleList class="border-solid border-t border-serenity-subtle-border px-4 pt-4">
            <div slot="title">
                <p class="text-serenity-primary">Laboratory Tests</p>
            </div>
            <EncounterPatientVitals />
        </ToggleList>
    </div>
  </div>
</template>

<script>
import EncounterPatientVitals from './EncounterPatientVitals'
export default {
    name: 'Encounters',

    components: {EncounterPatientVitals},
}
</script>

<style>

</style>