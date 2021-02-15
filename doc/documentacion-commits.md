# Reglas de la Documentacion de Commit's
El siguiente documento expresa cómo deberá ser el formato de los mensajes
de los commits en Git. Estas reglas nos permitiran tener **mensajes
legibles** que son fáciles de seguir cuando se mira a través de la **historia
del proyecto**, como tambien nos permitirá generar un archivo "**CHANGELOG.md**" organizado de manera automatizada.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Reglas de la Documentacion de Commit's](#reglas-de-la-documentacion-de-commits)
  - [1.- Estructura del archivo `.changelogrc`](#1--estructura-del-archivo-changelogrc)
  - [2.- Lista de Tipos de Commits](#2--lista-de-tipos-de-commits)
  - [3.- Formato del Mensaje de un Commit](#3--formato-del-mensaje-de-un-commit)
  - [4.- Valores Permitidos en `<espacio>`](#4--valores-permitidos-en-espacio)
  - [5.- Texto del `<asunto>`](#5--texto-del-asunto)
  - [6. Hacer referencia a Incidencia(s)](#6-hacer-referencia-a-incidencias)
    - [6.1 Referencias Especiales de GitLab](#61-referencias-especiales-de-gitlab)
      - [6.1.1 Referencias Soportadas](#611-referencias-soportadas)
  - [7. Ejemplos](#7-ejemplos)
  - [8.- Ultima Revision](#8--ultima-revision)

<!-- /TOC -->

## 1.- Estructura del archivo `.changelogrc`

```json
{
    "app_name": "<Nombre de la Aplicación>",
    "logo": "<url logo proyecto>",
    "intro": "<Descripción del Proyecto>",
    "branch" : "<Nombre Rama Principal>",
    "repo_url": "",
    "version_name" : "<Version del Proyecto ej.v1.0.0>",
    "file": "CHANGELOG.md",
    "template": "<Nombre Plantilla mostrar la lista de cambios ej. myCustomTemplate.md>",
    "sections": [
        {
            "title": "Corrección de Incidencias",
            "grep": "^fix"
        },
        {
            "title": "Nuevas Funcionalidades",
            "grep": "^feat"
        },
        {
            "title": "Documentación",
            "grep": "^docs"
        },
        {
            "title": "Breaking changes",
            "grep": "BREAKING"
        },
        {
            "title": "Refactorización",
            "grep": "^refactor"
        },
        {
            "title": "Estilo de Codificación",
            "grep": "^style"
        },
        {
            "title": "Pruebas",
            "grep": "^test"
        },
        {
            "title": "Trabajo Rutinario",
            "grep": "^chore"
        },
        {
            "title": "Ramas Integradas",
            "grep": "^Merge branch"
        }
    ]
}
```
## 2.- Lista de Tipos de Commits
1. **feat**: Nueva funcionalidad desarrollada e integrada al sistema
2. **fix**: Corrección de fallas o comportamientos no esperados dentro de la aplicación.
3. **docs**: Cambios únicamente en la documentación.
4. **style**: Los cambios que no afectan el funcionamiento del código (espacio en blanco, formato, puntos y comas que faltan, etc).
5. **refactor**: Un cambio de código que no corrige un error y no agrega una nueva funcionalidad, normalmente se utiliza para performance
6. **test**: Agregar cambios en los archivos de pruebas
7. **chore**: Los cambios en el proceso de compilación o herramientas auxiliares y bibliotecas.

## 3.- Formato del Mensaje de un Commit
Cada mensaje de un commit consta de un formato especial que incluye un
**tipo**, un **espacio** y un **asunto**:

```
<tipo>(<espacio>): <asunto>(<Incidencia(s)>)
```
- El [**tipo**](#2-lista-de-tipos-de-commits)(**obligatorio**)
- El **espacio** (**opcional**)
- El **asunto** (**obligatorio**)
- El **Incidencia(s)** (**obligatorio**)

## 4.- Valores Permitidos en `<espacio>`
Especificacion del modulo, archivo o carpeta donde se realizan trabajos para mayor detalle, ej. (readme, conf.ini, funcionalidad.)

## 5.- Texto del `<asunto>`
* El uso imperativo presente: "cambio" no "modificados" ni "cambios"
* No utilices mayúsculas en la primera letra
* No agregar un punto (.) Al final


## 6. Hacer referencia a Incidencia(s)
### 6.1 Referencias Especiales de GitLab
Dentro de github se puede hacer referencia fácilmente, eje. un `issue`, un `commit`, un miembro del equipo o incluso todo el equipo dentro de un proyecto.

**GitLab Flavored Markdown** identificara convertirá esa referencia en un enlace para que pueda navegar entre ellos fácilmente.

#### 6.1.1 Referencias Soportadas

| input                      | references                                           |
|:---------------------------|:-----------------------------------------------------|
| `@user_name`               | Usuario Especifico                                   |
| `@group_name`              | Grupo Especifico                                     |
| `#123`                     | Insidencia `issue`                                   |
| `!123`                     | Merge Request                                        |
| `~123`                     | Etiqueta por Id                                      |
| `~bug`                     | Etiqueta(`una palabra`) por Nombre                   |
| `~"feature request"`       | Etiqueta(`multiples palabras`) por Nombre            |
| `%123`                     | Milestone por Id                                     |
| `%v1.23`                   | Milestone(`una palabra`) por Nombre                  |
| `%"release candidate"`     | Milestone(`multiples palabras`) por Nombre           |
| `9ba12248`                 | Commit Especifico                                    |
| `9ba12248...b19a04f5`      | Comparación Rango Commits                            |
| `[README](doc/README)`     | Referencia a un archivo del repositorio              |
| `[README](doc/README#L13)` | Referencia a una Linea de un archivo del repositorio |

## 7. Ejemplos

```
feat: readme actualizado (popstate/hashchange/polling)
```

```
feat: onUrlChange evento (popstate/hashchange/polling)
```

```
fix(compile): se integran pruebas unitarias IE9 (#392)
```

```
feat(directive): ng:disabled, ng:checked, ng:multiple, ng:readonly, ng:selected(#351)
```

```
style($location): se agregan un par de punto y comas faltantes
```

```
docs(guide): se actualizan documentos de Google Docs (#35)
```


## 8.- Ultima Revision

**Oscar Daniel Perez** - _odprz.dev@gmail.com_ - [@odprz-dev](https://github.com/odprz-dev) - 14-02-2021

