# Typescript operator overload (esbuild plugin)
<br>
An attempt at incorporating operator overloading into typescript.

## Features:
* Replaces operators with their corresposing functions for example `p1 + p2` gets replaced with `p1.add(p2)`.
* Supports `+ - * / ** > >= < <= ==`.
* Supports operator precendence, eg: `p1 + p2 * p3` gets replaced with `p1.add(p2.mul(p3))`
* Supports scalar and class operators, eg: `p1 + 10` gets replaced with `p1.add(10)`

Does not support `+=` or equivalents.

## How does it work
This library consists of an esbuild plugin that uses https://github.com/kach/nearley to parse typescript files and replace operators with their corresponding functions.
<br>
In order to make the linter not complain a few hacks are implemented:
* The class that wants to have its operators overloaded is considered a `Number` class, in order to do this a `global-types.d.ts` file should be created (look at `./src/global-types.d.ts`), this allows the linter to not complain when `class + class` is used.
* When the code is transpiled by esbuild a few prototypes are "injected" into the Number class in order for some methods to work (eg: radd, rmul, etc), this allows for things like `10 + p1` to work (internally it calls `p1.radd(10)`).

The library is implemented as an 

## How to use it
Kinda TODO, but the code is structured as the both the plugin (./src/plugin/) and the example on how to use it (./src/).
<br>
Eventually, maybe, this will be tested and pushed onto NPM.
<br>
This library is implemented as an esbuild plugin because its a personal preference but it should be compatible with other bundlers such as babel or equivalents.