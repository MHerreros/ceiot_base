# Ejercicio CiberKillChain - Ataque

- **Alumno:** Matías Herreros
- **Descripción del proyecto:**
  El proyecto final es un "power meter". Se tendrá un dispositivo que estará sensando variables relacionadas al consumo eléctrico de un determinado espacio. La información recolectada será enviada mediante protocolo MQTT hacia un servidor Web hosteado en AWS. El servidor se encargará de almacenar los datos en una DB y se encargará de suministrar los datos a los usuarios. Los usuarios accederan a una plataforma web donde, luego de autenticarse, podran acceder a ver la información recolectada por sus dispositivos. A continuación queda el [link](https://drive.google.com/file/d/12ti13IbLsDRjlIgcy8_LsxKipwk9UGjv/view?usp=sharing) al archivo de planificación.

## Resolución

**Objetivo:** Acceder a los datos de consumo eléctrico de los usuarios registrados en el sistema para luego comercializar dicha información a las compañías distribuidoras de energía.

1. **Reconnaissance:**

   1. Identifico personas vinculadas al proyecto y consigo / infiero sus mails - [Technique T1589](https://attack.mitre.org/techniques/T1589/) - [Technique T1594](https://attack.mitre.org/techniques/T1594/)
   2. Identifico IP de la API - [Technique T1590](https://attack.mitre.org/techniques/T1590/)
   3. Relevo topología del sistema. - [Technique T1590](https://attack.mitre.org/techniques/T1590/)
   4. Relevo mecanismos de seguridad presentes. - [Technique 1590](https://attack.mitre.org/techniques/T1590/)
   5. Relevo tecnologías utilizadas para la confección de la API. - [Technique T1595](https://attack.mitre.org/techniques/T1595)
   6. Relevo formatos y estilos estándar de las comunicaciones de los distintos proveedores de servicios utilizados en el sistema objetivo.

2. **Weaponization:**

   1. **Decido** realizar ataques de phishing a las personas vinculadas al proyecto.
      1. **Decido** preparar mails copiando los estilos utilizados en las comunicaciones de los proveedores de servicios del sistema objetivo.
      2. **Decido** preparar un listado priorizado de mails a los cuales enviar los mensajes falsos. Se priorizan personas con menor seniority.
      3. **Decido** preparar una `landing page` idéntica a la de uno de los proveedores con el objetivo de que la persona atacada ingrese sus credenciales.
      4. **Decido** preparar scripts específicos para los distintos subsistemas reconocidos en el paso 1 que me permitan acceder a datos de bases de datos y/o interceptarlos.
   2. **Puedo**, dado que conozco las IPs y la topología de la API, realizar un ataque de denegación de servicio.
   3. **Puedo**, dado que conozco las tecnologías utilizadas en la API, explotar vulnerabilidades de los sistemas utilizados.

3. **Delivery:**

   1. Envío mails simulando ser un peoveedor de servicios del sistema siguiendo el listado priorizado de personas. - [Technique T1566](https://attack.mitre.org/techniques/T1566)

4. **Exploitation:**

   1. **Decido** utilizar las credenciales ingresadas por el usuario en el falso `login` para ingresar en el sistema real.
   2. **Decido**, una vez dentro del sistema, acceder a buckets, ingresar al administrador de base de datos, acceder a las maquinas virtuales presentes y ejecutar los scripts preparados para leer e interceptar los datos. - [Technique T1651](https://attack.mitre.org/techniques/T1651)
   3. **Puedo** ingresar al sistema e invesigarlo por dentro.

5. **Installation:**

   1. **Decido** guardar las credenciales ingresadas por el empleado con el objetivo de utilizarlas cuantas veces sea necesario. - [Technique T1098](https://attack.mitre.org/techniques/T1098)
   2. **Puedo** crear credenciales nuevas para lograr un acceso a largo plazo al sistema. - [Technique T1136](https://attack.mitre.org/techniques/T1136)

6. **Command & Control:**

   1. **Decido** implementar un canal que me permita transferir datos desde el sistema atacado hacia mí.
      1. **Decido** establecer comunicaciones con las máquinas virtuales presentes siguiendo los protocolos que ya son utilizados con el objetivo de `ocultar` el tráfico / comunicación maliciosa. - [Technique T1071](https://attack.mitre.org/techniques/T1071)
      2. **Decido** establecerme como un `Adversary in the Middle` entre las máquinas virtuales infectadas y el resto de los sistemas que interactúan con ellas con el objetivo de obtener la data transferida entre las mismas (desde datos recolectados por sensores hasta credenciales). - [Technique T1557](https://attack.mitre.org/techniques/T1557)
      3. **Decido** encriptar la data recolectada para hacer que sea mas difícil a la víctima reconocer la exfiltración de la información. - [Technique T1560](https://attack.mitre.org/techniques/T1560)
   2. **Puedo** alterar las credenciales de acceso al sistema.
   3. **Puedo** alterar la configuración del sistema para provocar la caída del mismo.

7. **Actions and objectives:**
   1. **Decido** extraer toda la información posible sobre los clientes, sus consumos, ubicaciones, etc. La información la extraigo mediante métodos de exfiltración utilizando un protocolo ya utilizado dentro del sistema (DNS, http). - [Technique T1048](https://attack.mitre.org/techniques/T1048)
   2. **Decido** extraer toda la información posible de la compañía y sus sistemas para continuar profundizando el ataque.
