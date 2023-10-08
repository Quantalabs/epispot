# Namespace: model

## Type Aliases

### Compartment

Ƭ **Compartment**: `Object`

#### Type declaration

| Name         | Type                                    |
| :----------- | :-------------------------------------- |
| `abbr`       | `string`                                |
| `connected?` | [`Compartment`](model.md#compartment)[] |
| `derivative` | `string`                                |
| `name`       | `string`                                |

#### Defined in

[model.ts:1](https://github.com/epispot/epispot-new/blob/e760045/src/model.ts#L1)

---

### Model

Ƭ **Model**: `Object`

#### Type declaration

| Name            | Type                                                                                    |
| :-------------- | :-------------------------------------------------------------------------------------- |
| `compartments`  | { `[key: string]`: [`Compartment`](model.md#compartment); }                             |
| `constants`     | { `[key: string]`: `string`; }                                                          |
| `initialStates` | { `[key: string]`: `string`; }                                                          |
| `meta?`         | { `author?`: `string` ; `date?`: `string` ; `title?`: `string` ; `version?`: `string` } |
| `meta.author?`  | `string`                                                                                |
| `meta.date?`    | `string`                                                                                |
| `meta.title?`   | `string`                                                                                |
| `meta.version?` | `string`                                                                                |
| `parameters`    | { `[key: string]`: `string`; }                                                          |

#### Defined in

[model.ts:8](https://github.com/epispot/epispot-new/blob/e760045/src/model.ts#L8)
