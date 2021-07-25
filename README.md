# bank-falah-syariah
Menggunakan Vue JS  [Configuration Reference](https://cli.vuejs.org/config/).

### Infrastructure
-[] Vue js versi 2++
-[] Boostrap 
-[] vuetify 2++
-[] Vuex Store
-[] Vue Router
-[] Lumen(sebagai Back End) [Back End](https://github.com/rochman25/aksioma_service)
-[] Axios
Semua Resourse Full Client-Side dan Back-End side

### project structure

```text
assets
data
locale
plugin
mixin
services
utils
page
compontent
store
```

### Menu
Apps menu menggunakan dinamis menu berdasarkan role tersedia di object privilages
karena applikasi dituntut dinamis dalam penggunaan role

```json
{
  "headTitle1": "General",
  "headTitle2": "Dashboards,features & data.",
  "type": "headtitle",
  "path": "General",
  "privilage": {
    "roles": [
      "public"
    ]
  },
  "children": [
    {
      "headTitle1": "General",
      "headTitle2": "Dashboards,features & data.",
      "type": "headtitle",
      "path": "General",
      "privilage": {
        "roles": ["public"]

      }
    }
  ]
}
```
