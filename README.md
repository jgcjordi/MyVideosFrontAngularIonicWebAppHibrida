# Web App Hibrida, con Angular, Ionic, Capacitor y Youtube Api

1º: ![image](https://github.com/jgcjordi/MyVideosFrontAngularIonicWebAppHibrida/blob/master/others-readmemd/gif1.gif) 2º: ![image](https://github.com/jgcjordi/MyVideosFrontAngularIonicWebAppHibrida/blob/master/others-readmemd/gif2.gif)

## Tecnologías Utilizadas

* Para el desarrollo de la web app hibrida se ha utilizado Angular, Ionic como framework de UI, Capacitor para utilizar funcionalidades nativas, como el acceso a la camara o a las imagenes del dispositivo movil.

* Para el desarrollo del backend se ha utilizado express con node y Mongo db como base de datos.

![image](https://github.com/jgcjordi/MyVideosFrontAngularIonicWebAppHibrida/blob/master/others-readmemd/tecnologies.png)

### Funcionalidades

* En la ventana My Videos, se muestran los videos que el usuario carga en la aplicación, en la versión mobile de android, el apk no se encuentra activa debido a una restriccion en el api key de youtube entonces no funcionara esta parte, se puede acceder a los videos del dispositivo. Tambien se puede editar los videos, eliminarlos, reproducirlos y añadirlos a una lista de reproduccion de la ventana playlists. Esta ventana tambien dispone de un buscador/filtro de videos.

* Al editar un video en Video Properties, es posible cambiar la imagen identificativa de este a traves de la camara o las imagenes del dispositivo movil.

* En la ventana Youtube Videos, se pueden buscar videos de youtube, ver sus caracteristicas, reproducirlos y añadirlos a una playlist.

* En la ventana Playlists, se muestran las playlist que agrupan los videos de las otras dos pestañas.

### Backend con Expres y Mongo DB

* Este proyecto se ha modificado en los siguientes repositorios para añadir un backend con Express y Mongo DB.