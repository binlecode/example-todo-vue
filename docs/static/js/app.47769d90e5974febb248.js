webpackJsonp([1],{"+bA1":function(t,e){},"5yIK":function(t,e){},K7BV:function(t,e){},NHnr:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});o("K3J8"),o("qb6w");var i=o("7+uW"),l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[this._m(0),this._v(" "),e("router-view")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"header"}},[e("h1",[this._v("todos")])])}]};var n=o("VU/8")({name:"App"},l,!1,function(t){o("K7BV")},null,null).exports,s=o("/ocq"),c=o("kFye"),d={name:"Todo",props:["todo"],methods:{toggleComplete:function(t){console.log("toggle todo: "+t.completed),t.completed=!t.completed}}},r={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"form-check"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.todo.completed,expression:"todo.completed"}],staticClass:"form-check-input",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.todo.completed)?t._i(t.todo.completed,null)>-1:t.todo.completed},on:{click:function(e){return t.toggleComplete(t.todo)},change:function(e){var o=t.todo.completed,i=e.target,l=!!i.checked;if(Array.isArray(o)){var n=t._i(o,null);i.checked?n<0&&t.$set(t.todo,"completed",o.concat([null])):n>-1&&t.$set(t.todo,"completed",o.slice(0,n).concat(o.slice(n+1)))}else t.$set(t.todo,"completed",l)}}}),t._v(" "),o("label",{class:{completed:t.todo.completed}},[t._v("\n  "+t._s(t.todo.title)+"\n  ")]),t._v(" "),o("span",{staticClass:"pull-right"},[o("button",{staticClass:"btn btn-xs btn-outline-danger",staticStyle:{padding:"0 0.25em 0 0.25em"},on:{click:function(e){return t.$emit("delete-todo",t.todo.id)}}},[t._v("\n    x\n    ")])])])},staticRenderFns:[]};var a={name:"todoList",components:{Todo:o("VU/8")(d,r,!1,function(t){o("5yIK")},null,null).exports},methods:{setVisibility:function(t){this.visibility=t},addTodo:function(){this.newTodo&&(this.todos.push({id:Object(c.a)(),title:this.newTodo,completed:!1}),this.newTodo="")},toggleTodoComplete:function(t){t.completed=!t.completed},deleteTodo:function(t){console.log("msg delete-todo: "+t),this.todos=this.todos.filter(function(e){return e.id!==t})},clearCompleted:function(){this.todos.filter(!this.completed)},clearAll:function(){this.todos=[]}},computed:{filteredTodos:function(){return"active"===this.visibility?this.todos.filter(function(t){return!0!==t.completed}):"completed"===this.visibility?this.todos.filter(function(t){return!0===t.completed}):this.todos}},props:{},data:function(){return{visibility:"all",newTodo:"",todos:[{id:1,title:"Go workout",completed:!1},{id:2,title:"Do laundry",completed:!1},{id:3,title:"Cook food",completed:!1},{id:4,title:"Clean up room",completed:!0},{i:5,title:"Finish work",completed:!1}]}}},u={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{attrs:{id:"cover"}},[o("div",{staticClass:"container"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 todo-form text-white"},[o("div",{staticClass:"from-group input-group-lg"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.newTodo,expression:"newTodo"}],staticClass:"form-control",attrs:{type:"text",name:"title",placeholder:"Enter New Todo"},domProps:{value:t.newTodo},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e)},input:function(e){e.target.composing||(t.newTodo=e.target.value)}}})]),t._v(" "),o("div",[o("ul",{staticClass:"list-group"},t._l(t.filteredTodos,function(e){return o("li",{key:e.id,staticClass:"list-group-item clearfix"},[o("Todo",{attrs:{todo:e},on:{"delete-todo":t.deleteTodo}})],1)}),0)]),t._v(" "),o("footer",{staticClass:"footer"},[o("ul",{staticClass:"filters"},[o("li",[o("a",{class:{selected:"all"==t.visibility},attrs:{href:"#"},on:{click:function(e){return t.setVisibility("all")}}},[t._v("All")])]),t._v(" "),o("li",[o("a",{class:{selected:"active"==t.visibility},attrs:{href:"#"},on:{click:function(e){return t.setVisibility("active")}}},[t._v("Active")])]),t._v(" "),o("li",[o("a",{class:{selected:"completed"==t.visibility},attrs:{href:"#"},on:{click:function(e){return t.setVisibility("completed")}}},[t._v("Completed")])])])])])])])])},staticRenderFns:[]};var p=o("VU/8")(a,u,!1,function(t){o("+bA1")},null,null).exports;i.a.use(s.a);var m=new s.a({routes:[{path:"/",name:"ExampleTodo",component:p}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:m,components:{App:n},template:"<App/>"})},qb6w:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.47769d90e5974febb248.js.map