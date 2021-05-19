<template functional>
  <div class="bg-white p-6 my-6">
    <div>
      <p class="mb-6 text-lg text-serenity-primary">Confirm Vitals Submission</p>
      <div class="grid grid-cols-4">
        <div class="space-y-1 h-40 border-b border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Height (cm)</p>
          <p class="text-black text-4xl font-semibold">{{ props.form.height || 0 }} <span class="text-base font-light">cm</span></p>
        </div>
        <div class="space-y-1 h-40 border-b border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Weight (kg)</p>
          <p class="text-black text-4xl font-semibold">{{ props.form.weight || 0 }} <span class="text-base font-light">kg</span></p>
        </div>
        <div class="space-y-1 h-40 border-b border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">(Calculated) BMI</p>
          <p class="text-black text-4xl font-semibold">{{ props.form.bmi || 0 }}</p>
        </div>
        <div class="space-y-1 h-40 border-b border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Temperature (C)</p>
          <p class="text-black text-4xl font-semibold">{{ props.form.temperature || 0 }} <span class="text-base font-light">°C</span></p>
        </div>
        <div class="space-y-1 h-40 border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Pulse</p>
          <p class="text-black text-4xl font-semibold">{{ props.form.pulse || 0 }} <span class="text-base font-light">/min</span></p>
        </div>
        <div class="space-y-1 h-40 border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Respiratory rate</p>
          <p class="text-black text-4xl font-semibold">{{ props.form.respiration_rate || 0 }} <span class="text-base font-light">/min</span></p>
        </div>
        <div class="space-y-1 h-40 border-r border-solid border-tetiary flex items-center justify-center flex-col">
          <p class="text-secondary">Blood Pressure</p>
          <p class="text-black text-4xl font-semibold">{{ props.form.systolic || 0 }} /{{ props.form.diastolic || 0 }}</p>
        </div>
        <div class="space-y-1 h-40 flex items-center justify-center flex-col">
          <p class="text-secondary">Arterial blood oxygen saturation</p>
          <p class="text-black text-4xl font-semibold">{{ props.form.saturation || 0 }} <span class="text-base font-light">%</span></p>
        </div>
      </div>
      <div class="flex items-center justify-between mt-12">
        <SeButton
          variant="secondary"
          @click="listeners['back']"
        >
          Go back
        </SeButton>
        <SeButton
          :loading="props.loading"
          @click="listeners['save']"
        >
          Submit
        </SeButton>
      </div>
    </div>
  </div>
</template>
