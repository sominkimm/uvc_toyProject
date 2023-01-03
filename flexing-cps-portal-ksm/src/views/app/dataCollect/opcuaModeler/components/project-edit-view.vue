<template>
  <b-modal
    id="modal-modeler-editview"
    centered
    :title="$t('dataCollect.projectEdit')"
    no-close-on-backdrop
    no-close-on-esc
  >
    <b-form
      @keyup.ctrl.enter="saveProject"
      @submit.prevent.stop=""
    >
      <b-row>
        <b-form-group
          class="col-md-12"
          :label="$t('dataCollect.projectName')"
        >
          <b-form-input
            v-model="editProjectName"
            autofocus
            type="text"
            :placeholder="$t('dataCollect.projectName')"
          />
          <div
            v-if="isSubmit && !$v.editProjectName.required"
            class="app-validation"
          >
            {{ $t("dataCollect.description.projectName") }}

            HELLO
          </div>
        </b-form-group>
      </b-row>
    </b-form>
    <template #modal-footer>
      <b-button
        :variant="
          button.variant.addNew"
        size="sm"
        @click="cancel()"
      >
        {{ $t("button.cancelBtn") }}
      </b-button>
      <span
        v-b-tooltip.hover="{ placement: 'top', title: $t('Common.Message.submitKey') }"
      >
        <b-button
          :variant="
            button.variant.update"
          size="sm"
          @click="saveProject"
        >
          {{ $t("button.editBtn") }}
        </b-button>
      </span>
    </template>
  </b-modal>
</template>
<script>
import mixinUtil from '@/lib/utils/mixinUtil'
import { required } from 'vuelidate/lib/validators'
import EventBus from '@/lib/utils/event-bus'
export default {
  mixins: [mixinUtil],
  props: {
    selectedProject: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isSubmit: false,
      editProjectName: '',
      editProjectId: null
    }
  },
  validations: {
    editProjectName: {
      required
    }
  },
  mounted () {
    EventBus.$on('projectNameEdit', this.nameUpdate)
  },
  methods: {
    nameUpdate (e) {
      this.editProjectId = e.id
      this.editProjectName = e.name
    },
    saveProject () {
      this.$v.$touch() // validateion 전체 체크
      this.isSubmit = true
      if (!this.$v.$invalid) {
        // validation 통과 시 submit 실행
        const params = {
          id: this.editProjectId,
          name: this.editProjectName
        }
        this.$emit('clickSave', params)
        // this.$emit('update:dialog', false)
        this.isSubmit = false
      }
    },
    cancel () {
      this.$bvModal.hide('modal-modeler-editview')
      this.isSubmit = false
    }
  }
}
</script>

<style>
.app-validation {
  color: #ff5252;
  font-size: 11px;
}
</style>
