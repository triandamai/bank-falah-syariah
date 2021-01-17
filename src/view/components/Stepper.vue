<template>
  <!--begin: Wizard Nav -->
  <div class="wizard-nav border-right py-8 px-8 py-lg-20 px-lg-10">
    <div class="wizard-steps">
      <div
        v-for="step in steps"
        :key="step.id"
        class="wizard-step"
        data-wizard-type="step"
        data-wizard-state="{step.id = 1 ? 'current' : ''}"
      >
        <div class="wizard-wrapper">
          <div class="wizard-label">
            <h3 class="wizard-title">
              {{ step.title }}
            </h3>
            <div class="wizard-desc">
              {{ step.subtitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--end: Wizard Nav -->
</template>
<script>
export default {
  props: {
    steps: Array,
  },
};
</script>
