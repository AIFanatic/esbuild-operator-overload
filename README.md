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
* To trick typescript into thinking that classes are numbers a `ClassOverload.ts` file should be created that creates a new `ClassInstance` and returns it with the type number (see: ./src/PointOverload.ts). The caveat is that instead of using the overloaded class like `const oc = new OverloadedClass();` it needs to be instanciated with `const oc = OverloadedClass();`
* In order to make a `Number` and `Class` compatible a `global-types.d.ts` file should be created (look at `./src/global-types.d.ts`) to extend `Number` with the overloaded class. This allows for things like `p1 + 10` to work.
* When the code is transpiled by esbuild a few prototypes are "injected" into the Number class in order for some methods to work (eg: radd, rmul, etc), this allows for things like `10 + p1` to work (internally it calls `p1.radd(10)`).

## How to use it
Kinda TODO, but the code is structured as the both the plugin (./src/plugin/) and the example on how to use it (./src/).
<br>
Eventually, maybe, this will be tested and pushed onto NPM.
<br>
This library is implemented as an esbuild plugin because its a personal preference but it should be compatible with other bundlers such as babel or equivalents.