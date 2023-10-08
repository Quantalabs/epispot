# epispot

## Namespaces

-   [model](modules/model.md)
-   [pre](modules/pre.md)

## Functions

### parse

▸ **parse**(`file`): [`Model`](modules/model.md#model)

Parses the input string and returns an object containing model information.

#### Parameters

| Name   | Type     | Description                  |
| :----- | :------- | :--------------------------- |
| `file` | `string` | The input file to be parsed. |

#### Returns

[`Model`](modules/model.md#model)

-   Returns a model object with the parsed information. Also generates compartments from the input.

#### Defined in

[parser.ts:11](https://github.com/epispot/epispot-new/blob/76e1948/src/parser.ts#L11)

---

### plot

▸ **plot**(`model`, `time`, `stepSize?`): `Server`<typeof `IncomingMessage`, typeof `ServerResponse`\>

Generates a plot of the solution to a given model over a specified time period.

#### Parameters

| Name        | Type                              | Default value | Description                                                    |
| :---------- | :-------------------------------- | :------------ | :------------------------------------------------------------- |
| `model`     | [`Model`](modules/model.md#model) | `undefined`   | The model to solve and plot.                                   |
| `time`      | `number`                          | `undefined`   | The time period to plot the solution for.                      |
| `stepSize?` | `number`                          | `0.1`         | The step size to use in the numerical solver. Defaults to 0.1. |

#### Returns

`Server`<typeof `IncomingMessage`, typeof `ServerResponse`\>

The server object that is listening on port 3000.

#### Defined in

[plot.ts:13](https://github.com/epispot/epispot-new/blob/76e1948/src/plot.ts#L13)

---

### solve

▸ **solve**(`model`, `time`, `stepSize?`): `Object`

Solves the given model.

#### Parameters

| Name       | Type                              | Default value | Description                     |
| :--------- | :-------------------------------- | :------------ | :------------------------------ |
| `model`    | [`Model`](modules/model.md#model) | `undefined`   | The model to be solved.         |
| `time`     | `number`                          | `undefined`   | The duration of the simulation. |
| `stepSize` | `number`                          | `0.1`         | The time step size.             |

#### Returns

`Object`

-   Returns an object containing an array of values for each compartment at each time step.

#### Defined in

[solve.ts:12](https://github.com/epispot/epispot-new/blob/76e1948/src/solve.ts#L12)
