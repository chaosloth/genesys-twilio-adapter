var Highlight = require('./highlight');
var hljs      = new Highlight();

hljs.registerLanguage('1c', require('./languages/1c'));
hljs.registerLanguage('actionscript', require('./languages/actionscript'));
hljs.registerLanguage('apache', require('./languages/apache'));
hljs.registerLanguage('applescript', require('./languages/applescript'));
hljs.registerLanguage('xml', require('./languages/xml'));
hljs.registerLanguage('asciidoc', require('./languages/asciidoc'));
hljs.registerLanguage('autohotkey', require('./languages/autohotkey'));
hljs.registerLanguage('avrasm', require('./languages/avrasm'));
hljs.registerLanguage('axapta', require('./languages/axapta'));
hljs.registerLanguage('bash', require('./languages/bash'));
hljs.registerLanguage('brainfuck', require('./languages/brainfuck'));
hljs.registerLanguage('capnproto', require('./languages/capnproto'));
hljs.registerLanguage('clojure', require('./languages/clojure'));
hljs.registerLanguage('cmake', require('./languages/cmake'));
hljs.registerLanguage('coffeescript', require('./languages/coffeescript'));
hljs.registerLanguage('cpp', require('./languages/cpp'));
hljs.registerLanguage('cs', require('./languages/cs'));
hljs.registerLanguage('css', require('./languages/css'));
hljs.registerLanguage('d', require('./languages/d'));
hljs.registerLanguage('markdown', require('./languages/markdown'));
hljs.registerLanguage('dart', require('./languages/dart'));
hljs.registerLanguage('delphi', require('./languages/delphi'));
hljs.registerLanguage('diff', require('./languages/diff'));
hljs.registerLanguage('django', require('./languages/django'));
hljs.registerLanguage('dos', require('./languages/dos'));
hljs.registerLanguage('dust', require('./languages/dust'));
hljs.registerLanguage('elixir', require('./languages/elixir'));
hljs.registerLanguage('ruby', require('./languages/ruby'));
hljs.registerLanguage('erb', require('./languages/erb'));
hljs.registerLanguage('erlang-repl', require('./languages/erlang-repl'));
hljs.registerLanguage('erlang', require('./languages/erlang'));
hljs.registerLanguage('fix', require('./languages/fix'));
hljs.registerLanguage('fsharp', require('./languages/fsharp'));
hljs.registerLanguage('gcode', require('./languages/gcode'));
hljs.registerLanguage('gherkin', require('./languages/gherkin'));
hljs.registerLanguage('glsl', require('./languages/glsl'));
hljs.registerLanguage('go', require('./languages/go'));
hljs.registerLanguage('gradle', require('./languages/gradle'));
hljs.registerLanguage('groovy', require('./languages/groovy'));
hljs.registerLanguage('haml', require('./languages/haml'));
hljs.registerLanguage('handlebars', require('./languages/handlebars'));
hljs.registerLanguage('haskell', require('./languages/haskell'));
hljs.registerLanguage('haxe', require('./languages/haxe'));
hljs.registerLanguage('http', require('./languages/http'));
hljs.registerLanguage('ini', require('./languages/ini'));
hljs.registerLanguage('java', require('./languages/java'));
hljs.registerLanguage('javascript', require('./languages/javascript'));
hljs.registerLanguage('json', require('./languages/json'));
hljs.registerLanguage('lasso', require('./languages/lasso'));
hljs.registerLanguage('less', require('./languages/less'));
hljs.registerLanguage('lisp', require('./languages/lisp'));
hljs.registerLanguage('livecodeserver', require('./languages/livecodeserver'));
hljs.registerLanguage('livescript', require('./languages/livescript'));
hljs.registerLanguage('lua', require('./languages/lua'));
hljs.registerLanguage('makefile', require('./languages/makefile'));
hljs.registerLanguage('mathematica', require('./languages/mathematica'));
hljs.registerLanguage('matlab', require('./languages/matlab'));
hljs.registerLanguage('mel', require('./languages/mel'));
hljs.registerLanguage('mizar', require('./languages/mizar'));
hljs.registerLanguage('monkey', require('./languages/monkey'));
hljs.registerLanguage('nginx', require('./languages/nginx'));
hljs.registerLanguage('nimrod', require('./languages/nimrod'));
hljs.registerLanguage('nix', require('./languages/nix'));
hljs.registerLanguage('nsis', require('./languages/nsis'));
hljs.registerLanguage('objectivec', require('./languages/objectivec'));
hljs.registerLanguage('ocaml', require('./languages/ocaml'));
hljs.registerLanguage('oxygene', require('./languages/oxygene'));
hljs.registerLanguage('parser3', require('./languages/parser3'));
hljs.registerLanguage('perl', require('./languages/perl'));
hljs.registerLanguage('php', require('./languages/php'));
hljs.registerLanguage('powershell', require('./languages/powershell'));
hljs.registerLanguage('processing', require('./languages/processing'));
hljs.registerLanguage('profile', require('./languages/profile'));
hljs.registerLanguage('protobuf', require('./languages/protobuf'));
hljs.registerLanguage('puppet', require('./languages/puppet'));
hljs.registerLanguage('python', require('./languages/python'));
hljs.registerLanguage('q', require('./languages/q'));
hljs.registerLanguage('r', require('./languages/r'));
hljs.registerLanguage('rib', require('./languages/rib'));
hljs.registerLanguage('rsl', require('./languages/rsl'));
hljs.registerLanguage('ruleslanguage', require('./languages/ruleslanguage'));
hljs.registerLanguage('rust', require('./languages/rust'));
hljs.registerLanguage('scala', require('./languages/scala'));
hljs.registerLanguage('scheme', require('./languages/scheme'));
hljs.registerLanguage('scilab', require('./languages/scilab'));
hljs.registerLanguage('scss', require('./languages/scss'));
hljs.registerLanguage('smalltalk', require('./languages/smalltalk'));
hljs.registerLanguage('sql', require('./languages/sql'));
hljs.registerLanguage('stylus', require('./languages/stylus'));
hljs.registerLanguage('swift', require('./languages/swift'));
hljs.registerLanguage('tcl', require('./languages/tcl'));
hljs.registerLanguage('tex', require('./languages/tex'));
hljs.registerLanguage('thrift', require('./languages/thrift'));
hljs.registerLanguage('twig', require('./languages/twig'));
hljs.registerLanguage('typescript', require('./languages/typescript'));
hljs.registerLanguage('vala', require('./languages/vala'));
hljs.registerLanguage('vbnet', require('./languages/vbnet'));
hljs.registerLanguage('vbscript', require('./languages/vbscript'));
hljs.registerLanguage('vbscript-html', require('./languages/vbscript-html'));
hljs.registerLanguage('vhdl', require('./languages/vhdl'));
hljs.registerLanguage('vim', require('./languages/vim'));
hljs.registerLanguage('x86asm', require('./languages/x86asm'));
hljs.registerLanguage('xl', require('./languages/xl'));

module.exports = hljs;