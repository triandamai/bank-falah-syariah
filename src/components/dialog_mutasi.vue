<template>
  <v-dialog
    transition="dialog-bottom-transition"
    max-width="600"
    v-model="show"
    persistent
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>{{$t('Option Cetak Mutasi')}}</v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12">
                <v-text-field
                    v-model="form.total"
                    :label="$t('Total Row')"
                    :rules="rules"
                    type="number"
                    required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="form.first"
                    :label="$t('First Row')"
                    :rules="rules"
                    type="number"
                    required
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                    v-model="form.last"
                    :label="$t('End Row')"
                    :rules="rules"
                    type="number"
                    required
                />
              </v-col>

            </v-row>
          </v-container>
          <small>{{$t('indicates required field')}}</small>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close(dialog.value)"
          >
            {{ $t('Close') }}
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit"> {{ $t('Save') }} </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>


import componentMixin from "@/mixin/component.mixin"
export default {
  mixins:[componentMixin],
  data: () => {
    return {
      max:2,
      form: {
      },
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length <= 2) || 'Max 2 characters',
      ],
    };
  }
};
</script>
