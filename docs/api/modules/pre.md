# Namespace: pre

## Functions

### sir

▸ **sir**(`N`, `beta`, `gamma`, `S`, `I`, `R`, `meta`): [`Model`](model.md#model)

Creates an SIR model with the given parameters

#### Parameters

| Name            | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `N`             | `string` | The total population                          |
| `beta`          | `string` | The infection rate                            |
| `gamma`         | `string` | The recovery rate                             |
| `S`             | `string` | The initial number of susceptible individuals |
| `I`             | `string` | The initial number of infected individuals    |
| `R`             | `string` | The initial number of recovered individuals   |
| `meta`          | `Object` | The metadata of the model                     |
| `meta.author?`  | `string` | -                                             |
| `meta.date?`    | `string` | -                                             |
| `meta.title?`   | `string` | -                                             |
| `meta.version?` | `string` | -                                             |

#### Returns

[`Model`](model.md#model)

An SIR model with the given parameters

#### Defined in

pre.ts:16
