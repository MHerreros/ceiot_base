# Ejercicio CiberKillChain - Ataque

- **Alumno:** Matías Herreros
- **Descripción del proyecto:**
  El proyecto final es un "power meter". Se tendrá un dispositivo que estará sensando variables relacionadas al consumo eléctrico de un determinado espacio. La información recolectada será enviada mediante protocolo MQTT hacia un servidor Web hosteado en AWS. El servidor se encargará de almacenar los datos en una DB y se encargará de suministrar los datos a los usuarios. Los usuarios accederan a una plataforma web donde, luego de autenticarse, podran acceder a ver la información recolectada por sus dispositivos. A continuación queda el [link](https://drive.google.com/file/d/12ti13IbLsDRjlIgcy8_LsxKipwk9UGjv/view?usp=sharing) al archivo de planificación.

## Resolución

**Objetivo:** Acceder a los datos de consumo eléctrico de los usuarios registrados en el sistema para luego comercializar dicha información a las compañías distribuidoras de energía.

1. **Reconnaissance:**

- Identifico IP de la API - [Technique T1590](https://attack.mitre.org/techniques/T1590/)
- Relevo topología del sistema. - [Technique T1590](https://attack.mitre.org/techniques/T1590/)
- Relevo mecanismos de seguridad presentes. - [Technique 1590](https://attack.mitre.org/techniques/T1590/)
- Relevo tecnologías utilizadas para la confección de la API. - [Technique T1595](https://attack.mitre.org/techniques/T1595)
- Identifico personas vinculadas al proyecto y conseguir / inferir sus mails - [Technique T1589](https://attack.mitre.org/techniques/T1589/) - [Technique T1594](https://attack.mitre.org/techniques/T1594/)

2. **Weaponization:**

- **Puedo** realizar ataques de phishing a los empleados.
- **Puedo** realizar un ataque de denegación de servicio.
- **Puedo** explotar vulnerabilidades inherentes a los sistemas utilizados en la confección de la API.
