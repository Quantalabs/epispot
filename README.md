# epispot

This repository aims to merge the [EpiJS](https://github.com/epispot/epijs) and [epispot](https://github.com/epispot/epispot) javascript and python packages into one, unified JS/TS package. It is currently in development, and will be released in the near future, at which point the current EpiJS and epispot packages will be deprecated in favor of this package.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Roadmap](#roadmap)
4. [Usage](#usage)

## Features

-   Create Custom Compartmental Models
-   Plots model predictions interactively
-   Solve models with custom time steps
-   Custom-defined compartments

## Installation

epispot is currently not avaliable on npm. Install via git:

```bash
  git clone https://github.com/epispot/epispot-new.git epispot
  cd epispot
  yarn && yarn build
```

After cloning the package, go into the directory of the project you want to use epispot in, and run:

```bash
  yarn add /path/to/epispot
```

## Roadmap

-   Additional browser support
-   Built-in models
-   Built-in compartments
-   Fitting data to a model
-   Stop using MathJS in favor of TheoremJS

## Usage

You can create a model in epispot via a `.epi` file, formatted like so:

```
---
title: SIR Model for COVID-19
author: Lorem, et al.
date: 2023-01-31
version: v1
---

== c
S, Susceptible, -(β * S * I)/N, I
I, Infected, (β * S * I)/N - γ * I, R
R, Recovered, γ * I, I

== p
β = 3 + (-2 / (1 + e^(-t/10)))

== i
I = 0.1*N
S = 0.9*N
R = 0

== v
N = 100
γ = 0.1
```

The first section is for front matter, including title, author, and date. The version _must_ be specified. Currently v1 is the only valid version.

`== c` specifes the compartments section. Each line is a new compartment, in the following format:

```csv
abbreviation, name, equation, connected compartments
```

The equation is the right-hand side of the derivative for that compartment. For example, for the Susceptible compartment, the full equation is `dS/dt=-(β * S * I)/N` but the `dS/dt` is implied.

`== p` specifies parameters. Parameters can change value after each timestep. For example, in the example, β changes with each step. Paremters can also specify other parameters, constants, or compartment populations. Compartment populations should be specified with their respective abbreviations.

`== i` specifies the initial values of the compartments. Any constants can also be specified.

`== v` specifies any constants. Other constants may be specified in a constants value, but compartment populations and paremters may not.

Note that `t` is a reserved name for the current time and cannot and should not be used as a constant, parameter, or compartment name/abbrevation. Any common math terms like e or π are also reserved.

---

You can parse a `.epi` file with the parse function:

```
import { parse, model, solve, plot } from 'epispot'

let m = parse('./path/to/file')
```

To solve the model for 100 days with a step size of 0.01, use:

```
let data = solve(m, 100, 0.01)
```

It will return an object in the format:

```JSON
{
    "S": [S at 0, S at 0.01, at 0.02...]
    "I": [I at 0, I at 0.01, at 0.02...]
    "R": [R at 0, R at 0.01, at 0.02...]
}
```

The step size is optional, and will default to a step size of 0.1 if left unspecified.

To plot the model, for 100 days with a step size of 0.01, use:

```
let plot = plot(m, 100, 0.01)
```

This starts an http server (which is returned so you can manipulate it) with a plotly graph at [http://localhost:3000](http://localhost:3000).

Models may also be created programatically, like so:

```TypeScript
let S: model.Compartment = {
    abbr: "S",
    name: "Susceptible",
    derivative: "-(β * S * I)/N",
    connected: []
}
let I: model.Compartment = {
    abbr: "I",
    name: "Infected",
    derivative: "(β * S * I)/N - γ * I",
    connected: []
}
let R: model.Compartment = {
    abbr: "R",
    name: "Recovered",
    derivative: "γ * I",
    connected: []
}

S.connected = [I]
I.connected = [R]

let m: model.Model = {
    meta: {
        title: "SIR Model for COVID-19",
        author: "Lorem, et al.",
        date: "2023-01-31",
        version: "v1"
    },
    compartments: {
        "S": S,
        "I": I,
        "R": R
    },
    parameters: {
        "β": "3 + (-2 / (1 + e^(-t/10)))"
    },
    initialStates: {
        "S": "0.9*N",
        "I": "0.1*N",
        "R": "0"
    },
    constants: {
        "N": "100",
        "γ": "0.1"
    }
}
```
