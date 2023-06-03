// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

function addOp(left, right, op) {
	if (!isNaN(left)) left = "(" + left + ")";
	return `${left}.${op}(${right})`;
}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["_", "CMP", "_"], "postprocess": function(d) {return {type:'main', d:d, v:d[1].v}}},
    {"name": "P", "symbols": [{"literal":"("}, "_", "AS", "_", {"literal":")"}], "postprocess": function(d) {return {type:'P', d:d, v:`${d[2].v}`}}},
    {"name": "P", "symbols": ["N"], "postprocess": id},
    {"name": "E$string$1", "symbols": [{"literal":"*"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "E", "symbols": ["P", "_", "E$string$1", "_", "E"], "postprocess": function(d) {return {type:'E', d:d, v:addOp(d[0].v, d[4].v, "pow")}}},
    {"name": "E", "symbols": ["P"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"*"}, "_", "E"], "postprocess": function(d) {return {type: 'M', d:d, v:addOp(d[0].v, d[4].v, "mul")}}},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"/"}, "_", "E"], "postprocess": function(d) {return {type: 'D', d:d, v:addOp(d[0].v, d[4].v, "div")}}},
    {"name": "MD", "symbols": ["E"], "postprocess": id},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"+"}, "_", "MD"], "postprocess": function(d) {return {type:'A', d:d, v:addOp(d[0].v, d[4].v, "add")}}},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"-"}, "_", "MD"], "postprocess": function(d) {return {type:'A', d:d, v:addOp(d[0].v, d[4].v, "sub")}}},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "CMP", "symbols": ["CMP", "_", {"literal":">"}, "_", "AS"], "postprocess": function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "gt")}}},
    {"name": "CMP$string$1", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CMP", "symbols": ["CMP", "_", "CMP$string$1", "_", "AS"], "postprocess": function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "ge")}}},
    {"name": "CMP", "symbols": ["CMP", "_", {"literal":"<"}, "_", "AS"], "postprocess": function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "lt")}}},
    {"name": "CMP$string$2", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CMP", "symbols": ["CMP", "_", "CMP$string$2", "_", "AS"], "postprocess": function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "le")}}},
    {"name": "CMP$string$3", "symbols": [{"literal":"="}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "CMP", "symbols": ["CMP", "_", "CMP$string$3", "_", "AS"], "postprocess": function(d) {return {type:'G', d:d, v:addOp(d[0].v, d[4].v, "eq")}}},
    {"name": "CMP", "symbols": ["AS"], "postprocess": id},
    {"name": "N", "symbols": ["float"], "postprocess": id},
    {"name": "float", "symbols": ["int"], "postprocess": function(d) {return {v:d[0].v}}},
    {"name": "int$ebnf$1", "symbols": [/[0-9a-zA-Z()_.{}`$]/]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1", /[0-9a-zA-Z()_.{}`$]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1"], "postprocess": function(d) {return {v:d[0].join("")}}},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null }}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
