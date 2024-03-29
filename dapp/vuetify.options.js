import colors from 'vuetify/es5/util/colors'

export default {
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.blueGrey,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: '#8ae8d6',
        secondary: '#8ae8d6',
        secondaryLight: colors.indigo.lighten2,
        third: colors.teal.darken1,
        thirdLight: colors.teal.lighten1,
        grey: colors.grey.darken1,
        red: colors.red.lighten2,
        accent: '#8ae8d6',
        error: '#ff4444',
        info: '#33b5e5',
        success: '#00C851',
        warning: '#ffbb33',
        edgeColor: '#3A87AD',
      },
    },
  },
}
