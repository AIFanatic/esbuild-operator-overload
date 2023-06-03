# From https://github.com/Hardmath123/nearley/
# blob/master/examples/calculator/arithmetic.ne

# This is a nice little grammar to familiarize yourself
# with the nearley syntax.

# It parses valid calculator input, obeying OOO and stuff.
# Try clicking "Add Test" and pasting in
#   ln (3 + 2*(8/e - sin(pi/5)))

# `main` is the nonterminal that nearley tries to parse, so
# we define it first.
# The _'s are defined as whitespace below. This is a mini-
# -idiom.
# The stuff inside {% %} is an optional postprocessing
# function which can return anything you like.

@{%
function addOp(left, right, op) {
	if (!isNaN(left)) left = "(" + left + ")";
	return `${left}.${op}(${right})`;
}
%}


main -> _ CMP _ {% function(d) {return {type:'main', d:d, v:d[1].v}} %}

# PEMDAS!
# We define each level of precedence as a nonterminal.

# Parentheses
P -> "(" _ AS _ ")" {% function(d) {return {type:'P', d:d, v:`${d[2].v}`}} %}
    | N             {% id %}

# Exponents
E -> P _ "**" _ E    {% function(d) {return {type:'E', d:d, v:addOp(d[0].v, d[4].v, "pow")}} %}
    | P             {% id %}

# Multiplication/Division
MD -> MD _ "*" _ E  {% function(d) {return {type: 'M', d:d, v:addOp(d[0].v, d[4].v, "mul")}} %}
    | MD _ "/" _ E  {% function(d) {return {type: 'D', d:d, v:addOp(d[0].v, d[4].v, "div")}} %}
    | E             {% id %}
	
# Addition/Subtraction
AS -> AS _ "+" _ MD {% function(d) {return {type:'A', d:d, v:addOp(d[0].v, d[4].v, "add")}} %}
	| AS _ "-" _ MD {% function(d) {return {type:'A', d:d, v:addOp(d[0].v, d[4].v, "sub")}} %}
    | MD            {% id %}
	
# Comparison
CMP -> CMP _ ">" _ AS {% function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "gt")}} %}
     | CMP _ ">=" _ AS {% function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "ge")}} %}
	 | CMP _ "<" _ AS {% function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "lt")}} %}
	 | CMP _ "<=" _ AS {% function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "le")}} %}
	 | CMP _ "==" _ AS {% function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "eq")}} %}
     | AS            {% id %}
	
# A number or a function of a number
N -> float          {% id %}
    # | "=" _ P     {% function(d) {return {type:'sin', d:d, v:d[2].v}} %}

# I use `float` to basically mean a number with a decimal point in it
float ->
      #int "." int   {% function(d) {return {v:d[0].v + d[1].v + d[2].v}} %}
     int           {% function(d) {return {v:d[0].v}} %}

int -> 
	[0-9a-zA-Z()_.{}`$]:+        {% function(d) {return {v:d[0].join("")}} %}

# Whitespace. The important thing here is that the postprocessor
# is a null-returning function. This is a memory efficiency trick.
_ -> [\s]:*     {% function(d) {return null } %}