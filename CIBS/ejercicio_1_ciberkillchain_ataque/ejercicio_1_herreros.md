# Ejercicio CiberKillChain - Ataque

- **Alumno:** Matías Herreros
- **Descripción del proyecto:**
  El proyecto final es un "power meter". Se tendrá un dispositivo que estará sensando variables relacionadas al consumo eléctrico de un determinado espacio. La información recolectada será enviada mediante protocolo MQTT hacia un servidor Web hosteado en AWS. El servidor se encargará de almacenar los datos en una DB y se encargará de suministrar los datos a los usuarios. Los usuarios accederan a una plataforma web donde, luego de autenticarse, podran acceder a ver la información recolectada por sus dispositivos. A continuación queda el [link](https://drive.google.com/file/d/12ti13IbLsDRjlIgcy8_LsxKipwk9UGjv/view?usp=sharing) al archivo de planificación.

## Resolución

**Objetivo:** Acceder a los datos de consumo eléctrico de los usuarios registrados en el sistema para luego comercializar dicha información a las compañías distribuidoras de energía.

1. **Reconnaissance:**

   1. Identifico personas vinculadas al proyecto y conseguir / inferir sus mails - [Technique T1589](https://attack.mitre.org/techniques/T1589/) - [Technique T1594](https://attack.mitre.org/techniques/T1594/)
   2. Identifico IP de la API - [Technique T1590](https://attack.mitre.org/techniques/T1590/)
   3. Relevo topología del sistema. - [Technique T1590](https://attack.mitre.org/techniques/T1590/)
   4. Relevo mecanismos de seguridad presentes. - [Technique 1590](https://attack.mitre.org/techniques/T1590/)
   5. Relevo tecnologías utilizadas para la confección de la API. - [Technique T1595](https://attack.mitre.org/techniques/T1595)
   6. Relevo formatos y estilos estándar de las comunicaciones de los distintos proveedores de servicios utilizados en el sistema objetivo.

2. **Weaponization:**

   1. **Decido** realizar ataques de phishing a las personas vinculadas al proyecto.
   1. **Decido** preparar mails copiando los estilos utilizados en las comunicaciones de los proveedores de servicios del sistema objetivo.
   1. **Decido** preparar un listado priorizado de mails a los cuales enviar los mensajes falsos. Se priorizan personas con menor seniority.
   1. **Decido** preparar una `landing page` idéntica a la de uno de los proveedores con el objetivo de que la persona atacada ingrese sus credenciales.
   1. **Puedo**, dado que conozco las IPs y la topología de la API, realizar un ataque de denegación de servicio.
   1. **Puedo**, dado que conozco las tecnologías utilizadas en la API, explotar vulnerabilidades de los sistemas utilizados.

3. **Delivery:**

   1. Envío, siguiendo el listado priorizado de personas, mails simulando ser de algún peoveedor de servicios del sistema.
