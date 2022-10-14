import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

const opts = {
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    options: {
      customProperties: true
    },
    light: true,
    themes: {
      light: {
        primary: '#80ba24', //#1d3876
        red: '#BB0C2B', //#c1062e
        blue_light: '#80A1C9',
        green_light: '#e1f3f1',
        green: '#0b9264',
        green_2: '#4CAF50',
        secondary: '#4a5c66',
        accent: colors.shades.black,
        error: colors.red.accent3,
        warning: '#f7ad67',
        primary_light: '#738AAE', //#305886
        grey_light: '#F3F3F3', //#f7f7f7

        blue_background: '#EFF2F7',
        blue_shade1: '#D9E0ED',
        blue_shade2: '#5D759B'

      },
      dark: {
        primary: '#80ba24',
        red: '#c1002b',
        blue_light: '#5e5f63',
        green_light: '#e1f3f1',
        green: '#0b9264',
        secondary: colors.orange.darken4,
        accent: colors.shades.black,
        error: colors.red.accent3,
        warning: '#f7ad67',
        primary_light: '#738AAE', //#305886
        grey_light: '#F3F3F3', //#f7f7f7

        blue_background: '#EFF2F7',
        blue_shade1: '#D9E0ED',
        blue_shade2: '#5D759B'
      }
    }
  }
};

export default new Vuetify(opts)