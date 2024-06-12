# Ejercicio CiberKillChain - Ataque

- **Alumno:** Matías Herreros

## Enunciado:

Desarrollar la defensa en función del ataque planteado en orden inverso. No es una respuesta a un incidente, hay que detectar el ataque independientemente de la etapa.

Para cada etapa elegir una sola defensa, la más importante, considerar recursos limitados.

## Resolución

1. **Actions and objectives:**

   1. **Decido** restringir el tráfico hacia determinados sistemas (ej.: DNS) para que solo determinados sistemas puedan accederlos y no cualquiera que este dentro de la red. - [Mitigation M1037](https://attack.mitre.org/mitigations/M1037)

2. **Command & Control:**

   1. **Decido** encriptar la data transmitida desde los sensores hacia el servidor para que, aunque alguien intercepte el tráfico, no pueda en la práctica ver la información transmitida. - [Mitigation M1041](https://attack.mitre.org/mitigations/M1041)
   2. **Puedo** segmentar la red interna para aislar los distintos sistemas y mitigar o reducir el alcance que puede tener un `Adversary in the Middle`. - [Mitigation M1030](https://attack.mitre.org/mitigations/M1030)

3. **Installation:**

   1. **Decido** implementar doble factor de autenticación para que, aunque el atacante obtenga las credenciales, no pueda iniciar sesion por no poder completar el segundo factor de autenticación. - [Mitigation M1032](https://attack.mitre.org/mitigations/M1032)

4. **Exploitation:**

   1. **Decido** minimizar la cantidad de cuentas con accesos privilegiados al sistema. Al reducir la cantidad de usuarios con acceso, minimizo el universo de personas que pueden ser victimas del phishing. - [Mitigation M1026](https://attack.mitre.org/mitigations/M1026)

5. **Delivery:**

   1. **Decido** realizar capacitaciones y campañas de concientización entre los empleados para que estén entrenados para detectar posibles casos de Phsishing. - [Mitigation M1017](https://attack.mitre.org/mitigations/M1017)

6. **Weaponization:**

   1. Si bien es difícil protegerse contra un ataque que aún es desconocido, **decido** tomar medidas preventivas generales. Dentro de esas medidas **decido** realizar campañas de concientización entre los empleados, **decido** realizar charlas conjuntas con los distintos proveedores de servicios para que nos cuenten qué medidas de seguridad poseen y cómo podemos implementarlas para hacer un uso seguro de sus sistemas.

7. **Reconnaissance:**

   1. **Decido** minimizar el riesgo reduciendo al mínimo posible la exposición de datos hacia usuarios desconocidos. - [Mitigation M1056](https://attack.mitre.org/mitigations/M1056/)
   2. **Puedo** `detectar` intentos de reconocimiento analizando el tráfico entrante a mi sistema con el fin de detectar patrones, direcciones repetidas, intentos de login repetidos, etc. - [Datasource - DS0029](https://attack.mitre.org/datasources/DS0029/)
